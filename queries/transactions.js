const db = require('../db/dbConfig');

getAllTransactions = async queries => {
    try {
        const allTransactions = await db.any('SELECT * FROM transactions');
        return allTransactions;
    }
    catch (error) {
        return error;
    }
};

const getTransaction = async id => {
    try {
        const theTransaction = await db.one('SELECT * FROM transactions WHERE id=$1', id);
        return theTransaction;
    }
    catch (error) {
        return error;
    }
};

const createTransaction = async transaction => {
    try {
        const newStyle = await db.one (
            'INSERT INTO transactions (name, amount, date, from, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                transaction.name,
                transaction.amount,
                transaction.date,
                transaction.from,
                transaction.category
            ]
        );
        return newTransaction;
    }
    catch (error) {
        return error;
    }
};

const deleteTransaction = async id => {
    try {
        const deletedTransaction = await db.one (
            'DELETE FROM transaction WHERE id=$1 RETURNING *',
            id
        );
        return deletedTransaction;
    }
    catch (error) {
        return error;
    }
};

const updateTransaction = async (id, style) => {
    try {
        const updatedTransaction = await db.one (
            'UPDATE transactions SET name=$1, amount=$2, date=$3, from=$4, category=$5 WHERE id=$6 RETURNING *',
            [
                transaction.name,
                transaction.amount,
                transaction.date,
                transaction.from,
                transaction.category,
                id
            ]
        );
        return updatedTransaction;
    }
    catch (error) {
        return error;
    }
};

module.exports = {
    getAllTransactions,
    getTransaction,
    createTransaction,
    deleteTransaction,
    updateTransaction,
};