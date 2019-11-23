const express = require('express');
const router = express.Router();
//const bcrypt = require('bcryptjs');
const passport = require('passport');
const User=require('../model/user');
const { check, validationResult} = require('express-validator/check');
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
            throw new Error('Username cannot be empty');
        }
        return true;
    }),
    check('email').custom((value, { req }) => {
        if (value =='') {
            throw new Error('Email cannot be empty');
        }
        return true;
    }),
    check('password1').custom((value, { req }) => {
        if (value =='') {
            throw new Error('Password cannot be empty');
        }
        return true;
    }),
    ],(req,res)=>{
        let errormsg=[];
        const errors = validationResult(req);
        if (errors) {
            errors.array().map((error)=>{
                errormsg.push({msg:error.msg})
            })
            res.json({error:errormsg});
        }
    }
    
    
    
    
    
   
   /* if(password1!=password2){
        res.json({errormsg:'Password do not match!!!'}) 
    }*/
   
)
module.exports = router;