import { useState, useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../context/Web3Context";
import StakingContext from "../context/StakingContext";

const WithdrawToken = () =>{
    const {stakingContract} = useContext(Web3Context);
    const {isReload,setIsReload} = useContext(StakingContext)
    const withdrawTokenRef = useRef();
    const [status, setStatus] = useState("");
    const withdrawToken = async(e)=>{
        e.preventDefault();
        const amount = withdrawTokenRef.current.value.trim();
        if(isNaN(amount) || amount <=0){
            console.error("Enter a valid amount");
            return;
        }
        const amountToWithdraw = ethers.parseUnits(amount,18).toString();
        try{
            const transaction = await stakingContract.withdraw(amountToWithdraw)
            setStatus("Transaction pending")
            setIsReload(!isReload)
            const received = await transaction.wait();
            if(received.status===1){
                setStatus("Transaction is Successful")
                setTimeout(()=>{
                    setStatus("")
                },5000)
                withdrawTokenRef.current.value=""
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
            <form onSubmit={withdrawToken}>
                <label className="labels">Withdraw Amount: </label>
                <input type="text" ref={withdrawTokenRef}/>
                <button className="button" type="submit">Withdraw</button>
            </form>
        </div>
    )
}

export default WithdrawToken;