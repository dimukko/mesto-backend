/* eslint-disable import/no-unresolved */
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Пользователь с таким id не найден!'))
    .then((user) => { res.send({ data: user }); })
    .catch((err) => res.status(404).send({ message: err.message }));
};

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
