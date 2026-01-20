import { useState, useEffect, useContext } from "react";
import Web3Context from "../context/Web3Context";
import { ethers } from "ethers";
import StakingContext from "../context/StakingContext";

const StakedAmount = () =>{
    const {stakingContract, selectedAccount} = useContext(Web3Context)
    const {isReload} = useContext(StakingContext)
    const [stakedAmount, setSetAmount] = useState("0");

    useEffect(() =>{
        const fetchStackedBalance = async() =>{
            try{
                const amountStakedwei = await stakingContract.stakedBalance(selectedAccount)
                const amountStaked = ethers.formatUnits(amountStakedwei,18).toString()
                setSetAmount(amountStaked)
            }catch(error){
                console.error("Error fetching data: ", error.message)
            }
        }
        stakingContract && fetchStackedBalance()
    },[stakingContract, selectedAccount,isReload])

    return(
        <p className="stakeAmount">Staked Amount: {stakedAmount}</p>
    )
}

export default StakedAmount;