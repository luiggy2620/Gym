const express = require('express');
const morgan = require('morgan');

const indexRoutes = require('./routes/index.routes');
const clientRoutes = require('./routes/client.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// midlewares
app.use(morgan('dev'));

// global variables

// routes
app.use(indexRoutes);
app.use(clientRoutes);
app.use(adminRoutes);

app.use((request, response, next) => {
    response.send('404');
});

module.exports = app;