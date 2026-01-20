import { useState, useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../context/Web3Context";
const TokenApproval = () => {
    const {stakeTokenContract, stakingContract} = useContext(Web3Context);
    const approvedTokenRef = useRef();
    const [status, setStatus] = useState("");
    const approveToken = async(e)=>{
        e.preventDefault();
        const amount = approvedTokenRef.current.value.trim();
        if(isNaN(amount) || amount <=0){
            console.error("Enter a valid amount");
            return;
        }
        const amountToSend = ethers.parseUnits(amount,18).toString();
        try{
            const transaction = await stakeTokenContract.approve(stakingContract.target, amountToSend)
            setStatus("Transaction pending")
            const received = await transaction.wait();
            if(received.status===1){
                setStatus("Transaction Successful")
                setTimeout(()=>{
                    setStatus("")
                },5000)
                approvedTokenRef.current.value=""
            }else{
                setStatus("Transaction failed")
            }
        }catch(error){
            console.error("Token Approval Failed", error.message)
        }
    }
    return (
        <div>
            {status && <div>{status}</div>}
            <form onSubmit={approveToken}>
                <label className="labels">Token Approval: </label>
                <input type="text" ref={approvedTokenRef}/>
                <button className="button" type="submit">Token Approve</button>
            </form>
        </div>
    )
}

export default TokenApproval;