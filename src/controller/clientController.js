const clientController = {};
const Client = require('../model/Client');
const { isEmpty, isValidPhone, isValidMonths, clientDontExist } = require('../validations/clientValidations');

let nameTemporal = '', lastNameTemporal = '', phoneTemporal = '', gymTemporal = '', initialDateTemporal = '', monthsTemporal = '';

const sendMessage = (request, response, typeMessage, message, direction) => {
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
    else if (isValidPhone(phone))
        sendMessage(request, response, "errorPhone", 'Invalid phone number', '/client/add');
    else if (isValidMonths(months))
        sendMessage(request, response, 'errorMonths', 'Invalid amount months', '/client/add');
    else {
        const clientDontExistBoolean = await clientDontExist(phone);
        if (clientDontExistBoolean) {
            let currentDate = new Date(Date.parse(initialDate));
            let finalDate = new Date();
            finalDate.setDate(currentDate.getDate() + ((7 * 4) * months));
            const restDays = Math.floor((finalDate - currentDate) / (1000 * 60 * 60 * 24));
            console.log(restDays);
            const newClient = new Client({ name, lastName, phone, gym, initialDate, finalDate });
            newClient.save();
            console.log(newClient);
            sendMessage(request, response, 'successMessage', `${name + lastName} successfully added.`, '/clients');
            response.redirect('/clients');
        }
        else sendMessage(request, response, 'dangerMessage', `The client with phone ${phone} already exists`, '/client/add');
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
    await Client.findByIdAndUpdate(request.params.id, { name, lastName, phone, gym, initialDate, finalDate, times });
    response.redirect('/clients');
}

clientController.deleteClient = async (request, response) => {
    console.log(request.params.id);
    await Client.findByIdAndDelete(request.params.id);
    response.redirect('/clients');
}

module.exports = clientController;



// <% if(gym === 'GIM H2G0') { %> 
//     <option value="GIM H2G0" selected>GIM H2G0</option>
// <% } else { %> 
// <% } %> 

// <% if(gym === 'GIM H2G0 2') { %> 
//     <option value="GIM H2G0 2" selected>GIM H2G0 2</option>
// <% } else { %> 
// <% } %> 




// <% if (initialDate === '') { %> 
//     <% } else { %> 
//         <%= let newDate = new Date(date)
//             newDate.toISOString().slice(0, 10)
//         %> 
//     <% } %> 



// <% if(months === '') "1" %> 
// <% else { %> 
//     <%= months %> 
// <% } %>