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
    response.send('saliendo');
}

module.exports = adminController;