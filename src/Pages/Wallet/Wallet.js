import { Paper } from '@mui/material'
import React from 'react'

function Wallet() {
  return (
    <div className='main'>

<Paper sx={{'borderRadius':'5px','width':'500px',height:'300px',background:'#cdf888',
              marginTop:'10px'}}>

<b style={{color:'black',
                fontFamily:'monospace',fontSize:'16px',marginLeft:'15px',marginTop:'20px'}}>Assets</b>

                </Paper>
    </div>
  )
}

export default Wallet