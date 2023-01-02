const { Router } = require('express');
const indexController = require('../controller/indexController');

const route = Router();

route.get('/', indexController.renderIndex);

route.get('/about', indexController.renderAbout);

module.exports = route;