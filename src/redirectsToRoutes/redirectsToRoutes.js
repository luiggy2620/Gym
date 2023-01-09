const redirectToRoutes = {};

redirectToRoutes.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/pageNotFound');
}

redirectToRoutes.sendMessage = (request, response, typeMessage, message, direction) => {
    request.flash(typeMessage, message);
    response.redirect(direction);
};

redirectToRoutes.sendClients = (response, clients) => {
    response.render('client/clients', {
        clients
    })
}

redirectToRoutes.redirectTo404 = (request, response, next) => {
    response.status(404).render('404.ejs');
}

redirectToRoutes.existsAdmin = (request, response, next) => {
    if(request.user) next()
    else response.status(404).render('404.ejs');;
}

module.exports = redirectToRoutes;