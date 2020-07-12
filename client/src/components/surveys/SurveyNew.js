//SurveyNew shows SurveyForm and SurveyFormReview
import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component{
  //state initialization
  state = {showFormReview: false};
  //callback to change state
  renderContent(){
    if(this.state.showFormReview ===true){
      return <SurveyFormReview
        onCancel={()=> this.setState({showFormReview:false})}
      />;

    }
    return <SurveyForm
    onSurveySubmit={() => this.setState({showFormReview:true})}
    />;
  }
  render(){
    return(
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

//make sure to dump values if SurveyNew is unmounted
//connect reduxForm since tis is its default behavior
export default reduxForm({form:'surveyForm'})(SurveyNew);
