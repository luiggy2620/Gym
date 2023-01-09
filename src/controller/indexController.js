const indexController = {};
const Place = require('../model/Place');

indexController.renderIndex = async (request, response) => {
    const places = await Place.find({}, {_id: 0, name: 1, ubicationURL: 1});
    response.render('index.ejs', {
        places
    })
}

indexController.renderAbout = (request, response) => {
    response.render('about.ejs');
}

module.exports = indexController;