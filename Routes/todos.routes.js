// endpoint todos

const express = require('express');
const router = express.Router();

const { getAllTodos, getTodoById, saveTodo, updateTodo, deleteTodo, viewAllTodos } = require('../Controllers/todos.controller');
const { auth, restrictTo } = require('../Middleware/auth')

router.get('/', auth, getAllTodos)
router.get('/:id', auth, getTodoById)

router.post('/', auth, restrictTo('user', 'admin'), saveTodo)
router.patch('/:id', auth, restrictTo('admin'), updateTodo)
router.delete('/:id', auth, restrictTo('admin'), deleteTodo)

// router.route('/').get(getAllTodos).post(saveTodo);
// router.route('/:id').get(getTodoById).patch(updateTodo).delete(deleteTodo)

router.get('/view/api', viewAllTodos)

module.exports = router;

// /todos/todos