import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const loginWithWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not installed");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const wallet = await signer.getAddress();

      const message = "Login to Intern Management App";
      const signature = await signer.signMessage(message);

      const response = await fetch(
        "http://localhost:5000/api/interns/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wallet,
            message,
            signature
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Login successful!");
      localStorage.setItem("intern", JSON.stringify(data.intern));
      navigate("/dashboard");


    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert(error.message || "Unknown error");
    }
  };

  return (
    <>
    <div className="home">
      <h1>Intern Management Web3App</h1>

      <div className="loginWallet">
        <h1>Connect Wallet to</h1>
        <h1>Get Started!</h1>

        {/* ✅ FIXED */}
        <button
          className="registerBtn"
          onClick={() => navigate("/register")}
        >
          Register via Wallet
        </button>

        <button
          className="loginBtn"
          onClick={loginWithWallet}
        >
          Login via Wallet
        </button>
      </div>

      <p>*If you are not registered, please register first</p>
    </div>
    </>
  );
}

export default Login;
