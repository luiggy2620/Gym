const { Router } = require('express');
const clientController = require('../controller/clientController');
const route = Router();

route.get('/clients/search', clientController.searchClients);

route.get('/clients', clientController.renderClients);

route.get('/client/add', clientController.renderRegisterClient);

route.post('/client/add', clientController.registerClient);

route.get('/client/edit/:id', clientController.renderEditClient);

route.put('/client/edit/:id', clientController.editClient);

route.delete('/client/delete/:id', clientController.deleteClient);

module.exports = route;