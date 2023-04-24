const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isEmpty, validateRegisterInput, validateLoginInput } = require('../validation/validations');
// Desc Get register user
// Route POST /api/users
// Access Public
const registerUser = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    try {  
        const registry = await User.findone({ email: req.body.email });
        if (registry) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            const result = await user.save();
            if (result) {
                res.status(201).json(result);
            }
        }
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const loginUser = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    try {
        const userLogin = await User.findone({ email: req.body.email });
        if (!userLogin) {
            return res.status(400).json({ email: 'Email not found' });
        }else{
            const isMatch = await bcrypt.compare(req.body.password, userLogin.password);
            if (isMatch) {
                const payload = {
                    id: userLogin.id,
                    name: userLogin.name,
                    email: userLogin.email
                };
                const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });
                res.status(200).json({ success: true, token: 'Bearer ' + token });
            } else {
                return res.status(400).json({ password: 'Password incorrect' });
            }
        }
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const getCurrentUser = async (req, res) => {
    const { error, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(error);
    }
    try{
        const getCurrentUser = await bcrypt.compare(req.body.password, userLogin.password);
        if (getCurrentUser) {
            const payload = {
                id: userLogin.id,
                name: userLogin.name,
                email: userLogin.email
            };
            const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });
            res.status(200).json({ success: true, token: 'Bearer ' + token });
        }else{
            return res.status(400).json({ password: 'Password incorrect' });
        }
    }catch(error){
        res.status(400).json({error: error.message});
    }
}