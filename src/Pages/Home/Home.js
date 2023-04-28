/* eslint-disable react-hooks/exhaustive-deps */
import { BusinessCenter, Leaderboard, PaymentRounded, Payments } from '@mui/icons-material'
import { Card, CardActionArea, CardContent, Grid, Paper } from '@mui/material'
import './Home.css'
import ProfileImage from '../../Assets/avatar.png' 
import React, { useEffect, useState } from 'react'
import { auth , db} from '../firebaseConfig'
import Navbar from '../../Components/Navbar'
import FinancialChart from '../../Components/FinancialChart'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'







function Home() {

  /*
    1.Retrive Information from the blockchain and database
    2.Parse and display relevant information
    3.Display Price Chart
  */

  let accounts;
  const [user , setUser] = useState({
    fname:"",
    lname: "",
    email : "",
    walletId: "",
  });

  const loadBlockchainData = async () => {
    accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    
    const userRef = collection(db , "Users")
    const userQ = query(userRef , where("walletId" , "==" , accounts[0]));
    const userQSnapshot = await getDocs(userQ);
    userQSnapshot.forEach((doc)=>{
     
      setUser(doc.data());

     
    })
  }

  useEffect( ()=>{

    loadBlockchainData();
    
  });

  return (
    <>
    <Navbar/>
    <div className='main'>

      <h1 style={{color:'white'}}>Welcome Back {user.fname + " " + user.lname}</h1>
    {/*
    Three cards on Overview page to display Assets,Deposits and APY
    */}
    <gridCards> 
   
    <Grid container spacing={10}>
      <Grid item>
     <div >
       <Paper sx={{'borderRadius':'12px','width':'240px',height:'120px',background:'#cdf888'}}>

        <Payments fontSize='large' sx={{marginLeft:'100px'}}/>
        <div>
        <b className='card-value' style={{
          
        }}>$1,234</b><br/>
        <b className='card-heading'>Total Assets</b>
        </div>
       </Paper>

      </div>
      </Grid>
      <Grid item>
     <div >
     <Paper  sx={{'borderRadius':'12px','width':'240px',height:'120px',background:'#C1C0FE'}}>

<BusinessCenter fontSize='large' sx={{marginLeft:'100px'}}/>
<div>
<b className='card-value' style={{
  
}}>$1,234</b><br/>
<b className='card-heading'>Total Deposits</b>
</div>




</Paper>
      </div>
      </Grid>
      <Grid item>
     <div >
     <Paper  sx={{'borderRadius':'12px','width':'240px',height:'120px',background:'#0f1515'}}>

<Leaderboard fontSize='large' sx={{marginLeft:'100px',color:'white'}}/>
<div>
<b className='card-value' style={{
  color:'white',marginLeft:'100px'
}}>8%</b><br/>
<b className='card-heading' style={{color:'white',marginLeft:'100px'}}>APY</b>
</div>




</Paper>
      </div>
      </Grid>

      <Grid item>
     <div >
       <Paper sx={{'borderRadius':'12px','width':'300px',height:'60vh',background:'white'}}>

        <img src={ProfileImage} style={{height:'140px',width:'140px','borderRadius':'50%',marginLeft:'78px',marginTop:'20px'}} alt='Avatar'/>
        <h3 style={{'textAlign':'center',color:'black'}}>Total Balance</h3>
        <h2 style={{'textAlign':'center',color:'black',fontSize:'24px'}}>$3,456</h2>
        
       </Paper>

      </div>
      </Grid>
      
    </Grid>
    </gridCards> 

    </div>

 
    
    </>
  )
}

export default Home