import { Route, Routes }from "react-router-dom";
import React, { useEffect } from 'react';
import './App.css';
import setAuthToken from './Redux/utils/setAuthToken';
import { loadUser } from './Redux/Actions/auth';
import store from './Redux/Store';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashborad/Dashboard";
import Alert from "./components/Layout/Alert";
import Navbar from "./components/Layout/Navbar";
import ListTodos from "./components/Todos/ListTodos";
import ViewTodo from "./components/Todos/ViewTodo";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div >
          <Alert className='aaa' />
          <Navbar/>

    <Routes>
<Route exact path='/register' element={<Register/>} />
<Route exact path='/login' element={<Login/>} />
<Route  path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
<Route  path='/ListTodos' element={<PrivateRoute><ListTodos/></PrivateRoute>} />
<Route  path='/get-todo' element={<PrivateRoute><ViewTodo/></PrivateRoute>} />

</Routes>

</div>
  );
}
export default App;