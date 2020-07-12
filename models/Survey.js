const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipientSchema = require('./Recipient')
//yes/no counter for responses
//mongodb each document has 4MB limit
//Each user in user database will point to
//instances of surveys it has sent out
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes:{type:Number, default:0},
  no:{type:Number, default:0},
  _user:{type: Schema.Types.ObjectId, ref:'User'},
  dateSent:Date,
  lastResponded:Date
});
//console.log("REGISTERING SURVEYS");
mongoose.model('surveys', surveySchema);
