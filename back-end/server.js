const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app  = express();
const User = require('./data/account');
const flash=require('connect-flash')
//const session=require('express-session');
const passport=require('passport');
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

app.use(cors({
  origin:"http://localhost:3000",
  methods: ['GET','POST'],
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With"
}));

/*app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Express Session
/*app.use(session({
  secret: 'Mole',
  resave: true,
  rolling: true,
  saveUninitialized: true,
  cookie: {
  maxAge: 600000 * 1000 ,
  httpOnly:false
  }
}));*/
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