const Order = require('../Model/orderModel');

const createOrder = async (order) => {
    try {
        const newOrder = await Order.create(order);
        if(newOrder){
            console.log('newOrder', newOrder);
            return newOrder;
        }
    } catch (error) {
        throw error;
    }
}

const findOrderById = async (id) => {
    try{
        const findOrderById = await Order.findById(id);
        if(findOrderById){
            console.log('findOrderById', findOrderById);
            return findOrderById;
        }
    }catch{
        throw new Error('Order not found');
    }
}

const findOrderByUserId = async (userId) => {
    try{
        const findOrderByUserId = await Order.findOrderByUserId({'user_Id': userId});
        if(findOrderByUserId){
            console.log('findOrderByUserId', findOrderByUserId);
            return findOrderByUserId;
        }
    }catch{
        throw new Error('Order not found');
    }
}

const findOrderByStatus = async (status) => {
    try{
        const findOrderByStatus = await Order.findOrderByStatus({'status': status});
        if(findOrderByStatus){
            console.log('findOrderByStatus', findOrderByStatus);
            return findOrderByStatus;
        }
    }catch{
        throw new Error('Order not found');
    }
}

const updateOrder = async (id, order) => {
    try{
        const updateOrder = await Order.findByIdAndUpdate(id, order, {new: true});
        if(updateOrder){
            console.log('updatedOrder', updateOrder);
            return updateOrder;
        }
    }catch{
        throw new Error('Order not updated');
    }
}

const deleteOrder = async (id) => {
    try{
        const deleteOrder = await Order.findByIdAndDelete(id);
        if(deleteOrder){
            console.log('deletedOrder', deleteOrder);
            return deleteOrder;
        }
    }catch{
        throw new Error('Order not deleted');
    }
}

module.exports = {createOrder, findOrderById, findOrderByUserId, findOrderByStatus, updateOrder, deleteOrder}