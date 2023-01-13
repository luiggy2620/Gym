const validations = {};

validations.isEmpty = (...fields) => {
	let isEmpty = false;
	fields.forEach((field) => {
		if (field === '') isEmpty = true;
	});
	return isEmpty;
};

validations.isValidPhone = (phone) => {
	const phoneInteger = parseInt(phone);
	return Number.isInteger(phoneInteger) && phoneInteger.toString().length === 8;
};

validations.isValidMonths = (months) => {
	console.log(months);
	return parseInt(months) > 0;
};

validations.isValidDate = (initialDate, finalDate) => {
	const firstDate = new Date(initialDate).toISOString().slice(0, 10);
	const secondDate = new Date(finalDate).toDateString().slice(0, 10);
	return secondDate > firstDate;
};

validations.isValidTimes = (times) => {
	return parseInt(times) >= 0;
};

validations.isAuthenticatedView = (request) => {
	let isAuthenticated = 'false';
	if (request.cookies.AdminId != undefined) isAuthenticated = 'true';
	return isAuthenticated;
};

module.exports = validations;
