require('dotenv').config();
const server = require('./server');
require('./database');

server.listen(server.get('port'), () => {
    console.log(`server on port ${server.get('port')}`);
})