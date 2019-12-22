const express = require('express');
const router = express.Router();
const User = require('../model/user');
const multer = require('multer');
const passport = require('passport');
const path = require('path');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');


router.get('/email',function(req,res,next){
    res.send('Email API')
})

router.get('/icon',function(req,res,next){
    res.send('Icon API')
})

router.get('/resetpw',function(req,res,next){
    res.send('Reset Password API')
})
//Reset Email
router.post('/email',passport.authenticate('jwt', {session: false}),[ 
  check('email').custom((value, { req }) => { 
  return User.find({'email':value}).then(user=>{
          if(user.length>0){
              return Promise.reject('This email is existed!!!');
          }
      })   
  }),
  check('email').isEmail().withMessage('Wrong Email Format!!!'),
  check('email').custom((value, { req }) => {
    if (value =='') {
        throw new Error('Email cannot be empty!!!');
    }
    return true;
  })
  ],function(req,res,next){
    const user_info = req.user.username;
    const email = req.body.email;
    const errormsg=[];
    const errors = validationResult(req);
    if (errors.array().length!=0) {
      errors.array().map((error)=>{
          errormsg.push({msg:error.msg})
      })
      res.json({error:errormsg});
  }
  else{
    User.updateOne({username:user_info},{$set:{email:email}},function(err,result){
      console.log('updated');
      res.json({msg:'success'});
    })
  }
})
//Reset Icon
router.post('/icon', passport.authenticate('jwt', {session: false}),function(req,res,next){
    const user_info=req.user.username;
    //console.log(user_info);
    const storage = multer.diskStorage({
        destination: './public/images/',
        filename: function (req, file, cb) {
          cb(null, user_info + '.jpg');
        }
      });

     const upload = multer({ 
         storage: storage,
         limits: {
            fileSize: 1000000
          },
          fileFilter: function (req, file, cb) {
            checkfiletype(file, cb);
          }
     }).single('file')

     function checkfiletype(file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        //console.log(path.extname(file.originalname).toLowerCase());
        console.log(file.mimetype);
        if (mimetype && extname) {
          return cb(null, true);
        } else {
          return cb();
        }
      }

      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        User.updateOne({username:user_info},{$set:{icon:true}},function(err,result){
          console.log('updated');
          res.json({msg:'success'});
        })
      })
})

//Reset Password
router.post('/resetpw',passport.authenticate('jwt', {session: false}),[
  check('oldpassword').custom((value, { req }) => { 
    return bcrypt.compare(value, req.user.password).then( match=> { 
        if(!match){
          return Promise.reject('Wrong Password');
        }
      })
  }),
  check('oldpassword').custom((value, { req }) => {
    if (value =='') {
        throw new Error('Cannot be empty!!!');
    }
    return true;
  }),
  check('newpassword').custom((value, { req }) => { 
    return bcrypt.compare(value, req.user.password).then(match=> { 
        if(match){
          return Promise.reject('New password cannot be the same as before');
        }
    })
  }),
  check('newpassword').custom((value, { req }) => {
    if (value =='') {
        throw new Error('Cannot be empty!!!');
    }
    return true;
  }),
  check('confirmedpassword').custom((value, { req }) => { 
    if (value !=req.body.newpassword) {
      throw new Error('Your Confirmed Password is not matched!!!');
    }
    return true;
  }),
  check('confirmedpassword').custom((value, { req }) => {
    if (value =='') {
        throw new Error('Cannot be empty!!!');
    }
    return true;
  }),   
],(req,res)=>{
  const user_info=req.user.username;
  const errormsg=[];
  const errors = validationResult(req);
  if (errors.array().length!=0) {
      errors.array().map((error)=>{
          errormsg.push({msg:error.msg})
      })
      res.json({error:errormsg});
  }
  else{
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(req.body.newpassword, salt,function (err,hash) {
        if(err){
            console.log(err);
        }
        else{
          User.updateOne({username:user_info},{$set:{password:hash}},function(err,result){
            console.log('updated');
            //console.log('hash:',hash,req.body.newpassword);
            res.json({success:'Your Password is successfully updated!!!'});
          })
        }
      })
    })
  }
})

module.exports = router;