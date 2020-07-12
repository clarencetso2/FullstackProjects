import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS} from './types';

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

export const submitSurvey =  (values, history) => async dispatch=> {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  //contains updated credits
  dispatch({type:FETCH_USER, payload:res.data});
  return {type:'submit_survey'};
};

export const fetchSurveys=() => async dispatch =>{
  const res = await axios.get('/api/surveys');
  dispatch({type:FETCH_SURVEYS, payload:res.data});
};
