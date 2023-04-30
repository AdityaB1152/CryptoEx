import { Box, Button, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar';
import './Trade.css'
import Web3 from 'web3';
// import ExchangeContract from '../../../artifacts/contracts/Exchange.sol/Exchange.json'

function Trade() {

    /* 
    1.Retrive the order history
        // Fetch Orders Map and update order book table.
    2.Make , Fill and Cancel Orders
    3.Filter the orders and show relevant content
    */
  const [scData , setScData] = useState({

  });

  var token1;
  var token2;
  var userAddress;

  var contractAddress
  var abi;


  useEffect(()=>{
     
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const contract = new web3.eth.Contract(abi , contractAddress );

    const loadBlockchainData = (error , result) => {
      if(!error){


        setScData();
      }
    };

    contract.events.ValueChanged({},loadBlockchainData);

    return ( ) => {
      contract.events.ValueChanged({},loadBlockchainData).unsubscribe();
    };

  },[]);
  



const [market , setMarket] = React.useState('');

function createData(name, calories, fat) {
  return { name, calories, fat };
}


// const web3 = new Web3(window.ethereum);
//   const exchangeAddress = "";
//   const exchangeContract = new web3.eth.Contract(abi , exchangeAddress);
// const createOrder = async (amountGet , amountGive ) =>{
    
//   exchangeContract.methods.makeOrder(token1,amountGet,token2,amountGive).send({
//     from: userAddress
// });

// }

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const [isBuy, setIsBuy] = useState(true); // default option is "buy"
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleToggleChange = (event) => {
    setIsBuy(!isBuy);
  };

const selectedMarket = (event) => {
  console.log("Target Function Triggered")
setMarket(event.target.value) 
console.log(market);
}

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
          <MenuItem value={40}>mETH</MenuItem>
          <MenuItem value={50}>mBTC</MenuItem>
          <MenuItem value={60}>mDAI</MenuItem>
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
               
               <form>
      <div>
        <label htmlFor="amount" style={{color:'white'}}>{isBuy ? 'Buy Amount' : 'Sell Amount'}</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price" style={{color:'white'}}>{isBuy ? 'Buy Price' : 'Sell Price'}</label>
        <input
          id="price"
          type="number"
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
      <Button type="submit" >Submit</Button>
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