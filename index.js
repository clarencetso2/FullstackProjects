const express = require('express');

//app sets up configuration that listens to incoming requests
//and routes them to different handlers
const app = express(); //generates a single express app

app.get('/',(req,res) => {
	res.send({hi: 'there'});
});

//figure out what port to listen to
const PORT = process.env.PORT;
app.listen(5000);