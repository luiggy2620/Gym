const gymController = {}

gymController.renderPlaces = (request, response) => {
    response.render('gym/places.ejs');
}

gymController.renderFormToAddPlace = (request, response) => {
    response.render('gym/addPlace.ejs');
}

gymController.saveNewPlace = (request, response) => {
    console.log(request.body);
    response.send('guardando nuevo lugar');
}

gymController.renderFormToEditPlace = (request, response) => {
    console.log(request.params.id);
    response.render('gym/editPlace.ejs');
}

gymController.saveEditPlace = (request, response) => {
    console.log(request.body);
    response.send('editando lugar');
}

gymController.deletePlace = (request, response) => {
    console.log(request.params.id);
    response.send('deliting place');
}

module.exports = gymController;