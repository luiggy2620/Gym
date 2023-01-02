const adminController = {}

adminController.renderLogin = (request, response) => {
    response.render('admin/login.ejs');
}

adminController.loginAdmin = (request, response) => {
    response.send('logeando');
}

adminController.logout = (request, response) => {
    response.send('saliendo');
}

module.exports = adminController;