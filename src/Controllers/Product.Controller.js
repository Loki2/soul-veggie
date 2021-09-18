const mkdirp = require("mkdirp");
const Category = require('../Models/Category');
const Product = require('../Models/Product');
const qr = require('qrcode');

module.exports.get_allProduct = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate({ path: 'category'}).sort({ createdAt: -1 });

    // console.log(products)
    res.render('admin/product/Product', {
      products: products
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_addProduct = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 })
    res.render('admin/product/Add', {
      categories: categories
    })
  } catch (error) {
    next(error)
  }
}


module.exports.post_addProduct = async (req, res, next) => {
  try {
    const imageFile = typeof req.files.productImage !== 'undefined' ? req.files.productImage.name : "";

    const {code, name, desc, price, unit} = req.body;

    const categoryId = req.body.category;


    const category = await Category.findById({ _id: categoryId });

    const product = new Product({
      code: code,
      name: name,
      desc: desc,
      price: price,
      unit: unit,
      category: categoryId,
      image: imageFile
    });

    await product.save(function(error){ 
      if(error)
        return console.log(error)

        mkdirp.sync('./public/frontend/images/product/' + product._id);

        mkdirp.sync('./public/frontend/images/product/' + product._id + '/gallery');

        mkdirp.sync('./public/frontend/images/product/' + product._id + '/gallery/thumbs');

        if(imageFile != ""){
          const productImage = req.files.productImage;
          const path = './public/frontend/images/product/' + product._id + '/' + imageFile;

          productImage.mv(path, function(error){
            return console.log(error)
          });
        }
    });

    if(!category.products){
      category.vegetables = [product]
    }else{
      category.products.push(product);
    }

    await category.save();

    res.redirect('/product');
  } catch (error) {
    next(error)
  }
}


module.exports.get_productId = async (req, res, next) => {
  try {
    const {id} = req.params;

    const product = await Product.findById(id).populate({ path: 'category'});

    qr.toDataURL(`http://localhost:5000/product/view/${id}`, (err, src) => {
      if(err){
        next(err)
      }else{
        res.render('admin/product/View', {
          product: product,
          src: src,
          productId: id
        })
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports.get_updateProduct = async (req, res, next) => {
  try {
    const {id} = req.params;
    const categories = await Category.find({}).sort({ createdAt: -1 });

    const product = await Product.findById(id).populate({ path: 'category' });

    // console.log(product)

    res.render('admin/product/Update', {
      categories: categories,
      code: product.code,
      name: product.name,
      categoryTitle: product.category.title,
      categorySub: product.category.subtitle,
      categoryId: product.category._id,
      desc: product.desc,
      price: product.price,
      unit: product.unit,
      status: product.status,
      image: product.imageUrl,
      productId: id
    });
  } catch (error) {
    next(error);
  }
}

module.exports.post_updateProduct = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Product.update({ _id: id }, req.body);

    res.redirect('/product')
  } catch (error) {
    next(error)
  }
}