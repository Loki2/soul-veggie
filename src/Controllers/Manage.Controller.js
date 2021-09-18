const mkdirp = require("mkdirp");
const User = require('../Models/User');
const Vegetable = require('../Models/Vegetable');
const UserVegetable = require('../Models/UserVegetable');
const Member = require('../Models/Member');
const MemberVege = require('../Models/MemberVege');
const Banner = require('../Models/Banner');

//Manage User Information
module.exports.get_userVegetable = async (req, res, next) => {
  try {
    const user = await User.find().populate({ path: 'profiles' }).sort({ createdAt: -1 });

    console.log('User Profile: ', user)
    res.render('manage/user/User', {
      users: user
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_sellerVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    const userVegetable = await User.findById(id).populate({ path: 'vegetables', populate: {path: 'vegetable'}}).sort({ updatedAt: -1 });

    // console.log("user vegetable:", userVegetable)
    res.render('manage/user/UserVegetable', {
      userId: id,
      username: userVegetable.username,
      vegetables: userVegetable.vegetables
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_addSellerVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    const vegetables = await Vegetable.find({}).populate({ path: 'category' });

    res.render('manage/user/AddUserVegetable', {
      userId: id,
      vegetables: vegetables
    })
  } catch (error) {
    next(error)
  }
}


module.exports.post_addSellerVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    const {vegetable, qty, unit, price} = req.body;

    const user = await User.findById(id).populate({ path: 'vegetables'});

    const userVegetable = await UserVegetable.create({
      vegetable: vegetable,
      qty: qty,
      unit: unit,
      price: price,
      anount: qty * price,
      user: id
    });

    if(!user.vegetables) {
      user.vegetables = [userVegetable];
    }else{
      user.vegetables.push(userVegetable);
    }

    await user.save();

    res.redirect(`/manage/view/${id}`);
  } catch (error) {
    next(error)
  }
}

module.exports.get_updateSellerVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    // console.log("user vegetable:", id);

    const userVegetable = await UserVegetable.findById(id).populate({ path: 'vegetable'});

    // console.log("user vegetable:", userVegetable);
    res.render('manage/user/UpdateUserVegetable', {
      vegetable: userVegetable.vegetable.name,
      vegetableId: userVegetable.vegetable._id,
      qty: userVegetable.qty,
      price: userVegetable.price,
      unit: userVegetable.unit,
      userId: userVegetable.user,
      id: userVegetable._id
    });
  } catch (error) {
    next(error)
  }
}


module.exports.post_updateSellerVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    const {qty, unit, price} = req.body;

    const anount = qty * price;

    const userVegetable = await UserVegetable.findById(id);

    // console.log("user vegetable:", userVegetable);

    await UserVegetable.update({_id: id}, {
      qty: qty,
      unit: unit,
      price: price,
      anount: anount
    });

    res.redirect(`/manage/view/${userVegetable.user}`)
  } catch (error) {
    next(error)
  }
}



//clear
module.exports.get_deleteSellerVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;



    // console.log("id", id)

    // const userVegetable = await UserVegetable.findById(id);

    // console.log("User Vegetable by ID:", userVegetable);

    // const user = await User.findById(userVegetable.user);

    // console.log("user related Vegetable:", user.vegetables);

    // Remove Relations id

    await UserVegetable.findByIdAndDelete({_id: id});


    res.redirect('/manage/');

  } catch (error) {
    next(error)
  }
}


//Query All Members
module.exports.get_allMember = async (req, res, next) => {
  try {
    const members = await Member.find({}).sort({ createdAt: -1 })

    res.render('manage/member/Member', {
      members: members
    })
  } catch (error) {
    next(error)
  }
}

//Query Member Vegetable by ID
module.exports.get_memberVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    const memberVege = await Member.findById(id).populate({ path: 'vegetables', populate: { path: 'vegetable' }}).sort({ updatedAt: -1 });

    // console.log("member vegetable list:", memberVege.vegetables)

    res.render('manage/member/Vegetable', {
      memberId: id,
      firstname: memberVege.firstname,
      vegetables: memberVege.vegetables
    })
  } catch (error) {
    next(error)
  }
}

//Get Add Member Vegetable
module.exports.get_addMemberVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    const vegetables = await Vegetable.find({}).populate({ path: 'category' }).sort({ createdAt: -1 });

    res.render('manage/member/AddVegetable', {
      memberId: id,
      vegetables: vegetables
    })
  } catch (error) {
    next(error)
  }
}


//Post Add member Vegetable
module.exports.post_addMemberVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    const {vegetable, qty, unit, price} = req.body;

    const member = await Member.findById(id).populate({ path: 'Vegetables'});

    const memberVegetable = await MemberVege.create({
      vegetable: vegetable,
      qty: qty,
      unit: unit,
      price: price,
      anount: qty * price,
      member: id
    });

    if(!member.vegetables){
      member.vegetables = [memberVegetable];
    }else{
      member.vegetables.push(memberVegetable);
    }

    await member.save();

    res.redirect(`/manage/members/${id}`);

  } catch (error) {
    next(error)
  }
}


//Query Update Member Vegetable
module.exports.get_updateMemberVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    const memberVegetable = await MemberVege.findById(id).populate({ path: 'vegetable'});


    res.render('manage/member/Update', {
      vegetableName: memberVegetable.vegetable.name,
      vegetableId: memberVegetable.vegetable._id,
      vegetableCode: memberVegetable.vegetable.code,
      qty: memberVegetable.qty,
      price: memberVegetable.price,
      unit: memberVegetable.unit,
      memberId: memberVegetable.member,
      id: memberVegetable._id, 
    });
  } catch (error) {
    next(error)
  }
}


//Post update member Vegetable
module.exports.post_updateMemberVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    const {qty, unit, price} = req.body;

    const anount = qty * price;

    const memberVegetable = await MemberVege.findById(id);

    await MemberVege.update({ _id: id }, {
      qty: qty,
      unit: unit,
      price: price,
      anount: anount
    });

    res.redirect(`/manage/members/${memberVegetable.member}`)
  } catch (error) {
    next(error)
  }
}

//GET DELETE Member Vegetable
module.exports.get_deleteMemberVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    const memberId = req.body.memberId

    console.log("Member Vegetable ID:", id);

    console.log("Member ID:", memberId)
  } catch (error) {
    next(error)
  }
}


//Banner Operation
module.exports.get_allBanner = async (req, res, next) => {
  try {
    const banners = await Banner.find({}).sort({ createdAt: -1 });

    res.render('manage/banner/Banner', {
      banners: banners
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_addBanner = async (req, res, next) => {
  try {
    res.render('manage/banner/Add')
  } catch (error) {
    next(error);
  }
}


//
module.exports.post_addBanner = async (req, res, next) => {
  try {
    const { title, subtitle, desc, status } = req.body;

    const imageFile = typeof req.files.bannerImage !== 'undefined' ? req.files.bannerImage.name : "";

    const banner = new Banner({
      title: title,
      subtitle: subtitle,
      desc: desc,
      status: status,
      image: imageFile
    });

    await banner.save(function(error){
      if(error)
        return console.log(error);

      mkdirp.sync('./public/frontend/images/banners/' + banner._id);

      if(imageFile != ""){
        const bannerImage = req.files.bannerImage;
        const path = './public/frontend/images/banners/' + banner._id + '/' + imageFile;

        bannerImage.mv(path, function(error){
          return console.log(error)
        })
      }
    })
    res.redirect('/manage/banners')
  } catch (error) {
    next(error)
  }
}


//GET UPDATE BANNER
module.exports.get_updateBanner = async (req, res, next) => {
  try {
    const {id} = req.params;

    const banner = await Banner.findById(id);

    console.log("banners:", banner)

    res.render('manage/banner/Update', {
      id: banner._id,
      title: banner.title,
      subtitle: banner.subtitle,
      desc: banner.desc,
      status: banner.status,
      image: banner.image
    });
  } catch (error) {
    next(error)
  }
}


module.exports.post_updateBanner = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Banner.update({_id: id}, req.body);

    res.redirect('/manage/banners')
  } catch (error) {
    next(error);
  }
}


module.exports.get_deleteBanner = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Banner.findByIdAndRemove(id);

    res.redirect('/manage/banners')
  } catch (error) {
    next(error)
  }
}