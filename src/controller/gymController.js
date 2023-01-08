const gymController = {}

const Place = require("../model/Place");
const { sendMessage } = require("../redirectsToRoutes/redirectsToRoutes");
const { isEmpty, isValidPhone } = require("../validations/validations");
let nameTemporal = '', ubicationTemporal = '', ubicationURLTemporal = '', phoneTemporal = '';

const resetData = () => {
    nameTemporal = '', ubicationTemporal = '', ubicationURLTemporal = '', phoneTemporal = '';
}

gymController.renderPlaces = async (request, response) => {
    const places = await Place.find({}, { ubicationURL: 0 });
    console.log(places);
    response.render('gym/places.ejs', {
        places
    });
}

gymController.renderFormToAddPlace = (request, response) => {
    response.render('gym/addPlace.ejs', {
        name: nameTemporal,
        ubication: ubicationTemporal,
        ubicationURL: ubicationURLTemporal,
        phone: phoneTemporal
    });
}

gymController.saveNewPlace = async (request, response) => {
    const { name, ubication, ubicationURL, phone } = request.body;

    const routeToBack = `/gym/place/add`;
    nameTemporal = name, ubicationTemporal = ubication,
        ubicationURLTemporal = ubicationURL, phoneTemporal = phone;

    if (isEmpty(name, ubication, ubicationURL, phone))
        sendMessage(request, response, 'dangerMessage', 'Missing credentials', routeToBack);
    else if (!isValidPhone(phone))
        sendMessage(request, response, 'dangerMessage', 'Invalid phone number', routeToBack);
    else {
        const newPlace = new Place({ name, ubication, ubicationURL, phone });
        await newPlace.save();
        resetData();
        sendMessage(request, response, 'successMessage', `Place ${name} successfully added.`, '/gym/places');
    }
}

gymController.renderFormToEditPlace = async (request, response) => {
    const placeToEdit = await Place.findById(request.params.id);
    response.render('gym/editPlace.ejs', {
        placeToEdit
    });
}

gymController.saveEditPlace = async (request, response) => {
    const { name, ubication, ubicationURL, phone } = request.body;
    const routeToBack = `/gym/place/edit/${request.params.id}`;

    if (isEmpty(name, ubication, ubicationURL, phone))
        sendMessage(request, response, 'dangerMessage', 'Missing credentials', routeToBack);
    else if (!isValidPhone(phone))
        sendMessage(request, response, 'dangerMessage', 'Invalid phone number', routeToBack);
    else {
        await Place.findByIdAndUpdate(request.params.id, { name, ubication, ubicationURL, phone });
        sendMessage(request, response, 'successMessage', `Place ${name} successfully updated.`, '/gym/places');
    }

}

gymController.deletePlace = async (request, response) => {
    await Place.findByIdAndDelete(request.params.id);
    response.redirect('/gym/places');
}

module.exports = gymController;