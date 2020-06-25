const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const {Schema} = mongoose; //destructuring

//can freely add or subtract properties
const userSchema = new Schema({
  googleId: String
});

//Collection of users
//each record will look like userSchema
mongoose.model('users', userSchema);
