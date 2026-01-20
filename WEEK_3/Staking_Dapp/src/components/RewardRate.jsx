import { useState, useEffect, useContext } from "react";
import Web3Context from "../context/Web3Context";
import { ethers } from "ethers";

const RewardRate = () =>{
    const {stakingContract, selectedAccount} = useContext(Web3Context);
    const [rewardRate, setRewardrate] = useState("0")


    useEffect(() =>{
        const fetchRewardRate = async() =>{
            try{
                const rewardRatewei = await stakingContract.rewardRate()
                const rewardRate = ethers.formatUnits(rewardRatewei,18).toString()
                setRewardrate(rewardRate)
            }catch(error){
                console.error("Error fetching data: ", error.message)
            }
        }
        stakingContract && fetchRewardRate()
    },[stakingContract, selectedAccount])

    return(
        <p className="rewardRate">Reward Rate: {rewardRate} token/sec</p>
    )

}

export default RewardRate;