/* eslint-disable no-undef */
import { ThemeProvider } from '@emotion/react'
import { Copyright, LockClockOutlined, LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import {createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useState } from 'react'
import {app } from '../firebaseConfig'
import { Link , useNavigate} from 'react-router-dom'
import Metamask from '../../Assets/metamask.webp'

function Copy(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {

  const navigate = useNavigate();
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [walletStatus, setWalletStatus] = useState({
    status:true,
    walletId : ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email : data.get('email'),
      fname : data.get('firstName'),
      lname : data.get('lastName'),
      walletId : walletStatus.walletId[0]
    }
    console.log(user);
   createUserWithEmailAndPassword(auth , user.email , data.get('password'))
   .then(async (cred) =>{
      console.log("User" , cred.user.uid);
      
      await setDoc(doc(db , 'Users' , cred.user.uid) , user)
      .then(()=>{
        navigate('/');
      }).catch((error) => {
        console.log(error);
      })

   }).catch ( (error) => {
      console.log(error);
   });
  };

  const loadBlockchainData =async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    console.log(accounts);

    setWalletStatus({
      status:false,
      walletId : accounts
    })

    console.log("Wallet Status",walletStatus);
  }


  return (
    <div style={{background:'white',height:'100vh',width:'100%'}}>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            
            </Grid>
            <Button
              onClick = {loadBlockchainData}
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
              
            >
              Authenticate with Metamask
            </Button>
            <Button
              type = 'submit'
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={walletStatus.status}
             
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    </div>
  );
        }