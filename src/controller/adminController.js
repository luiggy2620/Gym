const adminController = {}
const passport = require('passport');
const Admin = require('../model/Admin');
const { sendMessage } = require('../redirectsToRoutes/redirectsToRoutes');
const { isEmpty } = require('../validations/validations');

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
    response.render('admin/password.ejs');
}

adminController.saveNewPassword = async (request, response) => {
    const { oldPassword, newPassword, newPasswordConfirm } = request.body;
    const routeToBack = `/admin/password/${request.user._id.toHexString()}`;
    if (isEmpty(oldPassword, newPassword, newPasswordConfirm))
        sendMessage(request, response, 'dangerMessage', 'missing credentials', routeToBack);
    else if (newPassword != newPasswordConfirm)
        sendMessage(request, response, 'dangerMessage', 'the confirmation password must be the same as the new password', routeToBack);
    else {
        const admin = await Admin.findById(request.user._id.toHexString());
        const match = await admin.matchPassword(oldPassword);
        if(match) {
            const password = await admin.encryptPassword(newPassword);
            await Admin.findByIdAndUpdate(request.user._id.toHexString(), { password });
            sendMessage(request, response, 'successMessage', 'Password changed', '/admin/admin');
        } else { 
            sendMessage(request, response, 'error', 'Incorrect password', routeToBack);
        }
    }
}

adminController.logout = (request, response) => {
    request.logout(function (err) {
        if (err) return next(err);
        sendMessage(request, response, 'successMessage', 'Admin successfylly logged out', '/');
    });
}

module.exports = adminController;