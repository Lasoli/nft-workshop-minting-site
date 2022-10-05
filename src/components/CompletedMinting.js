import React from 'react'

const CompletedMinting = () => {
    const viewOpenSea = () => { // ES6 way of creating functions
    const url = "https://testnets.opensea.io/collection/space-riders-v2";
    window.open(url, "_blank");
}

  return (
    <div>
        <div>All set! You NFT has been minted.</div>
        <button onClick={viewOpenSea}>VIEW OPENSEA</button>
    </div>
  )
}

export default CompletedMinting