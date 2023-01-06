const clientController = {};
const Client = require('../model/Client');
const { sendMessage, sendClients } = require('../sendToRoutes/redirectsRoutes');
const { isEmpty, isValidPhone, isValidMonths, isValidDate, isValidTimes, isValidData } 
            = require('../validations/clientValidations');

let nameTemporal = '', lastNameTemporal = '', phoneTemporal = '', gymTemporal = '',
    finalDateTemporal = '', monthsTemporal = '';

const resetData = () => {
    nameTemporal = '', lastNameTemporal = '', phoneTemporal = '', gymTemporal = '',
        finalDateTemporal = '', monthsTemporal = '';
}

clientController.renderClients = async (request, response) => {
    let clients = [];
    clients = await Client.find();
    sendClients(response, clients);
}

clientController.renderRegisterClient = (request, response) => {
    response.render('client/clientAdd.ejs', {
        name: nameTemporal,
        lastName: lastNameTemporal,
        phone: phoneTemporal,
        gym: gymTemporal,
        finalDate: finalDateTemporal,
        months: monthsTemporal
    });
}

clientController.registerClient = async (request, response) => {
    const { name, lastName, phone, gym, finalDate, months } = request.body;

    nameTemporal = name, lastNameTemporal = lastName, phoneTemporal = phone, gymTemporal = gym,
        finalDateTemporal = finalDate, monthsTemporal = months;


    if (isEmpty(name, lastName, phone, gym, finalDate, months))
        sendMessage(request, response, 'dangerMessage', 'Missing credentials', '/client/add');
    else if (!isValidPhone(phone))
        sendMessage(request, response, "errorPhone", 'Invalid phone number', '/client/add');
    else if (!isValidMonths(months))
        sendMessage(request, response, 'dangerMessage', 'Invalid amount months', '/client/add');
    else {
        const clientFound = await Client.findOne({ phone });
        const finalDateParse = new Date(finalDate);
        console.log(finalDateParse, " -------------------- ", months);

        if (!clientFound) {
            const newClient = new Client({ 
                name: name.toLowerCase(), 
                lastName: lastName.toLowerCase(), 
                phone, 
                gym, 
                initialDate: new Date(), 
                finalDate
            });
            console.log(newClient);
            await newClient.save();
            resetData();
            sendMessage(request, response, 'successMessage', `${name + ' ' + lastName} successfully added.`, '/clients');
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
    const { name, lastName, phone, gym, initialDate, finalDate, times } = request.body;
    const directionToBack = `/client/edit/${request.params.id}`;

    if (isEmpty(name, lastName, phone, gym, initialDate, finalDate, times))
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
            await Client.findByIdAndUpdate(request.params.id, { name, lastName, phone, gym, initialDate, finalDate, times });
            sendMessage(request, response, 'successMessage', `${name + ' ' + lastName} successfully updated`, '/clients');
        } else
            sendMessage(request, response, 'errorPhone', `The client with phone ${phone} already exists`, directionToBack);
    }
}

clientController.deleteClient = async (request, response) => {
    const clientToDelete = await Client.findById(request.params.id);
    await Client.findByIdAndDelete(request.params.id);
    sendMessage(request, response, 'successMessage', `${clientToDelete.name + clientToDelete.lastName} delete successfully`, '/clients');
}

clientController.searchClients = async (request, response) => {
    let clients = [];
    const { data } = request.query;

    if (Number.isInteger(parseInt(data)))
        clients = await Client.find({ phone: parseInt(data) });
    else clients = await Client.find({ name: data.toLowerCase() });

    if (clients.length == 0)
        sendMessage(request, response, 'dangerMessage', 'Any Clients Found', '/clients');
    else
        sendClients(response, clients);
}

clientController.sortClients = async (request, response) => {
    const { sort, order } = request.query;
    let typeOrder = 1
    if (order === 'desc') typeOrder = -1;

    const clients = await Client.find({}).sort([[sort, typeOrder]]);
    sendClients(response, clients);
}

module.exports = clientController;