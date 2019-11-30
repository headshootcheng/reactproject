const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app  = express();
const User = require('./data/account');
let flash=require('connect-flash')
let session=require('express-session');
let passport=require('passport');
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

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Express Session
app.use(session({
  secret: 'Mole',
  resave: true,
  rolling: true,
  saveUninitialized: true,
  cookie: {
  maxAge: 60 * 1000 
  }
}));
require('./data/passport')(passport);
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',require('./routes/api'));

app.listen(5000, function () {
	console.log('Server Start');
});