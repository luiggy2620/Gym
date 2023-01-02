const adminController = {}

adminController.renderLogin = (request, response) => {
    response.send('login admin');
}

adminController.loginAdmin = (request, response) => {
    response.send('logeando');
}

adminController.logout = (request, response) => {
    response.send('saliendo');
}

module.exports = adminController;