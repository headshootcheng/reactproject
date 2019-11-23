const express = require('express');
const router = express.Router();

const User=require('../model/user');

router.get('/register',function(req,res,next){
    res.send('Register API')
})
router.post('/register', function (req, res, next) {
    const username= req.body.username;
    const email = req.body.email;
    const password1=req.body.password1;
    const password2 = req.body.password2;
    //console.log(req.body.username);
    if(password1!=password2){
        res.json({errormsg:'2 passwords must be the same!!!'})
    }
})
module.exports = router;