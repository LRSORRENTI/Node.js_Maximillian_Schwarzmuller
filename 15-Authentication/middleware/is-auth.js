// Same logic we had inside of exports.getAddProduct = (req, res, next) => {
//   if(!req.session.isLoggedIn){
//     // so if the above is true, the user 
//     // is not logged in, and this page 
//     // should not be reachable
//     return res.redirect('/login')
//   }
//   res.render('admin/edit-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     editing: false,
//     isAuthenticated: req.session.isLoggedIn
//   });
// };

// But we're dedicating the entire middleware 
// is-auth.js instead of manually adding it one by 
// one to the controllers

module.exports = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/login')
    }
    // so if we make it here, we're good to go, 
    // we call next to allow the request to 
    // continue on
    next();
}

// we then go into the admin.js inside of routes, 
// and add addtional handlers