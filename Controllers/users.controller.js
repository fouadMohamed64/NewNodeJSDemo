
const userModel = require('../Models/users.model');

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
