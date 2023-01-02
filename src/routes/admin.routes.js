const { Router } = require('express');
const adminController = require('../controller/adminController');
const route = Router();

route.get('/admin/login', adminController.renderLogin);

route.get('/admin/logging', adminController.loginAdmin);

route.get('/admin/logout', adminController.logout);

module.exports = route;