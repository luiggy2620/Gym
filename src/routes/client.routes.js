const { Router } = require('express');
const clientController = require('../controller/clientController');
const { ensureAuthenticated } = require('../redirectsToRoutes/redirectsToRoutes');
const route = Router();

route.get('/clients', ensureAuthenticated, clientController.renderClients);

route.get('/client/add', ensureAuthenticated, clientController.renderRegisterClient);

route.post('/client/add', ensureAuthenticated, clientController.registerClient);

route.get('/client/edit/:id', ensureAuthenticated, clientController.renderEditClient);

route.put('/client/edit/:id', ensureAuthenticated, clientController.editClient);

route.delete('/client/delete/:id', ensureAuthenticated, clientController.deleteClient);


route.get('/clients/search', ensureAuthenticated, clientController.searchClients);

route.get('/clients/sort', ensureAuthenticated, clientController.sortClients);

module.exports = route;