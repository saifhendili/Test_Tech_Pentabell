import axios from 'axios';
import { SetAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_PROFILE,
  LOGOUT,
  FORGET_PASSWORD,
  ERROR_UPDATEPASS

} from '../Constants/Types';
import setAuthToken from '../utils/setAuthToken';
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = ({
  firstname,
  lastname,
  email,
  password,
  phoneNumber
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    firstname,
    lastname,
    email,
    password,
    phoneNumber
  });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(SetAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(SetAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const ForgotPassword = (email)=>async(dispatch)=>{

  try {
 const res= await  axios.post(`/auth/forgot-password`, {email})
      dispatch({
          type:FORGET_PASSWORD,
        payload:res.data
      })  
      dispatch(SetAlert('Reset email has been sent successfully', 'success'));

  } catch (err) {

      dispatch({
        type: ERROR_UPDATEPASS,
        // payload: { msg: err.response.statusText, status: err.response.status },
      });
  }
}


// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};