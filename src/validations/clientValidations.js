const clientFunctions = {};

const Client = require('../model/Client');

clientFunctions.isEmpty = (...fields) => {
    let isEmpty = false;
    fields.forEach(field => {
        if (field === '') { 
            console.log('campos vacios');
            isEmpty = true;
        }
    });
    console.log(fields);
    return isEmpty;
}

clientFunctions.isValidPhone = (phone) => {
    const newPhone = phone.toString();
    console.log('phone:', newPhone, ' leght : ', newPhone.length);
    console.log(newPhone.length === 8);
    return newPhone.length === 8;
}

clientFunctions.isValidMonths = (months) => {
    console.log(months);
    return parseInt(months) > 0;
}

module.exports = clientFunctions;