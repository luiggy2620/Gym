const { isAuthenticatedView } = require('../validations/validations');

const redirectToRoutes = {};

redirectToRoutes.sendMessage = (
	request,
	response,
	typeMessage,
	message,
	direction
) => {
	request.flash(typeMessage, message);
	response.redirect(direction);
};

redirectToRoutes.sendClients = (request, response, clients) => {
	response.render('client/clients', {
		clients,
		isAuthenticated: isAuthenticatedView(request)
	});
};

redirectToRoutes.redirectTo404 = (request, response, next) => {
	response.status(404).render('404.ejs');
};

redirectToRoutes.isAuthenticated = (request, response, next) => {
	if (request.cookies.AdminId != undefined) next();
	else response.status(404).render('404.ejs');
};

module.exports = redirectToRoutes;
