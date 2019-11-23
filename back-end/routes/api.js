const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User=require('../model/user');
const { check, validationResult} = require('express-validator');
router.get('/register',function(req,res,next){
    res.send('Register API')
})
router.post('/register', [
    check('password2').custom((value, { req }) => {
        if (value !== req.body.password1) {
            throw new Error('Password do not match');
        }
        return true;
    }),
    check('email').isEmail().withMessage('Wrong Email Format!!!'),
    check('username').custom((value, { req }) => {
        if (value =='') {
            throw new Error('Username cannot be empty!!!');
        }
        return true;
    }),
    check('email').custom((value, { req }) => {
        if (value =='') {
            throw new Error('Email cannot be empty!!!');
        }
        return true;
    }),
    check('password1').custom((value, { req }) => {
        if (value =='') {
            throw new Error('Password cannot be empty!!!');
        }
        return true;
    }),
    check('username').custom((value, { req }) => {
        return User.find({'username':value}).then(user=>{
                if(user.length){
                    return Promise.reject('This username is existed!!!');
                }
            })   
    }),
    check('email').custom((value, { req }) => {
        return User.find({'email':value}).then(user=>{
                if(user.length>0){
                    return Promise.reject('This email is existed!!!');
                }
            })   
    })
    ],(req,res)=>{
        let errormsg=[];
        const errors = validationResult(req);
        if (errors.array().length!=0) {
            errors.array().map((error)=>{
                errormsg.push({msg:error.msg})
            })
            console.log(errors.array());
            res.json({error:errormsg});
        }
        else{
           
            let newUser = new User({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password1
              });
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newUser.password, salt,function (err,hash) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        newUser.password = hash;
                        console.log(newUser);
                        newUser.save();
                        res.json({redirect:true});
                    }
                });
            })
           
        }
    }
)
module.exports = router;