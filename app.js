require('dotenv').config();
const server = require('./src/server');
require('./src/database');

server.listen(server.get('port'), () => {
    console.log(`server on port ${server.get('port')}`);
})