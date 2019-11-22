const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app  = express();
const User = require('./data/account');
mongoose.connect(User,{ useNewUrlParser: true });
const db=mongoose.connection;

//Check Connection
db.once('open', function(){
    console.log('Connected to MongoDB');
  });
  
// Check for DB errors
db.on('error', function(err){
    console.log(err.message);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',require('./routes/api'));

app.listen(5000, function () {
	console.log('Server Start');
});