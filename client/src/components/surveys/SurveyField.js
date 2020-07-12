//Individual field to render onto SurveyForm
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

//blur = input.onBlur
export default({input,label,meta:{error,touched} }) =>{
  return(
    <div>
      <label>{label}</label>
      <input {...input}  style={{marginBottom: '5px'}}/>
      <div className="red-text" style={{marginBottom:'20px'}}>
        {touched && error}
      </div>
    </div>
  );
};
