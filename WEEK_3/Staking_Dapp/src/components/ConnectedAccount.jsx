import { useContext } from "react";
import Web3Context from "../context/Web3Context";

const ConnectedAccount = () =>{
    const {selectedAccount} = useContext(Web3Context);
    return(
        <div>
        <p className="accDetails">Connected Account: {selectedAccount}</p>
        </div>
    )
}

export default ConnectedAccount;