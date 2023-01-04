const clientController = {};
const Client = require('../model/Client');
const { isEmpty, isValidPhone, isValidMonths } = require('../validations/clientValidations');

let nameTemporal = '', lastNameTemporal = '', phoneTemporal = '', gymTemporal = '', initialDateTemporal = '', monthsTemporal = '';

const sendMessage = (request, response, typeMessage, message, direction) => {
    console.log(message);
    request.flash(typeMessage, message);
    response.redirect(direction);
};

const formatDate = date => {
    return new Date(date).toISOString().slice(0, 10);
}

clientController.renderClients = async (request, response) => {
    let clients = [];
    clients = await Client.find();
    response.render('client/clients.ejs', {
        clients
    });
}

clientController.renderRegisterClient = (request, response) => {
    response.render('client/clientAdd.ejs', {
        name: nameTemporal,
        lastName: lastNameTemporal,
        phone: phoneTemporal,
        gym: gymTemporal,
        initialDate: initialDateTemporal,
        months: monthsTemporal
    });
}

clientController.registerClient = async (request, response) => {
    const { name, lastName, phone, gym, initialDate, months } = request.body;

    nameTemporal = name, lastNameTemporal = lastName, phoneTemporal = phone, gymTemporal = gym,
        initialDateTemporal = initialDate, monthsTemporal = months;

    if (isEmpty(name, lastName, phone, gym, initialDate, months))
        sendMessage(request, response, 'dangerMessage', 'Missing credentials', '/client/add');
    else if (!isValidPhone(phone))
        sendMessage(request, response, "errorPhone", 'Invalid phone number', '/client/add');
    else if (!isValidMonths(months))
        sendMessage(request, response, 'errorMonths', 'Invalid amount months', '/client/add');
    else {
        const clientFound = await Client.findOne({ phone });
        console.log(clientFound);
        if (!clientFound) {
            let currentDate = new Date(Date.parse(initialDate));
            let finalDate = new Date();
            finalDate.setDate(currentDate.getDate() + ((7 * 4) * months));
            // const restDays = Math.floor((finalDate - currentDate) / (1000 * 60 * 60 * 24));
            const newClient = new Client({ name, lastName, phone, gym, initialDate, finalDate });
            await newClient.save();
            sendMessage(request, response, 'successMessage', `${name} successfully added.`, '/clients');
        }
        else sendMessage(request, response, 'dangerMessage', `The client with phone ${phone} already exists`, '/client/add');
    }
}

clientController.renderEditClient = async (request, response) => {
    const clientEdit = await Client.findById(request.params.id);
    response.render('client/clientEdit.ejs', {
        clientEdit
    });
}

clientController.editClient = async (request, response) => {
    const { name, lastName, phone, gym, initialDate, finalDate, times } = request.body;
    await Client.findByIdAndUpdate(request.params.id, { name, lastName, phone, gym, initialDate, finalDate, times });
    response.redirect('/clients');
}

clientController.deleteClient = async (request, response) => {
    console.log(request.params.id);
    await Client.findByIdAndDelete(request.params.id);
    response.redirect('/clients');
}

module.exports = clientController;