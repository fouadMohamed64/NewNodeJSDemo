

const experss = require('express');
const router = experss.Router();
const { getAllUsers, getUserById, saveUser, updateUser, deleteUser, login, refreshToken } = require('../Controllers/users.controller');

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', saveUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

router.post('/login', login)
router.post('/refreshToken', refreshToken)

module.exports = router;