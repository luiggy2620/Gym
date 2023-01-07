const gymController = {}

const Place = require("../model/Place");
let nameTemporal = '', ubicationTemporal = '', ubicationURLTemporal = '', phoneTemporal = '';

const resetData = () => {
    nameTemporal = '', ubicationTemporal = '', ubicationURLTemporal = '', phoneTemporal = '';
}

gymController.renderPlaces = async (request, response) => {
    const places = await Place.find();
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
    nameTemporal = name, ubicationTemporal = ubication, ubicationURLTemporal = ubicationURL, phoneTemporal = phone;
    const newPlace = new Place({ name, ubication, ubicationURL, phone });
    await newPlace.save();
    resetData();
    response.redirect('/gym/places');
}

gymController.renderFormToEditPlace = async (request, response) => {
    const placeToEdit = await Place.findById(request.params.id);
    response.render('gym/editPlace.ejs', {
        placeToEdit
    });
}

gymController.saveEditPlace = async (request, response) => {
    const {name, ubication, ubicationURL, phone} = request.body;
    await Place.findByIdAndUpdate(request.params.id, {
        name, 
        ubication, 
        ubicationURL: ubicationURL.toString(), 
        phone
    });
    response.redirect('/gym/places');
}

gymController.deletePlace = (request, response) => {
    console.log(request.params.id);
    response.send('deliting place');
}

module.exports = gymController;