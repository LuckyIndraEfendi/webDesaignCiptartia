const Transaction = require('../Model/transactionModel');

const createTransaction = async (transaction) => {
    try {
        const newTransaction = await Transaction.create(transaction);
        if(newTransaction){
            console.log('newTransaction', newTransaction);
            return newTransaction;
        }
    } catch (error) {
        throw error;
    }
}

const findTransactionById = async (id) => {
    try{
        const findTransactionById = await Transaction.findById(id);
        if(findTransactionById){
            console.log('findTransactionById', findTransactionById);
            return findTransactionById;
        }
    }catch{
        throw new Error('Transaction not found');
    }
}

const findTransactionByorderId = async (orderId) => {
    try{
        const result = await Transaction.find({'order_Id': orderId});
        if(result){
            console.log('findTransactionByorderId', result);
            return result;
        }
    }catch{
        throw new Error('Transaction not found');
    }
}

const findTransactionByUserId = async (userId) => {
    try{
        const result = await Transaction.find({'user_Id': userId})
        if(result){
            console.log('findTransactionByUserId', result);
            return result;
        }
    }catch{
        throw new Error('Transaction not found');
    }
}

const findTransactionByStatus = async (status) => {
    try{
        const result = await Transaction.find({'status': status})
        if(result){
            console.log('findTransactionByStatus', result);
            return result;
        }
    }catch{
        throw new Error('Transaction not found');
    }
}

const findAllTransaction = async () => {
    try{
        const result = await Transaction.find()
        if(result){
            console.log('findAllTransaction', result);
            return result;
        }
    }catch{
        throw new Error('Transaction not found');
    }
}

const updateTransaction = async (id, transaction) => {
    try{
        const result = await Transaction.findByIdAndUpdate(id, transaction, {new: true});
        if(result){
            console.log('updatedTransaction', result);
            return result;
        }
    }catch{
        throw new Error('Transaction not updated');
    }
}

const deleteTransaction = async (id) => {
    try{
        const result = await Transaction.findByIdAndDelete(id);
        if(result){
            console.log('deletedTransaction', result);
            return result;
        }
    }catch{
        throw new Error('Transaction not deleted');
    }
}

module.exports = {createTransaction, findTransactionById, findTransactionByorderId, findTransactionByUserId, findTransactionByStatus, findAllTransaction, updateTransaction, deleteTransaction}