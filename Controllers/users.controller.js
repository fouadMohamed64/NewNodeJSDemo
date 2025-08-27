
const userModel = require('../Models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.getAllUsers = async (req, res) => {
    let users = await userModel.find();
    try {
        res.status(200).json({ message: 'Success', data: users })
    } catch (error) {
        res.status(500).json({ message: 'fail' })
    }
}

exports.getUserById = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await userModel.findById(id);
        if (!user) return res.status(404).json({ message: 'user not found' });
        res.status(200).json({ message: 'Success', data: user })
    } catch (error) {
        res.status(500).json({ message: 'fail' })
    }
}

exports.saveUser = async (req, res) => {
    let user = req.body;
    try {
        let newUser = await userModel.create(user);
        res.status(201).json({ message: 'Sucess', data: newUser })
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }
}

exports.updateUser = async (req, res) => {
    let user = req.body;
    let { id } = req.params;
    try {
        let newUser = await userModel.findByIdAndUpdate(id, { $set: user }, { new: true });
        if (!newUser) return res.status(404).json({ message: 'user is not found ' });
        res.status(201).json({ message: 'Success', data: newUser })
    } catch (error) {
        res.stauts(400).json({ message: 'fail' })
    }
}

exports.deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await userModel.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: 'user Is not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }
}


exports.login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'You must provide email and password' })
    }

    let user = await userModel.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ message: 'this user is not found' })
    }

    let isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json({ message: 'invalid email or password' })
    }

    let token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET, { expiresIn: '2h' });
    let refreshToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.REFRESHTOKEN_SECRET, { expiresIn: '2d' });

    await userModel.findOneAndUpdate({ _id: user._id }, { refreshToken: refreshToken })

    res.status(201).json({ message: 'Success', token, refreshToken })

}

exports.refreshToken = async (req, res) => {
    let { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'refreshToken is required' });
    }

    try {
        let decoded = await promisify(jwt.verify)(refreshToken, process.env.REFRESHTOKEN_SECRET);

        let user = await userModel.findOne({ _id: decoded.id });
        if (!user || user.refreshToken != refreshToken) {
            return res.status(403).json({ message: 'invalid token' })
        } else {
            let token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET, { expiresIn: '2h' });
            res.status(201).json({ message: 'success', token })
        }
    } catch (error) {
        res.status(403).json({ message: 'fail' })
    }
}