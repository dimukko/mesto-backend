const router = require('express').Router();
const { celebrate } = require('celebrate');
const { registrationJoi } = require('../celebrate');
const { createUser } = require('../controllers/users');

router.post('/', celebrate({ body: registrationJoi }), createUser);

module.exports = router;
