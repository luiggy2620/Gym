const indexController = {};
const Place = require('../model/Place');
const { isAuthenticatedView } = require('../validations/validations');

indexController.renderIndex = async (request, response) => {
	const places = await Place.find({}, { _id: 0, name: 1, ubicationURL: 1 });
	response.render('index.ejs', {
		places,
		isAuthenticated: isAuthenticatedView(request)
	});
};

module.exports = indexController;
