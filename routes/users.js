const router = require('express').Router();
const { getUsers, getUserById, createUser, updateUser, updateUserAvatar, deleteUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);

router.post('/', createUser);

router.patch('/:id', updateUser);
router.patch('/:id/avatar', updateUserAvatar);

router.delete('/:id', deleteUser);

module.exports = router;
