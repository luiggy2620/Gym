const express = require('express');

const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRoutes = require('./routes/index.routes');
const adminRoutes = require('./routes/admin.routes');
const clientRoutes = require('./routes/client.routes');
const gymRoutes = require('./routes/gym.routes');
const { redirectTo404 } = require('./redirectsToRoutes/redirectsToRoutes');

// Initialization
const app = express();
require('./config/passport');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// midlewares
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false
	})
);
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

	response.locals.admin = request.user || null;
	next();
});

// routes
app.use(indexRoutes);
app.use(clientRoutes);
app.use(gymRoutes);
app.use(adminRoutes);

app.use(redirectTo404);

module.exports = app;
