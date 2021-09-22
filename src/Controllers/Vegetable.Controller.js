// const path = require('path');
// const fs = require('fs');
const mkdirp = require("mkdirp");
const qr = require('qrcode');
const Category = require('../Models/Category');
const Vegetable = require('../Models/Vegetable');
const Supplier = require('../Models/Supplier');

module.exports.get_allVegetable = async (req, res, next) => {
  try {
    const vegetables = await Vegetable.find({}).populate({ path: 'category' }).sort({ createdAt: -1 });

    // console.log(vegetables);
    res.render('admin/vegetable/Vegetable', {
      vegetables: vegetables
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_addVegetable = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    const suppliers = await Supplier.find({}).sort({ createdAt: -1 });

    res.render('admin/vegetable/Add', {
      categories: categories,
      suppliers: suppliers
    })
  } catch (error) {
    next(error)
  }
}

module.exports.post_addVegetable = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.vegetableImage !== 'undefined' ? req.files.vegetableImage.name : "";
    const {code, name, desc, import_price, import_unit, export_price, export_unit, status} = req.body;
    const categoryId = req.body.category;
    const supplierId = req.body.supplier;


    const category = await Category.findById({ _id: categoryId });

    const supplier = await Supplier.findById({ _id: supplierId });

    const vegetable = new Vegetable({
      code: code,
      name: name,
      desc: desc,
      import_price: import_price,
      import_unit: import_unit,
      export_price: export_price,
      export_unit: export_unit,
      category: categoryId,
      supplier: supplierId,
      status: status,
      image: imageFile
    });

    await vegetable.save(function(error){
      if(error)
        return console.log(error);

        mkdirp.sync('./public/frontend/images/vegetable/' + vegetable._id);

        mkdirp.sync('./public/frontend/images/vegetable/' + vegetable._id + '/gallery');

        mkdirp.sync('./public/frontend/images/vegetable/' + vegetable._id + '/gallery/thumbs');

        if(imageFile != ""){
          const vegetableImage = req.files.vegetableImage;
          const path = './public/frontend/images/vegetable/' + vegetable._id + '/' + imageFile;
          
          vegetableImage.mv(path, function(error) {
            return console.log(error)
          });
        }
    });


    if(!category.vegetables){
      category.vegetables = [vegetable]
    }else{
      category.vegetables.push(vegetable);
    }

    if(!supplier.vegetables){
      supplier.vegetables = [vegetable];
    }else{
      supplier.vegetables.push(vegetable);
    }

    await category.save();
    await supplier.save();

    res.redirect('/vegetable');

  } catch (error) {
    next(error)
  }
}

module.exports.get_VegetableId = async (req, res, next) => {
  try {
    const {id} = req.params;

    const vegetable = await Vegetable.findById(id).populate({ path: 'category' });

    console.log("vegetable:", vegetable)
    qr.toDataURL(`https://soul-veggie.info/vegetable/view/${id}`, (err, src) => {
      if(err) console.log(err);
      res.render('admin/vegetable/View', {
        vegetable: vegetable,
        src:src,
        image: vegetable.image,
        vegetableId: vegetable._id
      })
    })    
  } catch (error) {
    next(error);
  }
}

module.exports.get_updateVegetable = async(req, res, next) => {
  try {
    const {id} = req.params;

    const vegetable = await Vegetable.findById(id).populate({ path: 'category' });

    const categories = await Category.find({}).sort({ createdAt: 'desc'});

    // console.log("Category: ", categories)
    res.render('admin/vegetable/Update', {
      code: vegetable.code,
      name: vegetable.name,
      desc: vegetable.desc,
      import_price: vegetable.import_price,
      import_unit: vegetable.import_unit,
      export_price: vegetable.export_price,
      export_unit: vegetable.export_unit,
      image: vegetable.image,
      title: vegetable.category.title,
      category: vegetable.category.subtitle,
      categoryId: vegetable.category.id,
      status: vegetable.status,
      id: vegetable._id,
      categories: categories
    })

  } catch (error) {
    next(error)
  }
}

module.exports.post_updateVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Vegetable.update({ _id: id}, req.body);

    res.redirect('/vegetable');
  } catch (error) {
    next(error)
  }
}