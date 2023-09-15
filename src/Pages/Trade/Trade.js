import { Box, Button, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar';
import './Trade.css'
import { ethers } from 'ethers';
import Web3 from 'web3';
import { create } from '@mui/material/styles/createTransitions';
// import ExchangeContract from '../../../artifacts/contracts/Exchange.sol/Exchange.json'

function Trade() {

    /* 
        // Fetch Orders Map and update order book table.
    2.Make , Fill and Cancel Orders
    3.Filter the orders and show relevant content
    */
  const [scData , setScData] = useState({

  });

  var token1;
  var token2;
  var userAddress;

  var provider
  var contractAddress
  var abi;

  const openOrders = [],filledOrders = [],cancelledOrders = [];

  const contract = new ethers.Contract(contractAddress , abi , provider);


  const loadBlockchainData = async () => {

    const orderCount = await contract.orderCount();
    const orderCancelled = await contract.orderCancelled();
    const ordersFilled = await contract.ordersFilled();
   

    for (let i = 1; i <= orderCount; i++) {
    if (ordersFilled[i]) {
      const order = await contract.orders(i);
      filledOrders.push(order);
    }
    }

    for (let i = 1; i <= orderCount; i++) {
    if (orderCancelled[i]) {
      const order = await contract.orders(i);
      cancelledOrders.push(order);
    }
    }

  
  for (let i = 1; i <= orderCount; i++) {

    const order = await contract.orders(i);

    if (!orderCancelled[i] && !ordersFilled[i]) {

      openOrders.push(order);
      
    }
  }

  console.log("Open Orders:", openOrders);



}

  async function createOrder(){
  
      try {
        const result = await contract.makeOrder(token1 , amount , token2 , price); 
        console.log('response', result);
      } catch (error) {
        console.error('Error calling function:', error);
      }
    
  }

  async function fillOrder(){

    try{
      const result = await contract.fillOrder();
      console.log(result);

    } catch(error){
      console.log(error);
    }
  }

 


const [market , setMarket] = React.useState(10);

function createData(name, calories, fat) {
  return { name, calories, fat };
}





const rows = [];

openOrders.forEach(order => {

    const timestamp = order.timestamp;
    const tokenGet = order.tokenGet;
    const tokenGive = order.tokenGive;

    rows.push(createData(timestamp , tokenGet , tokenGive));
});


  //------------------------------------------Buying or Selling Option Toggle---------------------------------------------------------

  const [isBuy, setIsBuy] = useState(true); // default option is "buy"
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleToggleChange = (event) => {
    setIsBuy(!isBuy);
  };


  // --------------------------------------------Market Selection--------------------------------------------------------

const selectedMarket = (event) => {
  console.log("Target Function Triggered")
  setMarket(event.target.value) 
  console.log(market);

  if(market == 10){
    token1 = 'mEth'
    token2 = 'mDai'
  }

  if(market == 20){
    token1 = 'mEth'
    token2 = 'mDai'
  }
  if(market == 30){
    token1 = 'mEth'
    token2 = 'mDai'
  }
  

  console.log('Token 1 '+token1);
  console.log('Token 2 '+token2);
}
//---------------------------------------------------------------------FRONTEND-------------------------------------------------------------

  return (
    <>
    <Navbar/>
    <div className='main'>

      <div>
        <a style={{color:"white",fontSize:"18px",marginRight:'10px'}}>Select Market</a>
        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={market}
          
          onChange={ selectedMarket}
          sx={{backgroundColor:"#7289DA",width:"200px",marginTop:"20px",}}
          
        >
          <MenuItem  value={10}>mETH\mDAI</MenuItem>
          <MenuItem value={20}>mBTC\mDAI</MenuItem>
          <MenuItem value={30}>mETH\mBTC</MenuItem>
         
        </Select>
        <div className='trade-grid'>
          <Grid container spacing={2}>

            <Grid item >
              <div>
                <Paper sx={{'borderRadius':'5px','width':'400px',height:'250px',background:'hwb(180 6% 92%)',
              marginTop:'50px'}}>
                  <b style={{color:'white',
                fontFamily:'monospace',fontSize:'16px',marginLeft:'15px'}}>My Orders</b>
                <TableContainer component={Paper} sx={{ marginLeft: '10px',maxWidth: '380px' , maxHeight:'200px',marginTop:'10px',outlineColor:'blue'}}>
      <Table sx={{ maxWidth: 380 , maxHeight:'200px' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Dapp</TableCell>
            <TableCell align="right">Dapp/mETH</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                </Paper>
              </div>
            </Grid>
            <Grid item >
              <div>
                <Paper sx={{'borderRadius':'5px','width':'400px',height:'250px',background:'hwb(180 6% 92%)',
              marginTop:'50px'}}>

<b style={{color:'white',
                fontFamily:'monospace',fontSize:'16px',marginLeft:'15px'}}>New Order</b>
               
               <form style={{marginLeft:'15px'}}>
               <br/>
               
      <div >
        <label htmlFor="amount" style={{color:'white'}}>{isBuy ? 'Buy Amount' : 'Sell Amount'}</label><br/>
        <input
          id="amount"
          type="number"
          style={{color:'black',width:'200px',height:'30px'}}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price" style={{color:'white'}}>{isBuy ? 'Buy Price' : 'Sell Price'}</label><br/>
        <input
          
          id="price"
          style={{color:'black',width:'200px',height:'30px'}}
          type='number'
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={isBuy}
              onChange={handleToggleChange}
              name="buy-sell-toggle"
              color="primary"
            />
          }
          label={isBuy ? 'Buy' : 'Sell'}
          style={{color:'white'}}
        />
      </div>
      <Button type="submit" onSubmit={createOrder(market,token1,token2)} >Submit</Button>
    </form>

                </Paper>
              </div>
            </Grid>
            <Grid item >
              <div>
                <Paper sx={{'borderRadius':'5px','width':'400px',height:'250px',background:'hwb(180 6% 92%)',
              marginTop:'50px'}}>
                <b style={{color:'white',
                fontFamily:'monospace',fontSize:'16px',marginLeft:'15px'}}>Balance</b>
                   <TableContainer component={Paper} sx={{ marginLeft: '10px',maxWidth: '380px' , maxHeight:'200px',marginTop:'10px',outlineColor:'blue'}}>
      <Table sx={{ maxWidth: 380 , maxHeight:'200px' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Dapp</TableCell>
            <TableCell align="right">Dapp/mETH</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                </Paper>
              </div>
            </Grid>

          </Grid>

         
              <div>
                <Paper sx={{'borderRadius':'5px','width':'100%',height:'300px',background:'hwb(180 6% 92%)',
              marginTop:'10px'}}>

<b style={{color:'white',
                fontFamily:'monospace',fontSize:'16px',marginLeft:'15px',marginTop:'20px'}}>Order Book</b>

<TableContainer component={Paper} sx={{ marginLeft: '10px',maxWidth: '380px' , maxHeight:'200px',marginTop:'10px',outlineColor:'blue'}}>
      <Table sx={{ maxWidth: 380 , maxHeight:'200px' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Dapp</TableCell>
            <TableCell align="right">Dapp/mETH</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

                </Paper>
                
              </div>
            
        </div>
      </div>
      
    </div>
    </>
  )

  
}



export default Trade