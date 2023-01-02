const clientController = {};

clientController.renderClients = (request, response) => {
    response.render('client/clients.ejs');
}

clientController.renderRegisterClient = (request, response) => {
    response.render('client/clientAdd.ejs');
}

clientController.registerClient = (request, response) => {
    response.send('registradoo');
}

clientController.renderEditClient = (request, response) => {
    response.render('client/clientEdit.ejs');
}

clientController.editClient = (request, response) => {
    response.send('editandooo cliente');
}

clientController.deleteClient = (request, response) => {
    response.send('borrando');
}

module.exports = clientController;