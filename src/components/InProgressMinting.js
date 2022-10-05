import React from 'react'
import ReactLoading from 'react-loading';

const InProgressMinting = (props) => {

const checkEtherScan = () => { // ES6 way of creating functions
    const url = "https://goerli.etherscan.io/tx/" + props.hash;
    window.open(url, "_blank");
}

  return (
    <div>
        <div>Your NFT is being minted. Please wait.</div>
        <ReactLoading type="bubbles" color="#fff" />
        <button onClick={checkEtherScan}>CHECK ETHERSCAN</button> 
    </div>
  )
}

export default InProgressMinting