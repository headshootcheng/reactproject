const express = require('express');
const router = express.Router();
const User = require('../model/user');
const multer = require('multer');
const passport = require('passport');
const path = require('path');
const { check, validationResult} = require('express-validator');


router.get('/email',function(req,res,next){
    res.send('Email API')
})

router.get('/icon',function(req,res,next){
    res.send('Icon API')
})

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

router.post('/icon', passport.authenticate('jwt', {session: false}),function(req,res,next){
    const user_info=req.user.username;
    console.log(user_info);
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
         res.json({msg:'success'});
        })
})
/*router.post('/icon', function (req, res, next) {

    let user_info=req.user.username;
    //Set Storage Engine
    let storage = multer.diskStorage({
      destination: './public/images/',
      filename: function (req, file, cb) {
        cb(null, user_info + '.jpg');
      }
    });
    
    let upload = multer({
      storage: storage,
      limits: {
        fileSize: 1000000
      },
      fileFilter: function (req, file, cb) {
        checkfiletype(file, cb);
      }
    }).single('usericon');
    
    function checkfiletype(file, cb) {
      let filetypes = /jpeg|jpg|png/;
      let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      let mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        return cb();
      }
    }
    
  
    upload(req, res, (err) => {
  
      if (req.file) {
        User.query(deleteicon, [user_info], function (err, result) {
          User.query(inserticon, [user_info, req.file.filename, req.file.mimetype, req.file.size, req.file.path], function (err, result) {
            icon_info = req.file.filename;
            User.query(checkrank, function (err, result) {
  
              if (result[0]) {
                number1_info_username = result[0].username;
                number1_info_score = result[0].highestscore;
                User.query(checkicon, [number1_info_username], function (err, icon) {
                  if (icon.length > 0) {
                    number1_info_icon = 'images/icon/' + icon[0].name;
                  } else {
                    number1_info_icon = 'images/icon/' + 'default.jpg';
                  }
                })
              }
              if (!result[0]) {
                number1_info_username = '/';
                number1_info_score = '/';
                number1_info_icon = 'images/icon/' + 'default.jpg';
              }
              if (result[1]) {
                number2_info_username = result[1].username;
                number2_info_score = result[1].highestscore;
                User.query(checkicon, [number2_info_username], function (err, icon) {
                  if (icon.length > 0) {
                    number2_info_icon = 'images/icon/' + icon[0].name;
                  } else {
                    number2_info_icon = 'images/icon/' + 'default.jpg';
                  }
                })
              }
              if (!result[1]) {
                number2_info_username = '/';
                number2_info_score = '/';
                number2_info_icon = 'images/icon/' + 'default.jpg';
              }
              if (result[2]) {
                number3_info_username = result[2].username;
                number3_info_score = result[2].highestscore;
                User.query(checkicon, [number3_info_username], function (err, icon) {
                  if (icon.length > 0) {
                    number3_info_icon = 'images/icon/' + icon[0].name;
                  } else {
                    number3_info_icon = 'images/icon/' + 'default.jpg';
                  }
                })
              }
              if (!result[2]) {
                number3_info_username = '/';
                number3_info_score = '/';
                number3_info_icon = 'images/icon/' + 'default.jpg';
              }
              if (result[3]) {
                number4_info_username = result[3].username;
                number4_info_score = result[3].highestscore;
                User.query(checkicon, [number4_info_username], function (err, icon) {
                  if (icon.length > 0) {
                    number4_info_icon = 'images/icon/' + icon[0].name;
                  } else {
                    number4_info_icon = 'images/icon/' + 'default.jpg';
                  }
                })
              }
              if (!result[3]) {
                number4_info_username = '/';
                number4_info_score = '/';
                number4_info_icon = 'images/icon/' + 'default.jpg';
              }
              if (result[4]) {
                number5_info_username = result[4].username;
                number5_info_score = result[4].highestscore;
                User.query(checkicon, [number5_info_username], function (err, icon) {
                  if (icon.length > 0) {
                    number5_info_icon = 'images/icon/' + icon[0].name;
                  } else {
                    number5_info_icon = 'images/icon/' + 'default.jpg';
                  }
                })
              }
              if (!result[4]) {
                number5_info_username = '/';
                number5_info_score = '/';
                number5_info_icon = 'images/icon/' + 'default.jpg';
              }
              if (result[5]) {
                number6_info_username = result[5].username;
                number6_info_score = result[5].highestscore;
                User.query(checkicon, [number6_info_username], function (err, icon) {
                  if (icon.length > 0) {
                    number6_info_icon = 'images/icon/' + icon[0].name;
                  } else {
                    number6_info_icon = 'images/icon/' + 'default.jpg';
                  }
                })
              }
              if (!result[5]) {
                number6_info_username = '/';
                number6_info_score = '/';
                number6_info_icon = 'images/icon/' + 'default.jpg';
              }
              if (result[6]) {
                number7_info_username = result[6].username;
                number7_info_score = result[6].highestscore;
                User.query(checkicon, [number7_info_username], function (err, icon) {
                  if (icon.length > 0) {
                    number7_info_icon = 'images/icon/' + icon[0].name;
                  } else {
                    number7_info_icon = 'images/icon/' + 'default.jpg';
                  }
                })
              }
              if (!result[6]) {
                number7_info_username = '/';
                number7_info_score = '/';
                number7_info_icon = 'images/icon/' + 'default.jpg';
              }
              if (result[7]) {
                number8_info_username = result[7].username;
                number8_info_score = result[7].highestscore;
                User.query(checkicon, [number8_info_username], function (err, icon) {
                  if (icon.length > 0) {
                    number8_info_icon = 'images/icon/' + icon[0].name;
                  } else {
                    number8_info_icon = 'images/icon/' + 'default.jpg';
                  }
                })
              }
              if (!result[7]) {
                number8_info_username = '/';
                number8_info_score = '/';
                number8_info_icon = 'images/icon/' + 'default.jpg';
              }
              if (result[8]) {
                number9_info_username = result[8].username;
                number9_info_score = result[8].highestscore;
                User.query(checkicon, [number9_info_username], function (err, icon) {
                  if (icon.length > 0) {
                    number9_info_icon = 'images/icon/' + icon[0].name;
                  } else {
                    number9_info_icon = 'images/icon/' + 'default.jpg';
                  }
                })
              }
              if (!result[8]) {
                number9_info_username = '/';
                number9_info_score = '/';
                number9_info_icon = 'images/icon/' + 'default.jpg';
              }
              if (result[9]) {
                number10_info_username = result[9].username;
                number10_info_score = result[9].highestscore;
                User.query(checkicon, [number10_info_username], function (err, icon) {
                  if (icon.length > 0) {
                    number10_info_icon = 'images/icon/' + icon[0].name;
                  } else {
                    number10_info_icon = 'images/icon/' + 'default.jpg';
                  }
                })
              }
              if (!result[9]) {
                number10_info_username = '/';
                number10_info_score = '/';
                number10_info_icon = 'images/icon/' + 'default.jpg';
              }
  
            })
          })
        })
      }
      res.redirect('/?act=profile');
    });
  })*/
module.exports = router;