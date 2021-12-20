const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { roles } = require('../Utils/constants');
const { validationResult } = require('express-validator');

const maxAge = 3 * 24 * 60 * 60; 
const createToken = (id) => {
  return jwt.sign({id}, process.env.APP_SECRET, {
    expiresIn: maxAge
  })
}

module.exports.get_Signin = async (req, res, next) => {
  try {
    res.render('Signin')
  } catch (error) {
    next(error)
  }
}
 
module.exports.post_Signin = async (req, res, next) => {
  try {
    //const errors = validationResult(req);

    const {username, password} = req.body;

    //Check empty fill
    if(!username || !password) {
      res.status(400).json({ message: 'Please Fill all require fields...!'})
    }

    //Query user from database
    const user = await User.findOne({ username });
    if(!user) {
      res.status(400).json({ message: 'Not found this username, Please signup, try again...!'})
    }

    //Compare Password
    const isPassword = await bcrypt.compare(password, user.password);
    if(!isPassword){
      res.status(400).json({ message: 'Email or Passowrd incorrect...!'})
    }

     //Create Token
     const token = createToken(user._id)
      
     //Send Token to fronten
     res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});

     if(token) {
       jwt.verify(token, process.env.APP_SECRET, async (error, decodedToken) => {
        if(error){
          console.log(error.message);
          res.locals.user === null;
          next();
        }else{
          let user = await User.findById(decodedToken.id);
          // console.log("currently Logged in user:", user)
          if(user.role !== roles.admin) {
            res.redirect('/my-info');
          }else {
            res.redirect('/admin');
          }
          next()
        }
       })
     }
  } catch (error) {
    next(error)
  }
}

module.exports.get_Signout = async (req, res, next) => {
  try {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/auth/signin')
  } catch (error) {
    next(error)
  }
}