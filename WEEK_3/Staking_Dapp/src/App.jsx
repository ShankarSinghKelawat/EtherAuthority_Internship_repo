import DisplayPanel from './components/DisplayPanel'
import Navigation from './components/Navigation'
import Wallet from './components/Wallet'
import TokenApproval from './components/TokenApproval'
import StakeToken from './components/StakeToken'
import WithdrawToken from './components/WithdrawToken'
import ClaimReward from './components/ClaimReward'
import { StakingProvider } from './context/StakingContext'

function App() {
  return (
    <>
    <div>
      <Wallet>
        <Navigation/>
        <StakingProvider>
          <DisplayPanel/>
          <TokenApproval/>
          <StakeToken/>
          <WithdrawToken/>
        </StakingProvider>
        <ClaimReward/>
      </Wallet>
    </div>
    </>
  )
}

export default App
