const express = require('express');
const morgan = require('morgan');
const path = require('path');

const indexRoutes = require('./routes/index.routes');
const clientRoutes = require('./routes/client.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('view', path.join(__dirname, 'view'));

// midlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// global variables

// routes
app.use(indexRoutes);
app.use(clientRoutes);
app.use(adminRoutes);

app.use((request, response, next) => {
    response.send('404');
});

module.exports = app;