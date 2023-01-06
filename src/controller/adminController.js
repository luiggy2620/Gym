const adminController = {}
const bcryptjs = require('bcryptjs');
const passport = require('passport');

adminController.renderLogin = async (request, response) => {
    const salt = await bcryptjs.genSalt(10);
    const password = 'AdminGym123';
    const newPassword = await bcryptjs.hash(password, salt);
    console.log(newPassword);
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