const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');
const passport = require('passport');
const  bodyParser = require('body-parser');
require('./models/User'); //start up mongoose Users config
require ('./services/passport.js')
//connect to mongodb using mongoose
mongoose.connect(keys.mongoURI);
//app sets up configuration that listens to incoming requests
//and routes them to different handlers
const app = express(); //generates a single express app

//hook up body bodyParser
//parses body of REST call
//assigns it to req.body
app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV ==='production'){
	//Express will serve up production assets
	//like our main.js file or main .css file
	app.use(express.static('client/build'));
	//Express will serve up index.html file
	//if doesnt recognize the route
	const path require('path');
	app.get('*', (req,res)=>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	})
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
