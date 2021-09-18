const Bad = require("../Models/Bad")
const Vegetable = require("../Models/Vegetable")


module.exports.get_allBads = async (req, res, next) => {
  try {
    const bads = await Bad.find({}).populate({ path: 'vegetable' }).sort({ createdAt: -1 });
    res.render('manage/badVegetable/Bads', {
      bads: bads
    })
  } catch (error) {
    next(error)
  }
}


module.exports.get_addBads = async (req, res, next) => {
  try {
    const vegetables = await Vegetable.find({}).sort({ createdAt: -1 });

    res.render('manage/badVegetable/Add', {
      vegetables: vegetables
    })
  } catch (error) {
    next(error)
  }
}

module.exports.post_addBads = async (req, res, next) => {
  try {
    const {vegetable, qty, unit, price} = req.body;

    const badVegetable = await Bad.create({
      vegetable: vegetable,
      qty: qty,
      unit: unit,
      price: price
    })

    await badVegetable.save();

    res.redirect('/manage/bads')

  } catch (error) {
    next(error)
  }
}


module.exports.get_updateBads = async (req, res, next) => {
  try {
    const {id} = req.params;

    const bad = await Bad.findById(id).populate({ path: 'vegetable' });

    res.render('manage/badVegetable/Update', {
      vegetableName: bad.vegetable.name,
      vegetableCode: bad.vegetable.code,
      vegetablePrice: bad.vegetable.price,
      vegetableId: bad.vegetable.id,
      qty: bad.qty,
      unit: bad.unit,
      price: bad.price,
      id: bad._id
    })
  } catch (error) {
    next(error)
  }
}

module.exports.post_updateBads = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Bad.findByIdAndUpdate({_id: id}, req.body);

    res.redirect('/manage/bads')
  } catch (error) {
    next(error)
  }
}

module.exports.get_deleteBads = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Bad.findByIdAndRemove(id);

    res.redirect('/manage/bads')
  } catch (error) {
    next(error)
  }
}