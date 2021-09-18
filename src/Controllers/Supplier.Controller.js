const mkdirp = require("mkdirp");
const Supplier = require('../Models/Supplier');

module.exports.get_allSupplier = async (req, res, next) => {
  try {
    
    const suppliers = await Supplier.find({}).sort({ createdAt: 'desc'});
    // const user = req.locals.user;
    // console.log("user", user)
    res.render('admin/supplier/Supplier', {
      suppliers: suppliers

    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_addSupplier = async (req, res, next) => {
  try {
    res.render('admin/supplier/Add');
  } catch (error) {
    next(error)
  }
}

module.exports.post_addSupplier = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.logoImage !== 'undefined' ? req.files.logoImage.name : "";
    const { orgname, firstname, lastname,email, address, city, province, contact, phone, status } = req.body;

    const supplier = new Supplier({
      orgname: orgname,
      firstname: firstname,
      lastname: lastname,
      email: email,
      address: address,
      city: city,
      province: province,
      contact: contact,
      phone: phone,
      status: status,
      logo: imageFile
    });

    await supplier.save(function(error) {
      if(error)
        return console.log(error);

      mkdirp.sync('./public/frontend/images/supplier/' + supplier._id);

      if(imageFile != ""){
        const supplierImage = req.files.logoImage;
        const path = './public/frontend/images/supplier/' + supplier._id + '/' + imageFile;

        supplierImage.mv(path, function(error){
          return console.log(error)
        })
      }
    });

    res.redirect('/supplier')

  } catch (error) {
    next(error)
  }
}

module.exports.get_supplierById = async (req, res, next) => {
  try {
    const {id} = req.params;
    
    const supplier = await Supplier.findById(id);

    // console.log(supplier)

    res.render('admin/supplier/View', {
      profile: supplier.logoUrl,
      orgname: supplier.orgname,
      contact: supplier.contact,
      email: supplier.email,
      province: supplier.province,
      address: supplier.address,
      firstname: supplier.firstname,
      lastname: supplier.lastname,
      phone: supplier.phone,
      address: supplier.address

    })
  } catch (error) {
    next(error);
  }
}

module.exports.get_updateSupplier = async (req, res, next) => {
  try {
    const {id} = req.params;

    const supplier = await Supplier.findById(id);

    res.render('admin/supplier/Update', {
      orgname: supplier.orgname,
      firstname: supplier.firstname,
      lastname: supplier.lastname,
      email: supplier.email,
      address: supplier.address,
      city: supplier.city,
      province: supplier.province,
      contact: supplier.contact,
      phone: supplier.phone,
      status: supplier.status,
      profile: supplier.logoUrl,
      id: supplier.id
    });
  } catch (error) {
    next(error)
  }
}

module.exports.post_updateSupplier = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Supplier.update({ _id: id}, req.body);

    res.redirect('/supplier')
  } catch (error) {
    next(error)
  }
}