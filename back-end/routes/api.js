const express = require('express');
const router = express.Router();

const User=require('../model/user');

router.get('/register',function(req,res,next){
    res.send('Register API')
})
router.post('/register', function (req, res, next) {
    var list = ["item1", "item2", "item3"];
    const userdata = JSON.stringify(req.body);
    console.log(userdata);
    res.json(userdata);
})
module.exports = router;