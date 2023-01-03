const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');

const indexRoutes = require('./routes/index.routes');
const clientRoutes = require('./routes/client.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// midlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// global variables

// routes
app.use(indexRoutes);
app.use(clientRoutes);
app.use(adminRoutes);

app.use((request, response, next) => {
    response.render('404.ejs');
});

module.exports = app;