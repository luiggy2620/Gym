const gymController = {};

const Client = require('../model/Client');
const Place = require('../model/Place');
const { sendMessage } = require('../redirectsToRoutes/redirectsToRoutes');
const {
	isEmpty,
	isValidPhone,
	isAuthenticatedView
} = require('../validations/validations');
let nameTemporal = '',
	ubicationTemporal = '',
	ubicationURLTemporal = '',
	phoneTemporal = '';

const resetData = () => {
	(nameTemporal = ''),
		(ubicationTemporal = ''),
		(ubicationURLTemporal = ''),
		(phoneTemporal = '');
};

gymController.renderPlaces = async (request, response) => {
	const places = await Place.find({}, { ubicationURL: 0 });
	response.render('gym/places.ejs', {
		places,
		isAuthenticated: isAuthenticatedView(request)
	});
};

gymController.renderFormToAddPlace = (request, response) => {
	response.render('gym/addPlace.ejs', {
		name: nameTemporal,
		ubication: ubicationTemporal,
		ubicationURL: ubicationURLTemporal,
		phone: phoneTemporal,
		isAuthenticated: isAuthenticatedView(request)
	});
};

gymController.saveNewPlace = async (request, response) => {
	const { name, ubication, ubicationURL, phone } = request.body;

	const routeToBack = `/gym/place/add`;
	(nameTemporal = name),
		(ubicationTemporal = ubication),
		(ubicationURLTemporal = ubicationURL),
		(phoneTemporal = phone);

	if (isEmpty(name, ubication, ubicationURL, phone))
		sendMessage(
			request,
			response,
			'dangerMessage',
			'Missing credentials',
			routeToBack
		);
	else if (!isValidPhone(phone))
		sendMessage(
			request,
			response,
			'dangerMessage',
			'Invalid phone number',
			routeToBack
		);
	else {
		const newPlace = new Place({ name, ubication, ubicationURL, phone });
		await newPlace.save();
		resetData();
		sendMessage(
			request,
			response,
			'successMessage',
			`Place ${name} successfully added.`,
			'/gym/places'
		);
	}
};

gymController.renderFormToEditPlace = async (request, response) => {
	const placeToEdit = await Place.findById(request.params.id);
	const amountClients = await Client.count({ gym: request.params.id });
	response.render('gym/editPlace.ejs', {
		placeToEdit,
		amountClients,
		isAuthenticated: isAuthenticatedView(request)
	});
};

gymController.saveEditPlace = async (request, response) => {
	const { name, ubication, ubicationURL, phone } = request.body;
	const routeToBack = `/gym/place/edit/${request.params.id}`;

	if (isEmpty(name, ubication, ubicationURL, phone))
		sendMessage(
			request,
			response,
			'dangerMessage',
			'Missing credentials',
			routeToBack
		);
	else if (!isValidPhone(phone))
		sendMessage(
			request,
			response,
			'dangerMessage',
			'Invalid phone number',
			routeToBack
		);
	else {
		await Place.findByIdAndUpdate(request.params.id, {
			name,
			ubication,
			ubicationURL,
			phone
		});
		sendMessage(
			request,
			response,
			'successMessage',
			`Place ${name} successfully updated.`,
			'/gym/places'
		);
	}
};

gymController.deletePlace = async (request, response) => {
	const placeToDelete = await Place.find(
		{ _id: request.params.id },
		{ name: 1 }
	);
	await Place.findByIdAndDelete(request.params.id);
	sendMessage(
		request,
		response,
		'successMessage',
		`${placeToDelete[0].name} deleted successfully`,
		'/gym/places'
	);
};

module.exports = gymController;
