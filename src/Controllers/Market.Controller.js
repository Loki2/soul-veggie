const Market = require("../Models/Market")


module.exports.get_allMarket = async (req, res, next) => {
  try {
    const markets = await Market.find({}).sort({ createdAt: 'desc' })
    res.render('admin/market/Market', {
      markets: markets
    })
  } catch (error) {
    next(error)
  }
}

module.exports.get_addMarket = async (req, res, next) => {
  try {
    res.render('admin/market/Add')
  } catch (error) {
    next(error)
  }
}

module.exports.post_addMarket = async (req, res, next) => {
  try {
    const {code, village, market, contact, address, city, province, postcode, status} = req.body;

    const markets = await Market.create({
      code: code,
      village: village,
      market: market,
      contact: contact,
      address: address,
      city: city,
      province: province,
      postcode: postcode,
      status: status
    });

    await markets.save();

    res.redirect('/market');
  } catch (error) {
    next(error)
  }
}


module.exports.get_updateMarket = async (req, res, next) => {
  try {
    const {id} = req.params;

    const market = await Market.findById(id);

    res.render('admin/market/Update', {
      code: market.code,
      village: market.village,
      market: market.market,
      contact: market.contact,
      address: market.address,
      city: market.city,
      province: market.province,
      postcode: market.postcode,
      id: market.id
    })
  } catch (error) {
    next(error)
  }
}

module.exports.post_updateMarket = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Market.update({ _id: id }, req.body);

    res.redirect('/market')
  } catch (error) {
    next(error);
  }
}

module.exports.get_deleteMarket = async (req, res, next) => {
  try {
    const {id} = req.params;

    await Market.findByIdAndRemove(id);

    res.redirect('/market')
  } catch (error) {
    next(error)
  }
}