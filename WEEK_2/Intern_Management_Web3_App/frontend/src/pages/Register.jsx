import { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState("");

  const [name, setName] = useState("");
  const [internId, setInternId] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [status, setStatus] = useState("");

  // 🔹 Connect wallet ONLY on button click
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not installed");
        return;
      }

      await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWallet(address);
    } catch (err) {
      console.error(err);
      alert("Wallet connection failed");
    }
  };

  // 🔹 Register intern
  const registerIntern = async () => {
    if (!wallet) {
      alert("Please connect wallet first");
      return;
    }

    if (!name || !internId || !email || !education || !status) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/interns/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            internId: Number(internId),
            email,
            highestEducation: education,
            background: status,
            wallet
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Registration successful! Please login.");
      navigate("/");

    } catch (error) {
      console.error("REGISTRATION ERROR:", error);
      alert("Registration failed");
    }
  };

  return (
    <>
    <div className="register">
      <p id="head">Intern Registration</p>
      <div className="form_card">
        <div>
          <p className="labels">Wallet Address</p>
          <p>
            {wallet || "Not connected"}
          </p>

          <button className="loginBtn" onClick={connectWallet}>
            Connect Wallet
          </button>

          <p className="labels">Name</p>
          <input className="inputs" value={name} onChange={e => setName(e.target.value)} />

          <p className="labels">Intern ID</p>
          <input className="inputs" type="number" value={internId} onChange={e => setInternId(e.target.value)} />

          <p className="labels">Email</p>
          <input className="inputs" type="email" value={email} onChange={e => setEmail(e.target.value)} />

          <p className="labels">Highest Education</p>
          <select className="inputs" value={education} onChange={e => setEducation(e.target.value)}>
            <option value="">Select Option</option>
            <option value="Diploma Degree">Diploma Degree</option>
            <option value="Bachelors Degree">Bachelors Degree</option>
            <option value="Masters Degree">Masters Degree</option>
          </select>

          <p className="labels">Current Status</p>

          <label className="labels">
            <input type="radio" value="student" checked={status === "student"} onChange={e => setStatus(e.target.value)} />
            Student
          </label>
          <br />

          <label className="labels">
            <input type="radio" value="fresher" checked={status === "fresher"} onChange={e => setStatus(e.target.value)} />
            Fresher
          </label>
          <br />

          <label className="labels">
            <input type="radio" value="working professional" checked={status === "working professional"} onChange={e => setStatus(e.target.value)} />
            Working Professional
          </label>

          <br /><br />

          <button className="submitBtn" onClick={registerIntern}>
            Submit
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;
