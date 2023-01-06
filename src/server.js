const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const indexRoutes = require('./routes/index.routes');
const clientRoutes = require('./routes/client.routes');
const adminRoutes = require('./routes/admin.routes');

// Initialization
const app = express();
require('./config/passport');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// midlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// global variables
app.use((request, response, next) => {
    response.locals.successMessage = request.flash('successMessage');
    response.locals.dangerMessage = request.flash('dangerMessage');
    response.locals.error = request.flash('error');

    response.locals.errorPhone = request.flash('errorPhone');
    response.locals.errorDate = request.flash('errorDate');

    response.locals.errorEmail = request.flash('errorEmail');
    response.locals.errorPassword = request.flash('errorPassword');

    response.locals.user = request.user || null;
    next();
});

// routes
app.use(indexRoutes);
app.use(clientRoutes);
app.use(adminRoutes);

app.use((request, response, next) => {
    response.render('404.ejs');
});

module.exports = app;