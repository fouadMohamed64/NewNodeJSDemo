const todoModel = require('../Models/todos.model')

exports.getAllTodos = async (req, res) => {
    try {
        let todos = await todoModel.find().populate('userId' , '-_id -password -__v')
        res.status(200).json({ message: 'Success', data: todos })
    } catch (error) {
        res.status(500).json({ message: 'there is a problem' })
    }
}

exports.getTodoById = async (req, res) => {
    let { id } = req.params;
    // todoModel.findOne({_id: id})
    try {
        let todo = await todoModel.findById(id);
        if (!todo) return res.status(404).json({ message: 'Todo Is Not Found' })
        res.status(200).json({ message: 'Success', data: todo });
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }

}

exports.saveTodo = async (req, res) => {
    let todo = req.body;
    try {
        let newTodo = await todoModel.create(todo);
        res.status(201).json({ message: 'Sucess', data: newTodo })
    } catch (error) {
        res.status(400).json({ message: 'there is error' })
    }
}

exports.updateTodo = async (req, res) => {
    let { id } = req.params;
    let updatedTodo = req.body;
    try {
        let newTodo = await todoModel.findByIdAndUpdate(id, { $set: updatedTodo }, { new: true });
        if (!newTodo) return res.status(404).json({ message: 'fail' })
        res.status(200).json({ message: 'Success', data: newTodo });
    } catch (error) {
        res.stauts(400).json({ message: 'fail' })
    }
}

exports.deleteTodo = async (req, res) => {
    let { id } = req.params;
    try {
        let todo = await todoModel.findByIdAndDelete(id);
        if(!todo) return res.status(404).json({message:'todo is not found '})
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: 'fail' })
    }
}

exports.viewAllTodos = async (req , res) => {
    let todos  = await todoModel.find()
    res.render('todos' , {todos})
}