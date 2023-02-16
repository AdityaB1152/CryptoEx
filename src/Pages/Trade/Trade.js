import { Grid, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import React from 'react'
import './Trade.css'

function Trade() {
const [market , setMarket] = React.useState('');

const selectedMarket = (event) => {
  console.log("Target Function Triggered")
setMarket(event.target.value) 
}

  return (
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
          <MenuItem  value={10}>dEth</MenuItem>
          <MenuItem value={20}>dBTC</MenuItem>
        </Select>
        <div className='trade-grid'>
          <Grid container spacing={2}>

            <Grid item >
              <div>
                <Paper sx={{'borderRadius':'5px','width':'400px',height:'250px',background:'hwb(180 6% 92%)',
              marginTop:'50px'}}>
                  <b style={{color:'white',
                fontFamily:'monospace',fontSize:'16px',marginLeft:'15px'}}>My Orders</b>
                </Paper>
              </div>
            </Grid>
            <Grid item >
              <div>
                <Paper sx={{'borderRadius':'5px','width':'400px',height:'250px',background:'hwb(180 6% 92%)',
              marginTop:'50px'}}>

<b style={{color:'white',
                fontFamily:'monospace',fontSize:'16px',marginLeft:'15px'}}>My Trades</b>

                </Paper>
              </div>
            </Grid>
            <Grid item >
              <div>
                <Paper sx={{'borderRadius':'5px','width':'400px',height:'250px',background:'hwb(180 6% 92%)',
              marginTop:'50px'}}>
                <b style={{color:'white',
                fontFamily:'monospace',fontSize:'16px',marginLeft:'15px'}}>Balance</b>

                </Paper>
              </div>
            </Grid>

          </Grid>

         
              <div>
                <Paper sx={{'borderRadius':'5px','width':'100%',height:'300px',background:'hwb(180 6% 92%)',
              marginTop:'10px'}}>

<b style={{color:'white',
                fontFamily:'monospace',fontSize:'16px',marginLeft:'15px',marginTop:'20px'}}>Order Book</b>

                </Paper>
                
              </div>
            
        </div>
      </div>
      
    </div>
  )
}

export default Trade