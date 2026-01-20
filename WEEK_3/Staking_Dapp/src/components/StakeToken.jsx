import { useState, useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../context/Web3Context";
import StakingContext from "../context/StakingContext";

const StakeToken = () =>{
    const {stakingContract} = useContext(Web3Context);
    const {isReload,setIsReload} = useContext(StakingContext)
    const stakeTokenRef = useRef();
    const [status, setStatus] = useState("");
    const stakeToken = async(e)=>{
        e.preventDefault();
        const amount = stakeTokenRef.current.value.trim();
        if(isNaN(amount) || amount <=0){
            console.error("Enter a valid amount");
            return;
        }
        const amountToStake = ethers.parseUnits(amount,18).toString();
        try{
            const transaction = await stakingContract.stake(amountToStake)
            setStatus("Transaction pending")
            const received = await transaction.wait();
            if(received.status===1){
                setStatus("Transaction is Successful")
                setIsReload(!isReload)
                setTimeout(()=>{
                    setStatus("")
                },5000)
                stakeTokenRef.current.value=""
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
            <form onSubmit={stakeToken}>
                <label className="labels">Stake Amount: </label>
                <input type="text" ref={stakeTokenRef}/>
                <button className="button" type="submit">Stake</button>
            </form>
        </div>
    )
}

export default StakeToken;