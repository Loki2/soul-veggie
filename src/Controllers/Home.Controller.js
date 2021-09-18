const Vegetable = require('../Models/Vegetable');
const Product = require('../Models/Product');
const Category = require('../Models/Category');
const qr = require('qrcode');
const Supplier = require('../Models/Supplier');
const Banner = require('../Models/Banner');
const Blog = require('../Models/Blog');
const Member = require('../Models/Member');

module.exports.get_Home = async (req, res, next) => {
  try {
    const vegetables = await Vegetable.find({}).populate({ path: 'category'}).sort({ createdAt: -1 });

    const products = await Product.find({}).populate({ path: 'category'}).sort({ createdAt: -1 });

    const suppliers = await Supplier.find({}).sort({ createdAt: -1 });

    const categories = await Category.find({}).sort({ createdAt: -1 });

    const banners = await Banner.find({}).sort({ createdAt: -1 });

    const blogs = await Blog.find({}).populate({ path: 'user', populate: { path: 'profiles'}}).sort({ createdAt: -1 });

    res.render('Index', {
      vegetables: vegetables,
      categories: categories,
      suppliers: suppliers,
      banners: banners,
      products: products,
      blogs: blogs
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_allVeggie = async (req, res, next) => {
  try {
    const vegetables = await Vegetable.find({}).populate({ path: 'category'}).sort({ createdAt: -1 });

    const categories = await Category.find({}).sort({ createdAt: -1 });

    // console.log("veggies: ", vegetables)
    res.render('vegetable/Veggies', {
      vegetables: vegetables,
      categories: categories
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_allSidebarVeggie = async (req, res, next) => {
  try {
    const vegetables = await Vegetable.find({}).populate({ path: 'category'}).sort({ createdAt: -1 });
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.render('vegetable/SiderVeggies', {
      vegetables: vegetables,
      categories: categories
    })
  } catch (error) {
    next(error)
  }
}

//Query Vegetable by ID:
module.exports.get_VeggieId = async (req, res, next) => {
  try {
    const {id} = req.params;

    const vegetable = await Vegetable.findById(id).populate({ path: 'category' });

    const suppliers = await Supplier.find({}).sort({ createdAt: -1 });

    const cateVeggies = await Category.findById(vegetable.category._id).populate({ path: 'vegetables', populate: {path: 'category'}}).limit(1);

    qr.toDataURL(`https://soul-veggie.info/veggies/${id}`, (err, src) => {
      res.render('vegetable/VeggieId', {
        code: vegetable.code,
        name: vegetable.name,
        desc: vegetable.desc,
        unit: vegetable.export_unit,
        price: vegetable.export_price,
        image: vegetable.imageUrl,
        category: vegetable.category.title,
        sub: vegetable.category.subtitle,
        image: vegetable.image,
        src: src, 
        id: vegetable.id,
        suppliers: suppliers,
        veggies:  cateVeggies.vegetables
      })
    })
  } catch (error) {
    next(error)
  }
}


module.exports.get_allBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate({ path: 'user', populate: { path: 'profiles'}}).sort({ createdAt: -1 });

    res.render('blogs/Blog', {
      blogs: blogs
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_BlogId = async (req, res, next) => {
  try {
    const {id} = req.params;

    // console.log("ID:", id)

    const blog = await Blog.findById(id).populate({ path: 'user', populate: { path: 'profiles'}});

    res.render('blogs/View', {
      title: blog.title,
      subtitle: blog.subtitle,
      desc: blog.desc,
      image: blog.image,
      username: blog.user.profiles.firstname,
      created: blog.createdAt.toLocaleString(),
      id: blog._id
    });
  } catch (error) {
    next(error)
  }
}

module.exports.get_allMembers = async (req, res, next) => {
  try {
    const vegetables = await Vegetable.find({}).populate({ path: 'category'}).sort({ createdAt: -1 });

    const members = await Member.find().populate({ path: 'vegetables' }).sort({ createdAt: -1 });
    res.render('members/Product', {
      vegetables: vegetables,
      members: members
    });
  } catch (error) {
    next(error)
  }
}

module.exports.get_storeMembers = async (req, res, next) => {
  try {
    const {id} = req.params;

    const vegetables = await Vegetable.find({}).populate({ path: 'category'}).sort({ createdAt: -1 });


    const members = await Member.find().populate({ path: 'vegetables' }).sort({ createdAt: -1 });

    const memberProducts = await Member.findById(id).populate({ path: 'vegetables', populate: { path: 'vegetable', populate: {path: 'category'}}});

    console.log("Member Product:", memberProducts)

    qr.toDataURL(`https://soul-veggie.info/members/${id}`, (err, src) => {
      if(err)
        return console.log(err);
        res.render('members/Stores', {
          src: src,
          memberAddress: memberProducts.address,
          memberContact: memberProducts.contact,
          memberName: memberProducts.firstname,
          vegges: memberProducts.vegetables,
          members: members,
          vegetables: vegetables,
        });
    });
  } catch (error) {
    next(error)
  }
}