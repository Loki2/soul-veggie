const Profile = require("../Models/Profile");
const User = require("../Models/User");
const Sale = require('../Models/Sale');
const Category = require('../Models/Category');
const SaleItem = require('../Models/SaleItem');
const Vegetable = require('../Models/Vegetable');
const Supplier = require('../Models/Supplier');
const Member = require('../Models/Member');

module.exports.get_admin = async (req, res, next) => {
  try {
    const categories = await Category.find({}).populate({ path: 'vegetables'}).populate({ path: 'products'}).sort({ createAt: -1 });
    const vegetables = await Vegetable.find({}).populate({ path: 'category'}).sort({ createdAt: -1 });
    const suppliers = await Supplier.find({}).sort({ createdAt: -1 });
    const members = await Member.find({}).sort({ createdAt: -1 });
    // console.log("admin categories:", categories)
    res.render('admin/Index', {
      categories: categories,
      vegetables: vegetables,
      suppliers: suppliers,
      members: members
    })
  } catch (error) {
    next(error)
  }
}


module.exports.get_allEmployee = async (req, res, next) => {
  try {
    const employee = await Profile.find().populate({ path: 'user' }).sort({ createdAt: -1 });
    console.log("employees: ", employee);
    res.render('admin/employee/Employee', {
      employees: employee
    })
  } catch (error) {
    next(error)
  }
}


//Management User Information
module.exports.get_userVegetable = async (req, res, next) => {
  try {
    const {id} = req.params;

    const user = await User.findById(id).populate({ path: 'vegetables', populate: {path: 'vegetable'}}).sort({ updatedAt: -1 })

    // console.log("user vegetable:", user);

    res.render('admin/user/UserVegetable', {
      userId: id,
      username: user.username,
      vegetables: user.vegetables
    })
  } catch (error) {
    next(error)
  }
}


//Query Sale for Admin
module.exports.get_allSale = async (req, res, next) => {
  try {
    const sales = await Sale.find({})
                            .populate({ path: 'items', populate: { path: 'vegetable' }})
                            .populate({ path: 'user'}).sort({ createdAt: -1 });

    res.render('admin/sale/Sales', {
      sales: sales,
    })
  } catch (error) {
    next(error)
  }
}

//Query Sales Item
module.exports.get_allSaleItems = async (req, res, next) => {
  try {
    const saleItems = await SaleItem.find({}).populate({ path: 'vegetable' }).populate({ path: 'user' }).sort({ createdAt: -1 });

    // console.log("All sale Items: ", saleItems);

    res.render('admin/sale/Items', {
      items: saleItems
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_allSaleInvoice = async (req, res, next) => {
  try {
    const {id} = req.params;

    const saleItem = await Sale.findById(id).populate({ path: 'items', populate: { path: 'vegetable'}}).populate({ path: 'user'});
    
    // console.log("item invoice: ", saleItem)

    res.render('admin/sale/Invoice', {
      items: saleItem.items,
      username: saleItem.user.username,
      createdAt: saleItem.createdAt.toLocaleString()
    })
  } catch (error) {
    next(error)
  }
}


module.exports.get_allSaleMobile = async (req, res, next) => {
  try {
    const {id} = req.params;

    const saleItem = await Sale.findById(id).populate({ path: 'items', populate: { path: 'vegetable'}}).populate({ path: 'user'});

    res.render('admin/sale/mobileInvoice', {
      items: saleItem.items,
      invoiceId: saleItem._id,
      username: saleItem.user.username,
      createdAt: saleItem.createdAt.toLocaleString()
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_allCategoryProduct = async (req, res, next) => {
  try {
    const {id} = req.params;

    const cateProduct = await Category.findById(id).populate({ path: 'vegetables'}).populate({ path: 'products'});

    // console.log("Product From Category", cateProduct)
    res.render('admin/category/Product', {
      vegetables: cateProduct.vegetables,
      products: cateProduct.products
    })
  } catch (error) {
    next(error)
  }
}