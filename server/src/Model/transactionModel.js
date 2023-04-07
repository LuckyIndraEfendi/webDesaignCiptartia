const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    },
    payment_date: {
        type: Date,
        default: Date.now,
    },
    payment_amount: {
        type: Number,
        required: true,
    },
    payment_proof: {
        type: String,
        required: true,
    },   
},{timestamps: true});

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;