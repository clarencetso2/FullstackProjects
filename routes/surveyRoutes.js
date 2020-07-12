const _=require('lodash');
const { Path } = require('path-parser');
const {URL} = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer.js');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
//check user is logged inspect
//and has enough credits to send
//create new survey and send it
//if email sent successfully, save it to db
module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req,res) => {
      const surveys= await Survey.find({_user: req.user.id})
        .select({recipients:false});
      //tell mongo we dont want to recieve
      //long list of recipients
      res.send(surveys);
  });
  app.get('/api/surveys/:surveyId/:choice', (req,res) =>{
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req,res) => {
    //process dirty webhooks
    //only want "click events"
    //no duplicates
    //match pattern of pathname, extract surveyId and choice
    //and return in an object containing that info
    //match will be null if cant extract surveyId and choice
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
    .map(({email,url}) => {
      //console.log(p.test(pathname));
      const match = p.test(new URL(url).pathname);
      if(match){
        return {email,surveyId:match.surveyId,choice:match.choice};
      }
    })
    .compact()     //removed undefined (not valid) events
    .uniqBy('email', 'surveyId')  //remove all duplicate responses
    .each(({surveyId,email,choice}) => {
      Survey.updateOne({
        _id:surveyId,
        recipients:{
          $elemMatch: {email:email,responded:false}
        }
      }, {
        $inc:{[choice]: 1},
        $set: {'recipients.$.responded':true},
        lastResponded: new Date()
      }).exec();
    })
    .value();

    //console.log(events);

    res.send({});
  });

  app.post('/api/surveys', requireLogin,requireCredits, async (req,res) =>{
    const {title,subject,body,recipients} = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim(), responded:false })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    // time to send an email
    //subject/recipients, body of email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try{
      console.log("sending mailer");
      await mailer.send();
      //make sure to save survey to database
      console.log("saving survey");
      await survey.save();
      //deduct 1 credit for the surveys
      req.user.credits-=1;
      console.log("saving credits");
      const user = await req.user.save();
      res.send(user);
    } catch(err){
      res.status(422).send(err);
    }

  });
};

//splitting recipient:
//email list will be string of emails delimited by comma
//seperate them and create new object for each email
//we get array of objects, each object is an email
