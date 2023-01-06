const { Router } = require('express');
const adminController = require('../controller/adminController');
const { existsAdmin } = require('../redirectsToRoutes/redirectsToRoutes');
const route = Router();


route.get('/admin/login', adminController.renderLogin);

route.post('/admin/logging', adminController.loginAdmin);

route.use(existsAdmin);

route.get('/admin/logout', adminController.logout);

module.exports = route;