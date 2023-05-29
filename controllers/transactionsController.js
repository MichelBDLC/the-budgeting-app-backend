const express = require('express');
const transactions = express.Router();

const {
    getAllTransactions, getTransaction, createTransaction, deleteTransaction, updateTransaction
} = require('../queries/transactions');

transactions.get('/', async (request, response) => {
    try {
        const allTransactions = await getAllTransactions(request.query);

        if (allTransactions.length > 0) {
            response.status(200).json(allTransactions);
        }
        else {
            response.status(404).json({ error: 'No Transactions found'});
        }
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch transactions'});
    }
});

transactions.get('/:id', async (request, response) => {

    const { id } = request.params;
    const transaction = await getTransaction(id);

    if (transaction) {
        response.status(200).json(transaction);
    }
    else {
        response.status(404).json({ error: "transaction not found"});
    };
});

transactions.post('/', async (request, response) => {
    if (request.body) {
        try {
            const newTransaction = await createTransaction(request.body);
            response.status(201).json(newTransaction);
        }
        catch (error) {
            response.status(500).json({ error: 'Failed to create transaction' });
        }
    }
    else {
        response.status(400).json({ error: 'Invalid request' });
    }
});

transactions.delete('/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const deletedTransaction = await deleteTransaction(id);
        response.sendStatus(204);
    }
    catch (error) {
        response.status(500).json({ error: "Failed to delete" });
    }
});

transactions.put('/:id', async (request, response) => {
    const { id } = request.params;

    if (request.body) {
        const updatedTransaction = await updateTransaction(id, request.body);
        response.status(200).json(updatedTransaction);
    }
    else {
        response.status(404).json({ error: "cannot update" });
    };
});

module.exports = transactions;