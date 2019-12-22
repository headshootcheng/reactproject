const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User=require('../model/user');
const { check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')


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
        const errormsg=[];
        const errors = validationResult(req);
        if (errors.array().length!=0) {
            errors.array().map((error)=>{
                errormsg.push({msg:error.msg})
            })
            res.json({error:errormsg});
        }
        else{
           
            const newUser = new User({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password1,
                score:0
              });
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newUser.password, salt,function (err,hash) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        newUser.password = hash;
                        newUser.save();
                        res.json({success:'Congrat!!! You are successfully registered!!!'});
                    }
                });
            })
           
        }
    }
)

router.get('/login',function(req,res,next){
    res.send('Login API')
})

/*router.post('/login',
    passport.authenticate('login', {
        successRedirect:'/success',
        failureRedirect:'/failed'
      })
    )
 */
/*router.post('/login',function(req,res,next){
    passport.authenticate('login', function(err, user, info) {
        //res.json(info);
        if(user){
            //res.json({redirect:'/'});
            res.json(user);
        }
        else{
            res.json(info);
        }
      })(req, res, next);
})
  

router.get('/user',function(req,res,next){

   if(req.isAuthenticated()&&req.user){
       res.json({
           loggedin:true,
           user:req.user
        })
   }
   else{
       res.json({
           loggedin:false,
           user:null
    })
   }
})*/

router.post('/login',function(req,res,next) {
    passport.authenticate('login', {session:false},function(err, user, info) {
        if(user){
            const token = jwt.sign(user.toJSON(), 'jwt_secret')
            res.json({token: token});
        }
        else{
            res.json(info);
        }
    })(req, res, next);
}) 

router.get('/user', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user) {
        let ranking=[];
        User.find().sort({score:-1}).then(user=>{
            for(var i = 0;i<10;i++){
                if(user[i]!=undefined){
                    ranking.push({
                        number:i+1,
                        icon:"http://127.0.0.1:5000/images/1155095104.jpg",
                        username:user[i].username,
                        score:user[i].score
                    });
                }
                else{
                    ranking.push({
                        number:i+1,
                        icon:"http://127.0.0.1:5000/images/defaulticon.jpg",
                        username:"/",
                        score:"/"
                    });
                }
            }
         }).then(()=>{
            res.json({
                username: req.user.username,
                email:req.user.email,
                score:req.user.score,
                icon: "http://127.0.0.1:5000/images/1155095104.jpg",
                rank:ranking,
                loggedin:true
            });
        })    
    }
    else{
        res.json({
            loggedin:false
        })
    }
})
    


  
    


module.exports = router;