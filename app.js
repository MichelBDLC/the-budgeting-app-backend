const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const transactionsController = require('./controllers/transactionsController');
app.use('/transactions', transactionsController);

app.get('/', (_, response) => {
    response.status(200).send('welcome');
});

app.get('*', (_, response) => {
    response.status(404).send('Page not found');
});

module.exports = app;