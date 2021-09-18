const mkdirp = require("mkdirp");
const User = require("../Models/User");
const Market = require('../Models/Market');
const Profile = require('../Models/Profile');





module.exports.get_userProfile = async (req, res, next) => {
  try {
    const {id} = req.params;

    const user = await User.findById(id).populate({ path: 'profiles', populate: {path: 'market'}});

    const markets = await Market.find({}).sort({ createdAt: 'desc' });

    
    const myProfile = user.profiles;

    console.log("personal:", myProfile)

    if(!user.profiles){
      res.render('admin/user/Create', {
            id: user.id,
            markets: markets
          })
    }else{
      res.render('admin/user/Profile', {
        username: user.username,
        email: user.email,
        firstname: myProfile.firstname,
        lastname: myProfile.lastname,
        dob: myProfile.dob,
        address: myProfile.address,
        city: myProfile.city,
        province: myProfile.province,
        contact: myProfile.contact,
        phone: myProfile.phone,
        identity: myProfile.identity,
        profile: myProfile.profile,
        id: myProfile._id
      })
    }
  } catch (error) {
    next(error)
  }
}


module.exports.post_userProfile = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.profileImage !== 'undefined' ? req.files.profileImage.name : "";

    const userId = req.body.user;

    const marketId = req.body.market;

    const {firstname, lastname, dob, address, city, province, identity, contact, phone} = req.body;

    const user = await User.findById(userId);

    const market = await Market.findById(marketId); 

    if(!user) console.log('No User Found...!');

    if(!market) console.log('No Market found...');

    const userprofile = new Profile({
      firstname: firstname,
      lastname: lastname,
      market: marketId,
      dob: dob,
      address: address,
      city: city,
      province: province,
      identity: identity,
      contact: contact,
      phone: phone,
      user: userId,
      profile: imageFile
    });

    await userprofile.save(function(error){
      if(error)
        return console.log(error);

      mkdirp.sync('./public/frontend/images/users/profile/' + userprofile._id);

      if(imageFile != ""){
        const profileImage = req.files.profileImage;
        const path = './public/frontend/images/users/profile/' + userprofile._id + '/' + imageFile;

        profileImage.mv(path, function(error){
          return console.log(error)
        });
      }
    });

    if(!user.profiles) {
      user.profiles = userprofile;
    }else {
      user.profiles.push(userprofile);
    }

    if(!market.profiles){
      market.profiles = [userprofile];
    }else{
      market.profiles.push(userprofile);
    }

    await user.save();

    await market.save();

    res.redirect('/user');

  } catch (error) {
    next(error)
  }
}