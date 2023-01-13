const { Router } = require('express');
const gymController = require('../controller/gymController');
const { isAuthenticated } = require('../redirectsToRoutes/redirectsToRoutes');
const route = Router();

route.get('/gym/places', isAuthenticated, gymController.renderPlaces);

route.get(
	'/gym/place/add',
	isAuthenticated,
	gymController.renderFormToAddPlace
);

route.post('/gym/place/add', isAuthenticated, gymController.saveNewPlace);

route.get(
	'/gym/place/edit/:id',
	isAuthenticated,
	gymController.renderFormToEditPlace
);

route.put('/gym/place/edit/:id', isAuthenticated, gymController.saveEditPlace);

route.delete(
	'/gym/place/delete/:id',
	isAuthenticated,
	gymController.deletePlace
);

module.exports = route;
