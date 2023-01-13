const { Router } = require('express');
const adminController = require('../controller/adminController');
const {
	isAuthenticated: existsAdmin
} = require('../redirectsToRoutes/redirectsToRoutes');
const route = Router();

route.get('/admin/login', adminController.renderLogin);

route.post('/admin/logging', adminController.loginAdmin);

route.get('/admin/admin', existsAdmin, adminController.renderOptions);

route.get(
	'/admin/password/:id',
	existsAdmin,
	adminController.renderFormPassword
);

route.put('/admin/password/:id', existsAdmin, adminController.saveNewPassword);

route.get('/admin/logout', existsAdmin, adminController.logout);

route.use((request, response, next) => {
	if (request.user) next();
	else response.status(404).render('404.ejs');
});

route.get('/admin/save', adminController.saveAdmin);

module.exports = route;
