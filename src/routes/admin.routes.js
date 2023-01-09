const { Router } = require('express');
const adminController = require('../controller/adminController');
const { ensureAuthenticated } = require('../redirectsToRoutes/redirectsToRoutes');
const route = Router();


route.get('/admin/login', adminController.renderLogin);

route.post('/admin/logging', adminController.loginAdmin);

route.get('/admin/admin', ensureAuthenticated, adminController.renderOptions);

route.get('/admin/password/:id', ensureAuthenticated, adminController.renderFormPassword);

route.put('/admin/password/:id', ensureAuthenticated, adminController.saveNewPassword);

route.get('/admin/logout', ensureAuthenticated, adminController.logout);

module.exports = route;