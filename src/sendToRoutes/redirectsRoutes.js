const sendToRoutes = {};

sendToRoutes.sendMessage = (request, response, typeMessage, message, direction) => {
    console.log(message);
    request.flash(typeMessage, message);
    response.redirect(direction);
};

sendToRoutes.sendClients = (response, clients) => {
    response.render('client/clients', {
        clients
    })
}

module.exports = sendToRoutes;