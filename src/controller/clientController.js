const clientController = {};

clientController.renderRegisterClient = (request, response) => {
    response.send('Registrarrrr client');
}

clientController.registerClient = (request, response) => {
    response.send('registradoo');
}

clientController.renderEditClient = (request, response) => {
    response.send('editar cliente');
}

clientController.editClient = (request, response) => {
    response.send('editandooo cliente');
}

clientController.deleteClient = (request, response) => {
    response.send('borrando');
}

module.exports = clientController;