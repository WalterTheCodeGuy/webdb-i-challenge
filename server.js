const express = require('express');

const AccountRouter = require('./data/accounts/AccountRouter');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
    res.send({ api: 'up and running' });
});

module.exports = server;