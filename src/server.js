const express = require('express');
const morgan = require('morgan');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// midlewares
app.use(morgan('dev'));

// global variables

// routes
app.get('/', (request, response) => {
    response.send('mainPage');
});

app.use((request, response, next) => {
    response.send('404');
});

 module.exports = app;