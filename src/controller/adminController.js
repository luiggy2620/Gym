const adminController = {}

adminController.renderLogin = (request, response) => {
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