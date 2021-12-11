require('dotenv').config();

const server = require('./server.js');

server.listen(process.env.HOST, process.env.PORT);
