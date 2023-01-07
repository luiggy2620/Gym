const adminController = {}
const passport = require('passport');
const { sendMessage } = require('../redirectsToRoutes/redirectsToRoutes');

adminController.renderLogin = async (request, response) => {
    response.render('admin/login.ejs');
}

adminController.loginAdmin = passport.authenticate('local', {
    failureRedirect: '/admin/login',
    successRedirect: '/clients',
    failureFlash: true
})

adminController.renderSettings = (request, response) => {
    response.send('settings');
}

adminController.logout = (request, response) => {
    request.logout(function (err) {
        if (err) return next(err);
        sendMessage(request, response, 'successMessage', 'Admin successfylly logged out', '/');
    });
}

module.exports = adminController;