const adminController = {}
const passport = require('passport');

adminController.renderLogin = async (request, response) => {
    response.render('admin/login.ejs');
}

adminController.loginAdmin = passport.authenticate('local', {
    failureRedirect: '/admin/login',
    successRedirect: '/clients',
    failureFlash: true
})

adminController.logout = (request, response) => {
    request.logout(function(err) {
        if (err) { return next(err); }
        request.flash('successMessage', 'Admin successfully logged out');
        response.redirect('/');
      });
}

module.exports = adminController;