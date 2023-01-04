const clientController = {};
const Client = require('../model/Client');
const { isEmpty, isValidPhone, isValidMonths, isValidDate, isValidTimes } = require('../validations/clientValidations');

let nameTemporal = '', phoneTemporal = '', gymTemporal = '',
    initialDateTemporal = '', monthsTemporal = '';

const sendMessage = (request, response, typeMessage, message, direction) => {
    console.log(message);
    request.flash(typeMessage, message);
    response.redirect(direction);
};

const formatDate = date => {
    return new Date(date).toISOString().slice(0, 10);
}

const resetData = () => {
    nameTemporal = '', phoneTemporal = '', gymTemporal = '',
        initialDateTemporal = '', monthsTemporal = '';
}

clientController.searchClients = async (request, response) => {
    let clients = [];
    const { data } = request.query;
    
    if (Number.isInteger(parseInt(data)))
        clients = await Client.find({ phone: parseInt(data) });
    else {
        clients = await Client.find({ name: data.toLowerCase() }).exec();
    }
    console.log(clients);
    console.table(clients.length);
    if (clients.length == 0)
        sendMessage(request, response, 'dangerMessage', 'Any Clients Found', '/clients');
    else {
        console.log('encontradoo');
        response.render('client/clients.ejs', {
            clients
        })
    }
    // response.redirect('/clients');

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
        phone: phoneTemporal,
        gym: gymTemporal,
        initialDate: initialDateTemporal,
        months: monthsTemporal
    });
}

clientController.registerClient = async (request, response) => {
    const { name, phone, gym, initialDate, months } = request.body;

    nameTemporal = name, phoneTemporal = phone, gymTemporal = gym,
        initialDateTemporal = initialDate, monthsTemporal = months;

    if (isEmpty(name, phone, gym, initialDate, months))
        sendMessage(request, response, 'dangerMessage', 'Missing credentials', '/client/add');
    else if (!isValidPhone(phone))
        sendMessage(request, response, "errorPhone", 'Invalid phone number', '/client/add');
    else if (!isValidMonths(months))
        sendMessage(request, response, 'dangerMessage', 'Invalid amount months', '/client/add');
    else {
        const clientFound = await Client.findOne({ phone });
        console.log(clientFound);
        if (!clientFound) {
            let currentDate = new Date(Date.parse(initialDate));
            let finalDate = new Date();
            finalDate.setDate(currentDate.getDate() + ((7 * 4) * months));
            // const restDays = Math.floor((finalDate - currentDate) / (1000 * 60 * 60 * 24));
            const newClient = new Client({ name: name.toLowerCase(), phone, gym, initialDate, finalDate });
            await newClient.save();
            resetData();
            sendMessage(request, response, 'successMessage', `${name} successfully added.`, '/clients');
        }
        else sendMessage(request, response, 'errorPhone', `The client with phone ${phone} already exists`, '/client/add');
    }
}

clientController.renderEditClient = async (request, response) => {
    const clientEdit = await Client.findById(request.params.id);
    console.log(clientEdit);
    response.render('client/clientEdit.ejs', {
        clientEdit
    });
}

clientController.editClient = async (request, response) => {
    const { name, phone, gym, initialDate, finalDate, times } = request.body;
    const directionToBack = `/client/edit/${request.params.id}`;

    if (isEmpty(name, phone, gym, initialDate, finalDate, times))
        sendMessage(request, response, 'dangerMessage', 'Missing credentials', directionToBack);
    else if (!isValidPhone(phone))
        sendMessage(request, response, 'errorPhone', 'Invalid Phone', directionToBack);
    else if (!isValidDate(initialDate, finalDate))
        sendMessage(request, response, 'errorDate', "The final date can't be greater than initial date", directionToBack);
    else if (!isValidTimes(times))
        sendMessage(request, response, 'dangerMessage', "Times can't be less than zero", directionToBack);
    else {
        const clientFound = await Client.findOne({ phone });
        if (!clientFound || clientFound.phone == phone) {
            await Client.findByIdAndUpdate(request.params.id, { name, phone, gym, initialDate, finalDate, times });
            sendMessage(request, response, 'successMessage', `Client ${name} successfully updated`, '/clients');
        } else
            sendMessage(request, response, 'errorPhone', `The client with phone ${phone} already exists`, directionToBack);
    }
}

clientController.deleteClient = async (request, response) => {
    console.log(request.params.id);
    await Client.findByIdAndDelete(request.params.id);
    response.redirect('/clients');
}

module.exports = clientController;