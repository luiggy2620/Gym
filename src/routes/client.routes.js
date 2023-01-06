const { Router } = require('express');
const clientController = require('../controller/clientController');
const { existsAdmin } = require('../redirectsToRoutes/redirectsToRoutes');
const route = Router();

route.use(existsAdmin);

route.get('/clients', clientController.renderClients);

route.get('/client/add', clientController.renderRegisterClient);

route.post('/client/add', clientController.registerClient);

route.get('/client/edit/:id', clientController.renderEditClient);

route.put('/client/edit/:id', clientController.editClient);

route.delete('/client/delete/:id', clientController.deleteClient);


route.get('/clients/search', clientController.searchClients);

route.get('/clients/sort', clientController.sortClients);

module.exports = route;