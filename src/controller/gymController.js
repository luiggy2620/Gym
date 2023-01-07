const gymController = {}

gymController.renderPlaces = (request, response) => {
    response.send('places');
}

gymController.renderFormToAddPlace = (request, response) => {
    response.send('add place');
}

gymController.saveNewPlace = (request, response) => {
    console.log(request.params.body);
    response.send('save new place');
}

gymController.renderFormToEditPlace = (request, response) => {
    console.log(request.params.id);
    response.send('editing place');
}

gymController.saveEditPlace = (request, response) => {
    console.log(request.params.body);
    response.send('editando place');
}

gymController.deletePlace = (request, response) => {
    console.log(request.params.id);
    response.send('deliting place');
}

module.exports = gymController;