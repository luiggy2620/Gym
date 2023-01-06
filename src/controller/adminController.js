const adminController = {}
const passport = require('passport');
const { sendMessage } = require('../sendToRoutes/redirectsRoutes');

adminController.renderLogin = async (request, response) => {
    response.render('admin/login.ejs');
}

adminController.loginAdmin = passport.authenticate('local', {
    failureRedirect: '/admin/login',
    successRedirect: '/clients',
    failureFlash: true
})

adminController.logout = (request, response) => {
    request.logout(function (err) {
        if (err) return next(err);
        sendMessage(request, response, 'successMessage', 'Admin successfylly logged out', '/');
    });
}

module.exports = adminController;