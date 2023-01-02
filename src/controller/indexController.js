const indexController = {};

indexController.renderIndex = (request, response) => {
    response.send('Main pageee');
}

indexController.renderAbout = (request, response) => {
    response.send('ABOuttttt');
}

module.exports = indexController;