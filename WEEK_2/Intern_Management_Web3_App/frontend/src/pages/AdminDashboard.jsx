import { useEffect, useState } from "react";
import InternCard from "../components/InternCard";
import { mintNFT } from "../utils/nft";

function AdminDashboard() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 NEW: mint form state
  const [mintWallet, setMintWallet] = useState("");
  const [mintMetadata, setMintMetadata] = useState("");
  const [minting, setMinting] = useState(false);

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/interns/all"
      );
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setInterns(data.interns);
    } catch {
      alert("Failed to fetch interns");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE INTERN (unchanged)
  const updateIntern = async (internId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/interns/admin/${internId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData)
        }
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      setInterns(prev =>
        prev.map(intern =>
          intern.internId === internId ? data.intern : intern
        )
      );
    } catch {
      alert("Admin update failed");
    }
  };

  // ✅ DELETE INTERN (unchanged)
  const deleteIntern = async (internId) => {
    if (!window.confirm(`Delete intern ${internId}?`)) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/interns/${internId}`,
        { method: "DELETE" }
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      setInterns(prev =>
        prev.filter(i => i.internId !== internId)
      );
    } catch {
      alert("Delete failed");
    }
  };

  // 🔥 NEW: ADMIN-ONLY NFT MINT HANDLER
  const handleMintNFT = async () => {
    if (!mintWallet || !mintMetadata) {
      alert("Wallet address and metadata URI required");
      return;
    }

    try {
      setMinting(true);
      await mintNFT(mintWallet, mintMetadata);
      alert("NFT minted successfully");

      // optional: reset form
      setMintWallet("");
      setMintMetadata("");
    } catch (err) {
      alert(err.message || "Minting failed");
    } finally {
      setMinting(false);
    }
  };

  if (loading) return <p>Loading interns...</p>;

  return (
    <>
      <h1>Admin Dashboard</h1>

      {/* 🔥 NFT MINT SECTION */}
      <div className="mint-section" style={{ marginBottom: "30px" }}>
        <h2>Mint NFT to Intern</h2>
        <input
          type="text"
          placeholder="Intern Wallet Address (0x...)"
          value={mintWallet}
          onChange={e => setMintWallet(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "400px" }}
        />

        <input
          type="text"
          placeholder="NFT Metadata URI (ipfs://...)"
          value={mintMetadata}
          onChange={e => setMintMetadata(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "400px" }}
        />

        <button onClick={handleMintNFT} disabled={minting}>
          {minting ? "Minting..." : "Mint NFT"}
        </button>
      </div>

      {/* INTERN LIST */}
      {interns.length === 0 ? (
        <p>No interns found</p>
      ) : (
        interns.map(intern => (
          <InternCard
            key={intern._id}
            intern={intern}
            onDelete={deleteIntern}
            onUpdate={updateIntern}
            isAdmin={true}
          />
        ))
      )}
    </>
  );
}

export default AdminDashboard;
