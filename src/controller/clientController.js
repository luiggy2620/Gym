const clientController = {};
const Client = require('../model/Client');

const formatDate = (date) => {
    const newDate = new Date(date);
    const dateFormat = newDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    console.log(dateFormat+"\n");
    return dateFormat;
}

clientController.renderClients = (request, response) => {
    response.render('client/clients.ejs');
}

clientController.renderRegisterClient = (request, response) => {
    response.render('client/clientAdd.ejs');
}

clientController.registerClient = async (request, response) => {
    const { name, lastName, phone, date, gym } = request.body;
    const newClient = new Client({ name, lastName, phone, date, gym });
    newClient.save();
    console.log(newClient);
    response.redirect('/');
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