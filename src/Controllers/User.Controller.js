const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateUsername, validateEmail, validatePassword } = require('../Utils/isValidated');

const maxAge = 3 * 24 * 60 * 60; 
const createToken = (id) => {
  return jwt.sign({id}, process.env.APP_SECRET, {
    expiresIn: maxAge
  })
}


module.exports.get_allUser = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.render('admin/user/User', {
      users: users
    });
  } catch (error) {
    console.log(error)
  }
}

module.exports.get_addUser = async (req, res, next) => {
  try {
    req.flash('error', "some error...!");
    req.flash('error', "some error...2!");
    req.flash('alert-warning', 'some value...');
    req.flash('alert-danger', 'some value...');
    req.flash('alert-success', 'some value...');

    // const messages = req.flash();

    // console.log(messages)

    res.render('admin/user/Add');
  } catch (error) {
    next(error)
  }
}

module.exports.post_addUser = async (req, res, next) => {
  try {
    const {username, email, password, repassword, status} = req.body;

    console.log(req.body);
    //Check if empty fill
    if(!username || !email || !password || !repassword) {
      res.status(400).json({ message: 'Please Fill all require fields...!'})
    }

    //Validation Username
    const isValidUsername = validateUsername(username);
    if(!isValidUsername) {
      res.status(400).json({ message: 'Please Enter a Username between 3 to 20 characters...'})
    }

    //Validation Email
    const isValidEmail = validateEmail(email);
    if(!isValidEmail) {
      res.status(400).json({ message: 'Please Enter Valid Email'});
    }

    //Validate Password
    const isValidPassword = validatePassword(password);
    if(!isValidPassword) {
      res.status(400).json({ message: 'Please must be leatst at 6 to 60 charecters'})
    }

    //check matched password
    if(password !== repassword) {
      res.status(400).json({ error: 'Password do not match...!'})
    }

    //Check exist username
    const isUsername = await User.findOne({ username });
    if(isUsername){
      res.status(400).json({ error: 'Username already in used...'})
    }

    //Check Existing Email
    const isEmail = await User.findOne({ email });
    if(isEmail) {
      res.status(400).json({ error: 'Email already in used...'})
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      status
    });

    await newUser.save();

    //Create Token 
    const token = createToken(newUser._id);

    //Send Token to fronten
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});

    // Redirect to user dashboard
    res.redirect('/user');
  } catch (error) {
    next(error)
  }
}

module.exports.get_editUser = async (req, res, next) => {
  try {
    const {id} = req.params;

    const user = await User.findById(id);

    res.render('admin/user/Update', {
      username: user.username,
      userEmail: user.email,
      userPwd: user.password,
      userRole: user.role,
      userStatus: user.status,
      userId: user.id
    });
  } catch (error) {
    next(error);
  }
}

module.exports.post_editUser = async (req, res, next) => {
  try {
    const {id} = req.params;

    await User.findByIdAndUpdate({ _id: id}, req.body);

    res.redirect('/user')
  } catch (error) {
    next(error)
  }
}