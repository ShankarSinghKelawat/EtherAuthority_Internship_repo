import { useState, useEffect, useContext } from "react";
import Web3Context from "../context/Web3Context";
import { ethers } from "ethers";

const EarnedReward = () =>{
    const {stakingContract, selectedAccount} = useContext(Web3Context);
    const [earnedReward, setEarnedReward] = useState("0")

    useEffect(() =>{
        const fetchEarnedReward = async() =>{
            try{
                const earnedRewardwei = await stakingContract.earned(selectedAccount)
                const earnedReward = ethers.formatUnits(earnedRewardwei,18).toString()
                const roundedReward = parseFloat(earnedReward).toFixed(2)
                setEarnedReward(roundedReward )
            }catch(error){
                console.error("Error fetching data: ", error.message)
            }
        }
            const interval = setInterval(()=>{
                stakingContract && fetchEarnedReward()
            },3000)
            return ()=> clearInterval(interval)
    },[stakingContract, selectedAccount])

    return(
        <p className="earnedReward">Earned Reward: {earnedReward} tokens</p>
    )
}

export default EarnedReward;