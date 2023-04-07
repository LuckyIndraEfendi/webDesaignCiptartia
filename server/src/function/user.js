const User = require('../lib/userModel');

const createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        throw error;
    }
}

const findUserByemail = async (email) => {
    try{
        const foundUserByEmail = await User.findOne({email});
        if(foundUserByEmail){
            console.log('foundUser', foundUserByEmail);
            return foundUserByEmail;
        }
    }catch{
        throw new Error('User not found');
    }
}

const findUserById = async (id) => {
    try{
      const foundUserById = await User.findById(id);
      if(foundUserById){
        console.log('foundUser', foundUserById);
      }
    }catch{
      throw new Error('User not found');
    }
}

const updateUser = async (id, user) => {
    try{
      const updateUser = await User.findByIdAndUpdate(id, user, {new: true});
      if(updateUser){
        console.log('updatedUser', updateUser);
        return updateUser;
      }
    } catch{
      throw new Error('User not updated');
    }
}

const deleteUser = async (id) => {
    try{
      const deleteUser = await User.findByIdAndDelete(id);
      if(deleteUser){
        console.log('deletedUser', deleteUser);
        return deleteUser;
      }
    } catch{
      throw new Error('User not deleted');
    }
}

module.exports = {createUser, findUserByemail, findUserById, updateUser, deleteUser}