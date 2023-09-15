import { Button, Paper } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import mBTC from '../../Assets/mBTCLogo.png'
import Web3 from 'web3'
import { erc20ABI } from 'wagmi'

function Wallet() {

  /* 
  1. Deploy Tokens and list them.
  2. Parse and Update token list in the frontend
  3. Calculate Total Assets
  4. Enable users deposit or withdraw money from the wallet
  */


  
  var allTokens;
  const [tokens , setTokens] = useState({
    token1:{
      balance:"",
      symbol:"",
      address:"",
    },
    token2:{
      balance:"",
      symbol:"",
      address:"",
    },
    token3:{
      balance:"",
      symbol:"",
      address:"",
    },
  })

  /*
  Listing All the ERC20 tokens in the Metamask wallet

  */

const getTokens = async () =>{
  const tokenAddresses = [];

  if(window.ethereum !== 'undefined'){
 
   const web3 = new Web3(window.ethereum);
   try{
     await window.ethereum.enable();

     const addresses = await web3.eth.getAccounts();
     const tokens = await Promise.all(addresses.map(async (address) =>{
      const balancePromises = tokenAddresses.map(async (tokenAddresses) =>{
          const contract = new web3.eth.Contract(erc20ABI , tokenAddresses);
          const balance = await contract.methods.balanceOf(address).call();
          return {address:tokenAddresses , balance};
      });

      const balances = await Promise.all(balancePromises);
      const tokenBalances = balances.filter((token) => token.balance !=='0');
      return {address , tokenBalances}
     }));
     allTokens = tokens;
     console.log(tokens);

     // Updating Wallet info
     setTokens() 


   }
   catch(error){

   }
  }
}

 

  return (
    <>
    <Navbar/>
    <div className='main'>
      <Button 
      onClick={getTokens}>Update Wallet Info </Button>
      <div style={{display:'flex',flexDirection:'row'}}>

<Paper sx={{'borderRadius':'100px','width':'500px',height:'400px',background:'#cdf888',
              marginTop:'10px'}}>

<b style={{color:'black',
                fontFamily:'monospace',fontSize:'22px',marginLeft:'200px',marginTop:'20px'}}>Assets</b><br/>
              <img src={mBTC} style={{width:'75px' , marginLeft:'70px',marginTop:'30px'}}/><b style={{}}>mBTC</b><br/>

              <b style={{}}>123</b>



              <br/>
              <img src={mBTC} style={{width:'75px' , marginLeft:'70px',marginTop:'30px'}}/><b style={{}}>mETH</b>

              <br/>
              <img src={mBTC} style={{width:'75px' , marginLeft:'70px',marginTop:'30px'}}/><b style={{}}>mDAI</b>
                </Paper>

                {/* <Paper sx={{'borderRadius':'100px','width':'500px',height:'400px',background:'#C1C0FE',
              marginTop:'10px',marginLeft:'30px'}}>
                <b style={{color:'black',
                fontFamily:'monospace',fontSize:'22px',marginLeft:'200px',marginTop:'20px'}}>Wallet</b>

                <br></br>
                <b style={{marginLeft:'50px',marginTop:'10px'}}>Total Assets </b><br/>
                <b style={{marginLeft:'50px',marginTop:'10px'}}>Total Deposits</b>
                <br/>
                <Button style={{marginLeft:'50px',marginTop:'10px'}}>Withdraw Money</Button>
                <Button style={{marginLeft:'50px',marginTop:'10px'}}>Deposit Money </Button>
              </Paper> */}
              </div>
    </div>
    
    </>
  )
}

export default Wallet