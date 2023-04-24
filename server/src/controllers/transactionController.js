const {createTransaction, findTransactionById, findTransactionByorderId, findTransactionByUserId, findTransactionByStatus, findAllTransaction, updateTransaction, deleteTransaction} = require('../function/transaction');

// Desc Get all transactions
// Route GET /api/transactions
// Access Public
const getTransaction = async (req, res) => {
    try{
        const result = await findAllTransaction();
        if(result){
            res.status(200).json(result);
        }
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

// Desc Create a transaction
// Route POST /api/transactions
// Access Public
const createTransaction = async (req, res) => {
    try{
        const transaction = await createTransaction(req.body);
        res.status(201).json(transaction);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

// Desc Get a transaction by id
// Route GET /api/transactions/:id
// Access Public
const getTransactionById = async (req, res) => {
    try{
        const result = await findTransactionById(req.params.id);
        if(result){
            res.status(200).json(result);
        }
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

// Desc Get a transaction by order id
// Route GET /api/transactions/order/:orderId
// Access Public
const getTransactionByorderId = async (req, res) => {
    try{
        const result = await findTransactionByorderId(req.params.orderId);
        if(result){
            res.status(200).json(result);
        }
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

// Desc Get a transaction by user id
// Route GET /api/transactions/user/:userId
// Access Public
const getTransactionByUserId = async (req, res) => {
    try{
        const result = await findTransactionByUserId(req.params.userId);
        if(result){
            res.status(200).json(result);
        }
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

// Desc Get a transaction by status
// Route GET /api/transactions/status/:status
// Access Public
const getTransactionByStatus = async (req, res) => {
    try{
        const result = await findTransactionByStatus(req.params.status);
        if(result){
            res.status(200).json(result);
        }
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

// Desc Update a transaction
// Route PUT /api/transactions/:id
// Access Public
const updateTransaction = async (req, res) => {
    try{
        const result = await updateTransaction(req.params.id, req.body);
        if(result){
            res.status(200).json(result);
        }
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

// Desc Delete a transaction
// Route DELETE /api/transactions/:id
// Access Public
const deleteTransaction = async (req, res) => {
    try{
        const result = await deleteTransaction(req.params.id);
        if(result){
            res.status(200).json(result);
        }
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {getTransaction, createTransaction, getTransactionById, getTransactionByorderId, getTransactionByUserId, getTransactionByStatus, updateTransaction, deleteTransaction}