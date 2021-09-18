const Member = require("../Models/Member");


module.exports.get_allMember = async(req, res, next) => {
  try {
    const members = await Member.find({}).sort({ createdAt: 'desc'});
    res.render('admin/member/Member', {
      members
    })
  } catch (error) {
    next(error);
  }
}

module.exports.get_addMember = async (req, res, next) => {
  try {
    res.render('admin/member/Add')
  } catch (error) {
    next(error)
  }
}

module.exports.post_addMember = async (req, res, next) => {
  try {
    const { code, firstname, lastname, identity, address, city, province, contact, phone } = req.body;

    const member = await Member.create({
      code: code,
      firstname: firstname,
      lastname: lastname,
      identity: identity,
      address: address,
      city: city,
      province: province,
      contact: contact,
      phone: phone
    });

    await member.save();

    res.redirect('/member');

  } catch (error) {
    next(error)
  }
}

module.exports.get_memberInfo = async(req, res, next) => {
  res.send("Member Information")
}

module.exports.get_updateMember = async(req, res, next) => {
  try {
    const {id} = req.params;

    const member = await Member.findById(id);

    res.render('admin/member/Update', {
      code: member.code,
      firstname: member.firstname,
      lastname: member.lastname,
      identity: member.identity,
      address: member.address,
      city: member.city,
      province: member.province,
      contact: member.contact,
      phone: member.phone,
      id: member.id
    })
  } catch (error) {
    next(error)
  }
}

module.exports.post_updateMember = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Member.update({ _id: id }, req.body);

    res.redirect('/member')
  } catch (error) {
    next(error)
  }
}

module.exports.get_deleteMember = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Member.findByIdAndRemove(id);

    res.redirect('/member')
  } catch (error) {
    next(error);
  }
}