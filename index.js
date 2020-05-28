const express = require('express');

//app sets up configuration that listens to incoming requests
//and routes them to different handlers
const app = express(); //generates a single express app

app.get('/',(req,res) => {
	res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);