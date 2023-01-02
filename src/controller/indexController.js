const indexController = {};

indexController.renderIndex = (request, response) => {
    response.render('index.ejs')
}

indexController.renderAbout = (request, response) => {
    response.render('about.ejs');
}

module.exports = indexController;