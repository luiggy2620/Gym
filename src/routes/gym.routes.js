const { Router } = require('express');
const gymController = require('../controller/gymController');
const { ensureAuthenticated } = require('../redirectsToRoutes/redirectsToRoutes');
const route = Router();

route.get('/gym/places', ensureAuthenticated, gymController.renderPlaces);

route.get('/gym/place/add', ensureAuthenticated, gymController.renderFormToAddPlace);

route.post('/gym/place/add', ensureAuthenticated, gymController.saveNewPlace);

route.get('/gym/place/edit/:id', ensureAuthenticated, gymController.renderFormToEditPlace);

route.put('/gym/place/edit/:id', ensureAuthenticated, gymController.saveEditPlace);

route.delete('/gym/place/delete/:id', ensureAuthenticated, gymController.deletePlace);

module.exports = route;