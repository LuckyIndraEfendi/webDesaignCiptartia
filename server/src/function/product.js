const Product = require('../Model/productModel');

const createProduct = async (product) => {
    try {
        const newProduct = await Product.create(product);
        if(newProduct){
            console.log('newProduct', newProduct);
            return newProduct;
        }
    } catch (error) {
        throw error;
    }
}

const findProductById = async (id) => {
    try{
        const findProductById =  await Product.findById(id);
        if(findProductById){
            console.log('findProductById', findProductById);
            return findProductById;
        }
    }catch{
        throw new Error('Product not found');
    }
}

const findProductByName = async (name) => {
    try{
        const findProductByName = await Product.findOne({name});
        if(findProductByName){
            console.log('findProductByName', findProductByName);
            return findProductByName;
        }
    }catch{
        throw new Error('Product not found');
    }
}

const findProductByCategory = async (category) => {
    try{
        const findProductByCategory = await Product.findOne({category});
        if(findProductByCategory){
            console.log('findProductByCategory', findProductByCategory);
            return findProductByCategory;
        }
    }catch{
        throw new Error('Product not found');
    }
}

const findProductByPrice = async (price) => {
    try{
        const findProductByPrice = await Product.findOne({price});
        if(findProductByPrice){
            console.log('findProductByPrice', findProductByPrice);
            return findProductByPrice;
        }
    }catch{
        throw new Error('Product not found with the price');
    }
}

const findProductByStock = async (stock) => {
    try{
        const findProductByStock = await Product.findOne({stock});
        if(findProductByStock){
            console.log('findProductByStock', findProductByStock);
            return findProductByStock;
        }
    }catch{
        throw new Error('Product not found with the stock');
    }
}

const updateProduct = async (id, product) => {
    try{
        const updateProduct =  await Product.findByIdAndUpdate(id, product, {new: true});
        if(updateProduct){
            console.log('updateProduct', updateProduct);
            return updateProduct;
        }
    }catch{
        throw new Error('Product not Updated');
    }
}

const deleteProduct = async (id) => {
    try{
        const deleteProduct = await Product.findByIdAndDelete(id);
        if(deleteProduct){
            console.log('deleteProduct', deleteProduct);
            return deleteProduct;
        }
    }catch{
        throw new Error('Product not Deleted');
    }
}

module.exports = {createProduct, findProductById, findProductByName, findProductByCategory,findProductByPrice,findProductByStock, updateProduct, deleteProduct}