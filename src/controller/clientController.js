const clientController = {};
const Client = require('../model/Client');

clientController.renderClients = async (request, response) => {
    let clients = [];
    clients = await Client.find();
    response.render('client/clients.ejs', {
        clients
    });
}

clientController.renderRegisterClient = (request, response) => {
    response.render('client/clientAdd.ejs');
}

clientController.registerClient = async (request, response) => {
    const { name, lastName, phone, gym, initialDate, months } = request.body;
    let currentDate = new Date(Date.parse(initialDate));
    let finalDate = new Date();
    finalDate.setDate(currentDate.getDate() + ((7 * 4) * months));
    const restDays = Math.floor((finalDate - currentDate) / (1000 * 60 * 60 * 24));
    console.log(restDays);
    const newClient = new Client({ name, lastName, phone, gym, initialDate, finalDate });
    newClient.save();
    console.log(newClient);
    response.redirect('/clients');
}

clientController.renderEditClient = async (request, response) => {
    const clientEdit = await Client.findById(request.params.id);
    console.log(clientEdit);
    response.render('client/clientEdit.ejs', {
        clientEdit
    });
}

clientController.editClient = async (request, response) => {
    const { name, lastName, phone, gym, initialDate, finalDate } = request.body;
    await Client.findByIdAndUpdate(request.params.id, { name, lastName, phone, gym, initialDate, finalDate });
    response.redirect('/clients');
}

clientController.deleteClient = async (request, response) => {
    console.log(request.params.id);
    await Client.findByIdAndDelete(request.params.id);
    response.redirect('/clients');
}

module.exports = clientController;