import React, { useState } from 'react';

import {  Link,Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { register } from '../../Redux/Actions/auth';
import { SetAlert } from '../../Redux/Actions/alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();
function Register(props) {
  const [fromData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    phoneNumber:''
  });
  const {
    firstname,
    lastname,
    email,
    password,
    password2,
    phoneNumber
  } = fromData;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated } =auth ;
  const hundelchange = (e) =>
    setFormData({ ...fromData, [e.target.name]: e.target.value });
    const onsubmit = (e) => {
      e.preventDefault();
      if (password !== password2) SetAlert('Password do not match', 'danger');
      else {
        dispatch(register({
          firstname,
          lastname,
          email,
          password,
          password2,
          phoneNumber
        }));
      }
    };
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  return (
    

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
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={(e) => onsubmit(e)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name='firstname'
              value={firstname}
              onChange={(e) => hundelchange(e)}    
              placeholder='First Name'
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
              name="lastname"
              autoComplete="family-name"
              placeholder='Last Name'
              value={lastname}
              onChange={(e) => hundelchange(e)}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              id="email"
              label="Email Address *"
              placeholder='Email'
              name='email'
              value={email}
              onChange={(e) => hundelchange(e)}
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
              placeholder='Password'
              value={password}
              minLength='6'
              onChange={(e) => hundelchange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Confirm Password"
              type="Password"
              id="password"
              autoComplete="new-password"
              minLength='6'
              name='password2'
              value={password2}
              onChange={(e) => hundelchange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="phone Number"
              type="number"
              id="phone"
              minLength='8'
              maxLength='8'
              name='phoneNumber'
              value={phoneNumber}
              onChange={(e) => hundelchange(e)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
</ThemeProvider>
  );
}

export default Register