import axios from 'axios';
import {FETCH_USER} from './types';

export const fetchUser = () =>async (dispatch)=>{
    const res = await axios.get('/api/current_user');
    dispatch({type: FETCH_USER,payload: res.data});
  }
export const handleToken = (token) => async (dispatch)=>{
//payload contains user model with updated token
//reuse FETCH_USER since header will just look at FETCH_USER
  const res = await axios.post('/api/stripe', token);
  dispatch({type:FETCH_USER, payload: res.data });
}
