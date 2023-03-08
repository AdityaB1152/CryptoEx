import { Button } from '@mui/material'
import React from 'react'
import Metamask from '../../Assets/metamask.webp'

function Login() {
  return (
    <div style={{background:"black",height:"100vh",width:'100%'}} >
      <img src={Metamask} style={{maxHeight:'300px',display:'block',alignContent:'center',marginLeft:'auto',marginRight:'auto'}}></img>
      <Button  variant='contained' sx={{display:'block',alignContent:'center',marginLeft:'auto',marginRight:'auto'
    ,marginTop:"50px"}}>Authenticate with Metamask</Button>
      </div>
  )
}

export default Login