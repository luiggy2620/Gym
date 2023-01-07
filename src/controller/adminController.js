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

adminController.renderOptions = (request, response) => {
    response.render('admin/admin.ejs');
}

adminController.renderFormPassword = (request, response) => {
    response.send('form to edit password');
}

adminController.saveNewPassword = (request, response) => {
    response.send('save new Password');
}

adminController.logout = (request, response) => {
    request.logout(function (err) {
        if (err) return next(err);
        sendMessage(request, response, 'successMessage', 'Admin successfylly logged out', '/');
    });
}

module.exports = adminController;