const redirectToRoutes = {};

redirectToRoutes.sendMessage = (request, response, typeMessage, message, direction) => {
    console.log(message);
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