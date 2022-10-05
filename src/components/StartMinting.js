import React from 'react'

const StartMinting = (props) => {
  return (
    <div className='mintStart'>
        <button onClick={props.mint}>MINT</button> 
    </div>
  )
}

export default StartMinting