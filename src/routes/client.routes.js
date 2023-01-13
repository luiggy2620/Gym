const { Router } = require('express');
const clientController = require('../controller/clientController');
const { isAuthenticated } = require('../redirectsToRoutes/redirectsToRoutes');
const route = Router();

route.get('/clients', isAuthenticated, clientController.renderClients);

route.get(
	'/client/add',
	isAuthenticated,
	clientController.renderRegisterClient
);

route.post('/client/add', isAuthenticated, clientController.registerClient);

route.get(
	'/client/edit/:id',
	isAuthenticated,
	clientController.renderEditClient
);

route.put('/client/edit/:id', isAuthenticated, clientController.editClient);

route.delete(
	'/client/delete/:id',
	isAuthenticated,
	clientController.deleteClient
);

route.get('/clients/search', isAuthenticated, clientController.searchClients);

route.get('/clients/sort', isAuthenticated, clientController.sortClients);

module.exports = route;
