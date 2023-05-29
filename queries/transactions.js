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
        const theNewTransaction = await db.one (
            'INSERT INTO transactions (name, amount, date, origin, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                transaction.name,
                transaction.amount,
                transaction.date,
                transaction.origin,
                transaction.category
            ]
        );
        return theNewTransaction;
    }
    catch (error) {
        return error;
    }
};

const deleteTransaction = async id => {
    try {
      await db.none('DELETE FROM transactions WHERE id = $1', id);
      return { success: true }; // Return a success response if deletion is successful
    } catch (error) {
      return error;
    }
  };  

const updateTransaction = async (id, transaction) => {
    try {
        const updatedTransaction = await db.one (
            'UPDATE transactions SET name=$1, amount=$2, date=$3, origin=$4, category=$5 WHERE id=$6 RETURNING *',
            [
                transaction.name,
                transaction.amount,
                transaction.date,
                transaction.origin,
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