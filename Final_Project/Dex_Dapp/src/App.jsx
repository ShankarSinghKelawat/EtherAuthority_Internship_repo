import { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import Exchange from "./components/Exchange";

function App() {
  const [signer, setSigner] = useState(null);

  return (
    <div className="app-container">
      <h1 className="title"> MINI DEX DAPP</h1>
      <h2 className="description">A Decentralized Exchange Plaform</h2>

      <ConnectWallet setSigner={setSigner} />

      {signer && <Exchange signer={signer} />}
    </div>
  );
}

export default App;
