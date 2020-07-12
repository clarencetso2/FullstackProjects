const mongoose = require('mongoose');
const {Schema} = mongoose;

//has user responded
//dont want to double count
const recipientSchema = new Schema({
  email:String,
  responded:{type:Boolean, default:false}
});

module.exports=recipientSchema;
