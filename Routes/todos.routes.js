// endpoint todos

const express = require('express');
const router = express.Router();

const { getAllTodos, getTodoById, saveTodo, updateTodo, deleteTodo } = require('../Controllers/todos.controller')

router.get('/', getAllTodos)
router.get('/:id', getTodoById)
router.post('/', saveTodo)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)

// router.route('/').get(getAllTodos).post(saveTodo);
// router.route('/:id').get(getTodoById).patch(updateTodo).delete(deleteTodo)

module.exports = router;

// /todos/todos