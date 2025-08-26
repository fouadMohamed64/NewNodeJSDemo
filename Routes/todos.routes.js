// endpoint todos

const express = require('express');
const router = express.Router();

const { getAllTodos, getTodoById, saveTodo, updateTodo, deleteTodo } = require('../Controllers/todos.controller');
const { auth } = require('../Middleware/auth')

router.get('/', auth, getAllTodos)
router.get('/:id', auth, getTodoById)
router.post('/', auth, saveTodo)
router.patch('/:id', auth, updateTodo)
router.delete('/:id', auth, deleteTodo)

// router.route('/').get(getAllTodos).post(saveTodo);
// router.route('/:id').get(getTodoById).patch(updateTodo).delete(deleteTodo)

module.exports = router;

// /todos/todos