const adminController = {}
const bcryptjs = require('bcryptjs');

adminController.renderLogin = async (request, response) => {
    const salt = await bcryptjs.genSalt(10);
    const password = 'AdminGym123';
    const newPassword = await bcryptjs.hash(password, salt);
    console.log(newPassword);
    response.render('admin/login.ejs');
}

adminController.loginAdmin = (request, response) => {
    console.log(request.body);
    response.redirect('/');
}

adminController.logout = (request, response) => {
    response.send('saliendo');
}

module.exports = adminController;