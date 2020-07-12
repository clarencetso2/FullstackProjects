import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from'./SurveyField';
//import SurveyFormReview from './SurveyFormReview;
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component{
  //name: name of key in reducer
  renderFields(){
    return _.map(formFields,({label,name})=>{
      return (
        <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
      );
    });
  }
  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>

        </form>
      </div>
    );
  }
}
//redux form automatically passes error
//to the corresponding field
//ie error.title will be passed to title field
function validate(values){
  const errors={};
  errors.recipients= validateEmails(values.recipients || '');

  _.each(formFields, ({name})=>{
    if(!values[name]){
      errors[name]='You must provide a value'
    }

  });
  return errors;
}
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount:false
})(SurveyForm);
