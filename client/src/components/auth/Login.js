import React, { Fragment, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { login } from '../../Redux/Actions/auth';
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import {  Navigate } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';
const theme = createTheme();

function Login() {
const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const [token, settoken] = useState("");
const [isOpenlogin, setisOpenlogin] = useState(true);

const [isOpen, setisOpen] = useState(false);
const [isOpencode, setisOpencode] = useState(false);
const [changepassisopen, setchangepassisopen] = useState(false);
const [validercode, setvalidercode] = useState(false);
// const history = useHistory();
const navigate = useNavigate();

   const onsubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/auth/forgot-password`, {email}) .then((res) => {
    settoken(res.data.token)
    swal("Good job!", "Reset email has been sent successfully!!", "success");
    setisOpen(false)
    setisOpencode(true)
}) .catch((err) => 
swal("Opps!", err.response.data.message, "error")
);
    

 };
  const submitvalidercode=(e)=>{
    e.preventDefault();

         axios.post(`/api/auth/verify-reset-code`, {token,typedResetCode:validercode}).then((res=>{
            
               swal("Good job!", "Success!!", "success");
         setisOpencode(false)
        setchangepassisopen(true)
         })).catch ((err)=> {
            swal("Opps!", err.response.data.message, "error")
  })}
const changeform=(e)=>{
  e.preventDefault();
  setisOpenlogin(false)
  setisOpen(true)
}
  const submitchangepass=(e)=>{
    e.preventDefault();
    try {

         axios.post(`/api/auth/reset-password`, {email,password})
       
        swal("Password Changed!")
        setisOpenlogin(true)
        setchangepassisopen(false)

      } catch (err) {
        swal(err.response.data.message)
            
    }
  }
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated } =auth ;

  const onsubmitcnn = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />
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
    {isOpenlogin?
  <Fragment>
        <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <Box component="form" onSubmit={e=>onsubmitcnn(e)} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name='email'
        value={email}
        onChange={(e) => setemail(e.target.value)}
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={password}
        minLength='6'
        onChange={(e) => setpassword(e.target.value)}

        autoComplete="current-password"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
          <Button onClick={e=>changeform(e)}>
            Forgot password?
          </Button>
   
    </Box>
  </Fragment>  :null
  }
    {isOpen==true? <Fragment>
    <Typography component="h1" variant="h5">
    Forget Password    </Typography>
    <Box noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name='email'
        value={email}
        type='email'
        onChange={(e) => setemail(e.target.value)}
        autoComplete="email"
        autoFocus
      />
   
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={e=>onsubmit(e)}    
  >
        Forget Password
      </Button>
     
    </Box>
    </Fragment>:null}
    {isOpencode?<Fragment>
        <Typography component="h1" variant="h5">
    Forget Password    </Typography>
    <Box noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="Code"
        label="Code"
        name='validercode'
        value={validercode}
        type='number'
        onChange={(e) => setvalidercode(e.target.value)}
        autoComplete="email"
        autoFocus
      />
   
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={e=>submitvalidercode(e)}   >
        Valider code
      </Button>
     
    </Box>
    </Fragment>:null}
    {changepassisopen? <Fragment>
        <Typography component="h1" variant="h5">
    Change Password    </Typography>
    <Box component="form" noValidate onSubmit={(e) => submitchangepass(e)} sx={{ mt: 1 }}>

           <TextField
        margin="normal"
        required
        fullWidth
        id="password"
        label="password"
        name='password'
        value={password}
        type='password'
        onChange={(e) => setpassword(e.target.value)}
        autoComplete="password"
        autoFocus
      />
   
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
           >
        Update Password
      </Button>
     
    </Box>
    </Fragment>:null}
  </Box>

</Container>
</ThemeProvider>
  );
}
export default Login;
