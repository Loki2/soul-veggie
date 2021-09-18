const mkdirp = require("mkdirp");
const Category = require('../Models/Category');



module.exports.get_allCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ createAt: -1 });
    // console.log(categories)
    res.render('admin/category/Category', {
      categories: categories
    })
  } catch (error) {
    next(error);
  }
}

module.exports.get_addCategory = async (req, res, next) => {
  try {
    res.render('admin/category/Add')
  } catch (error) {
    next(error);
  }
}

module.exports.post_addCategory = async (req, res, next) => {
  try {
    const { title, subtitle, desc, status } = req.body;
    
    const imageFile = typeof req.files.cateImage !== 'undefined' ? req.files.cateImage.name : "";

    const category = new Category({
      title: title,
      subtitle: subtitle,
      desc: desc,
      status: status,
      image: imageFile
    });

    await category.save(function(error){
      if(error)
        return console.log(error);

      mkdirp.sync('./public/frontend/images/category/' + category._id);

      if(imageFile != ""){
        const cateImage = req.files.cateImage;
        const path = './public/frontend/images/category/' + category._id + '/' + imageFile;

        cateImage.mv(path, function(error){
          return console.log(error)
        })
      }
      
    });

    res.redirect('/category');
  } catch (error) {
    next(error)
  }
}

module.exports.get_updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // console.log("Category ID:", id);

    const category = await Category.findById(id);

    res.render('admin/category/Update', {
      title: category.title,
      subtitle: category.subtitle,
      desc: category.desc,
      status: category.status,
      id: category.id
    })
  } catch (error) {
    next(error)
  }
}

module.exports.post_updateCategory = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Category.update({ _id: id}, req.body);

    res.redirect('/category')
  } catch (error) {
    next(error)
  }
}