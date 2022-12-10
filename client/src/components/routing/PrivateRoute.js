import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function PrivateRoute  ({
  children 
}){
const dispatch = useDispatch();
const auth = useSelector((state) => state.auth);
const { isAuthenticated } =auth ;


  return isAuthenticated ? children : <Navigate to="/login" />;
}


export default  PrivateRoute