const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User'); //start up mongoose Users config
require ('./services/passport.js')
//connect to mongodb using mongoose
mongoose.connect(keys.mongoURI);
//app sets up configuration that listens to incoming requests
//and routes them to different handlers
const app = express(); //generates a single express app

//hook up 3 middlewares
app.use(
	//tell express it needs to use cookies
	cookieSession({
		//cookie lasts for 30 days in miliseconds
		maxAge:30 * 24 * 60 * 60 * 1000,
		//encrypt
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
