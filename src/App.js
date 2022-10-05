import { useEffect, useState} from "react";
import './App.css';
import bgVideo from './assets/background.mp4';
import nftVideo from './assets/nftvideo.mp4';
import StartMinting from './components/StartMinting';
import InProgressMinting from './components/InProgressMinting';
import CompletedMinting from './components/CompletedMinting';
import { ethers } from 'ethers';
import abi from "./contracts/contract.json";

function App() {
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [account, setAccount] = useState();
  const [supply, setSupply] = useState(0);
  const [contract, setContract] = useState();
  const [hash, setHash] = useState("");

  const mint = async () => {
    //Run safe mint function
    //Pass in how many NFTs we need to mint
    //Pass in how much money we are going to send
    const options = {value: ethers.utils.parseEther("0.01")} //converting Ether to WEI, multiple with *amount
    const transaction = await contract.safeMint(1, options); //sending eth value to specific smart contract function that is payable in ethers.js
    //console.log(transaction);
    setHash(transaction.hash);
    setInProgress(true);
    //we are in progress
    await transaction.wait();
    setInProgress(false);
    setCompleted(true);
    //we are done
  }

  useEffect(()=>{
      getTotalSupply();
}, [contract]);

 const getTotalSupply = async () =>{
  const totalSupply = await contract.totalSupply();
  //console.log(totalSupply);
  setSupply(totalSupply.toNumber());
  }

  const login = async () => { //connect the wallet by calling the login function
    console.log("Logging in");
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAccount = accounts[0];   // first account in MetaMask
      setAccount(walletAccount);
      const contractAddress = "0xbBAd700CeAF7Ed3643fC6a5fd040DD2525c73a39";
      // connect to contract using ethers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(walletAccount);
      const NFTContract = new ethers.Contract(contractAddress, abi, signer);
      setContract(NFTContract);
      getTotalSupply();
  }
}

  const getState = () => { 
      if(inProgress){
        return <InProgressMinting hash={hash} />
      }

      if(completed){
        return <CompletedMinting />
      }

      return (
        <StartMinting mint={mint} />
      )
  }

  return (
    <div className="App">

      <video class="bg-video" width="320" height="240" autoPlay muted loop>
        <source src={bgVideo} type="video/mp4"/>
      </video>

      <div class="card">
        <div class="main">
          <div class="nft-image">

          <video class="nft-video" autoPlay muted loop>
          <source src={nftVideo} type="video/mp4"/>
          </video>

          </div>
          <div class="info">
            <h2>Web3Builders: INTO THE METAVERSE</h2>
            <p>{supply} minted / 200</p>
            {account ?
             /*<button class="enableEthereumButton" onClick={mint}>
                <span>MINT</span>
               </button>*/
               getState()
                          :
            <button class="enableEthereumButton" onClick={login}>
              <span>CONNECT WALLET</span>
              </button>}
          </div>
        </div>
        <div class="footer">
          MINTING NOW
        </div>
      </div>
    </div>
  );
}

export default App;
