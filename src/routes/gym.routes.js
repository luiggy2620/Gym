const { Router } = require('express');
const gymController = require('../controller/gymController');
const { ensureAuthenticated } = require('../redirectsToRoutes/redirectsToRoutes');
const route = Router();

route.get('/gym/places', gymController.renderPlaces);

route.get('/gym/place/add', gymController.renderFormToAddPlace);

route.post('/gym/place/add', gymController.saveNewPlace);

route.get('/gym/place/edit/:id', gymController.renderFormToEditPlace);

route.put('/gym/place/edit/:id', gymController.saveEditPlace);

route.delete('/gym/place/delete/:id', gymController.deletePlace);

module.exports = route;