const clientFunctions = {};

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
    const phoneInteger = parseInt(phone);
    return Number.isInteger(phoneInteger) && phoneInteger.toString().length === 8;
}

clientFunctions.isValidMonths = (months) => {
    console.log(months);
    return parseInt(months) > 0;
}

clientFunctions.isValidDate = (initialDate, finalDate) => {
    const firstDate = new Date(initialDate).toISOString().slice(0, 10);
    const secondDate = new Date(finalDate).toDateString.slice(0, 10);
    return secondDate > firstDate;
}

clientFunctions.isValidTimes = (times) => {
    return parseInt(times) > 0;
}

module.exports = clientFunctions;