import axios from 'axios';
import { SetAlert } from './alert';

import {
    ADD_TODO,GET_TODO,GET_TODOS,EDIT_TODO,DELETE_TODO,ERROR_TODO,CLOSE_TODO
} from '../Constants/Types';

export const addTodos= (title,Description) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const res = await axios.post(
        `/api/todos/`,
        {title,Description},
        config
      );
  
      dispatch({
        type: ADD_TODO,
        payload: res.data,
      });
      dispatch(SetAlert('Todo Added', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(SetAlert(error.msg, 'danger')));
        }
      dispatch({
        type: ERROR_TODO
    });
    }
  };

  export const getTodo = (id) => async (dispatch) => {

    try {
      const res = await axios.get(
        `/api/todos/${id}`,
      );
      dispatch({
        type: GET_TODO,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR_TODO,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  
  export const getTodos= () => async (dispatch) => {

    try {
      const res = await axios.get(`/api/todos/`,
      );
      dispatch({
        type: GET_TODOS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR_TODO,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };


  export const deleteTodo= (id) => async (dispatch) => {
    try {
    const res=  await axios.delete(`/api/todos/${id}`);
  
      dispatch({
        type: DELETE_TODO,
        payload: res.data,
      });
      dispatch(SetAlert('Todo Removed', 'success'));
      } catch (err) {
      dispatch({
        type: ERROR_TODO,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  export const editTodo= (id,title,Description) => async (dispatch) => {
    try {
   await axios.put(`/api/todos/${id}`, {title,Description},);
  
      dispatch({
        type: EDIT_TODO,
      });
      dispatch(SetAlert('Todo Removed', 'success'));
      } catch (err) {
      dispatch({
        type: ERROR_TODO,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  export const CloseTodo= (id) => async (dispatch) => {
    try {
   await axios.put(`/api/todos/close/${id}`);
  
      dispatch({
        type: CLOSE_TODO,
      });
      dispatch(SetAlert('Todo Finished', 'success'));
      } catch (err) {
      dispatch({
        type: ERROR_TODO,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };