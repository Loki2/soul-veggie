const Cart = require("../Models/Cart");
const User = require("../Models/User");
const UserVegetable = require("../Models/UserVegetable");
const SaleItem = require('../Models/SaleItem');
const Sale = require("../Models/Sale");


module.exports.get_myInfo = async (req, res, next) => {
  try {
    
    const myInfo = res.locals.user;

    res.render('user/MyInfo', {
      userId: myInfo._id,
      myVegetables: myInfo.vegetables
    })
  } catch (error) {
    next(error);
  }
}


module.exports.post_addCart = async (req, res, next) => {
  try {
    const {id} = req.params;

    const userId = req.body.userId;
    const vegeId = req.body.vege;
    const unit = req.body.unit;
    const price = req.body.price;


    //Query Logged In user and find where to create carts --> Add Vegetable 
    const user = await User.findById(userId).populate({ path: 'carts', populate: {path: 'vegetable'}}); //

    
    const findCartItemIndex = user.carts.findIndex(
      (cartItem) => cartItem.vegetable.id === id
    );

    // console.log("user cartIndex:", findCartItemIndex)

    if(findCartItemIndex > -1) {
      //A. The New addCart item is already exist is carts
      //A.1 Find the itemCart from database /Update
      const CartList = (user.carts[findCartItemIndex].qty += 1);

      //addCart Vegetable
      await Cart.findByIdAndUpdate(user.carts[findCartItemIndex].id, {
        qty: CartList,
        price: price,
        unit: unit
      })
 
      //Update user stock qty after added to cart --> Step ToDo:
      const userVegetable = await UserVegetable.findById(vegeId);

      const stockqty = userVegetable.qty - 1;

      await UserVegetable.findByIdAndUpdate({ _id: vegeId }, {
        qty: stockqty
      })
      
      //Then Update Cart Items
      const updateCartItem = await Cart.findById(
        user.carts[findCartItemIndex].id
      ).populate({ path: 'carts'});

      res.redirect('/my-info');
    }else {
      //B. the new addCart us not in Cart Yet
      const cartItem = await Cart.create({
        vegetable: id,
        qty: 1,
        price: price,
        unit: unit,
        user: userId
      });

      //Update user stock qty after added to cart --> Step ToDo:
      const userVegetable = await UserVegetable.findById(vegeId);

      const stockqty = userVegetable.qty - 1;

      await UserVegetable.findByIdAndUpdate({ _id: vegeId }, {
        qty: stockqty
      });

      //B.1 Create New Cart
      const newCartItem = await Cart.findById(cartItem.id).populate({ path: 'user'}).sort({ createdAt: -1 });

      await User.findByIdAndUpdate(userId, {
        carts: [...user.carts, newCartItem]
      });

      res.redirect('/my-info')
    }
  } catch (error) {
    next(error)
  }
}


//User create Sale vegetable
module.exports.post_createSale = async (req, res, next) => {
  try {
    const {id} = req.params;

    const { totalqty, amount } = req.body;

    const user = await User.findById(id)
                           .populate({ path: 'carts', populate: {path: 'vegetable'}})
                           .populate({ path: 'sales', populate: {path: 'items'}})
                           .sort({ createdAt: -1 });

    //Convert Cart to SaleItem
    const convertCartToSaleItem = async () => {
      return Promise.all(
        user.carts.map((cart) => 
          SaleItem.create({
            vegetable: cart.vegetable,
            price: cart.price,
            qty: cart.qty,
            unit: cart.unit,
            user: id
          })
        )
      );
    }


    const saleItems = await convertCartToSaleItem();

    //Create Sale Product
    const sales = await Sale.create({
      items: saleItems.map((saleItem) => saleItem.id),
      qty: totalqty,
      amount: amount,
      user: id
    });

    //Delete item from cart
    const deleteCartitem = async () => {
      return Promise.all(
        user.carts.map((cart) => Cart.findByIdAndRemove(cart.id))
      );
    }

    if(!user.sales){
      user.sales = [sales]
    }else{
      user.sales.push(sales)
    }

    await deleteCartitem();

    await user.save();

    res.redirect('/my-info')

  } catch (error) {
    next(error)
  }
}

//Query my Sale Data information
module.exports.get_mySales = async (req, res, next) => {
  try {
    const mySales = res.locals.user;

    // console.log("my sales:", mySales.sales);

    res.render('user/MySale', {
      username: mySales.username,
      sales: mySales.sales
    })
  } catch (error) {
    next(error);
  }
}

//Get user invoice
module.exports.get_myInvoice = async (req, res, next) => {
  try {

    const myProfile = res.locals.user;

    const {id} = req.params;

    const saleItem = await Sale.findById(id).populate({ path: 'items', populate: { path: 'vegetable'}});

    res.render('user/MyInvoice', {
      items: saleItem.items,
      firstname: myProfile.profiles.firstname,
      lastname: myProfile.profiles.lastname,
      created: saleItem.createdAt.toLocaleString()
    });
  } catch (error) {
    next(error)
  }
}

module.exports.get_myMobileInvoice = async (req, res, next) => {
  try {
    const myProfile = res.locals.user;

    const {id} = req.params;

    const saleItem = await Sale.findById(id).populate({ path: 'items', populate: { path: 'vegetable'}});

    // console.log("mobile bill", saleItem);

    res.render('user/MyMobileInvoice', {
      items: saleItem.items,
      invoiceId: saleItem._id,
      firstname: myProfile.profiles.firstname,
      lastname: myProfile.profiles.lastname,
      created: saleItem.createdAt.toLocaleString()
    });
  } catch (error) {
    next(error)
  }
}