const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
//dont use require for mongoose related things
//mongoose will get confused if loading same model multiple times
//console.log("USING USER MODEL");
const User = mongoose.model('users'); //User = mongoose model class of 'user'
passport.serializeUser((user,done) => {
  //give user the cookie containing userid
  //the unique use id generated by mongodb
  //not using profileid since different ids
  //from various providers (Google Facebook etc) exist
   done(null,user.id);
});

passport.deserializeUser((id,done) =>{
  //get Users cookie, turn it back into
  //mongodb collection
  User.findById(id).then(user=>{
      done(null,user);
    })
})
passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
    //relative path, google thinks we going to
    //http address rather than https
		callbackURL:'/auth/google/callback',
    //to get around this let google trust HEROKU encryption
    proxy: true
	}, async (accessToken,refreshToken,profile,done) => {
    // console.log("PRINTING!!!!");
		// console.log(accessToken);
		// console.log(refreshToken);
		// console.log(profile);

    //If profileid exists, skip creation
    //This is asynchronous
    const existingUser = await User.findOne({googleId: profile.id})
    if(existingUser) {
      //user already exists
      //done(errObject, userRecord)
      return done(null,existingUser);
    }

    //else need to create new user
    //save unique id from profile into mongodb
    const user = await new User({googleId: profile.id}).save();
      done(null,user);



	})
);
