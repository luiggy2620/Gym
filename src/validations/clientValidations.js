const clientFunctions = {};

const Client = require('../model/Client');

clientFunctions.isEmpty = (...fileds) => {
    fileds.forEach(field => {
        if (field === '') return true;
    });
    return false;
}

clientFunctions.isValidPhone = (phone) => {
    return phone.lenght === 8;
}

clientFunctions.isValidMonths = (months) => {
    return months > 0;
}

clientFunctions.clientDontExist = async (phone) => {
    const client = await Client.find({phone});
    return !client;
}

module.exports = clientFunctions;