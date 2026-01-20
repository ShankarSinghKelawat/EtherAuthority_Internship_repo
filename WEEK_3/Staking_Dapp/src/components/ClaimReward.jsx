import { useState, useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../context/Web3Context";

const ClaimReward = () =>{
    const {stakingContract} = useContext(Web3Context); 
    const [status, setStatus] = useState("");
    const claimReward = async()=>{
        try{
            const transaction = await stakingContract.claimReward();
            const received = await transaction.wait();
            setStatus("Transaction pending")
            if(received.status===1){
                setStatus("Transaction is Successful")
                setTimeout(()=>{
                    setStatus("")
                },5000)
            }else{
                setStatus("Transaction failed")
            }
        }catch(error){
            console.error("Operation Failed", error.message)
        }
    }

    return (
        <div>
            {status && <div>{status}</div>}
                <button className="button" onClick={claimReward}>Claim Reward</button>
        </div>
    )
}


export default ClaimReward;