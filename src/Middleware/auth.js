// const {roles} = require('../Utils/constants');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authenticated = (req, res, next) => {
  const token = req.cookies.jwt;

  if(token) {
    jwt.verify(token, process.env.APP_SECRET, async (error, decodedToken) => {
      if(error) {
        // res.status(401)
        console.log(error.message)
        res.redirect('/auth/signin')
      } else {
        let user = await User.findById(decodedToken.id)
                             .populate({ path: 'profiles' })
                             .populate({ path: 'vegetables',
                               populate: { path: 'vegetable'}
                             })
                             .populate({ path: 'carts', 
                                populate: { path: 'vegetable'}
                              })
                             .populate({ path: 'sales', 
                                populate: { path: 'items', populate: { path: 'vegetable'}},
                              })
                             .sort({ createdAt: -1 });
        // console.log("currently user:", user)
        res.locals.user = user;
        next();
      }
    })
  }else {
    res.redirect('/auth/signin');
  }
}

// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if(token) {
//     jwt.verify(token, process.env.APP_SECRET, async (error, decodedToken) => {
//       if(error){
//         console.log(error.message);
//         res.locals.user === null;
//         res.redirect('/auth/signin');
//       }else{
//         let user = await User.findById(decodedToken.id).populate({ path: 'profiles' });
//         console.log("currently user:", user)
//         res.locals.user = user;
//         next();
//       }
//     })
//   }
// }


//user Roles
function authRoles(roles){
  return(req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
      jwt.verify(token, process.env.APP_SECRET, async (error, decodedToken) => {
        if(error){
          console.log(error.message);
          res.locals.user === null;
          next();
        }else{
          let user = await User.findById(decodedToken.id);
          // console.log("user role login:", user)
          if(user.role != roles) {
            res.status(401);            
            res.redirect('/auth/signin');
          }
          next();
        }
      })
    }
  }
}


module.exports = {
  authenticated,
  // checkUser,
  authRoles
}