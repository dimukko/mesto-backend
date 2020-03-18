/* eslint-disable import/no-unresolved */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//отобразить всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

//найти пользователя по id
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({
      message: `Произошла ошибка при запросе пользователя с id: ${req.params.id}`,
      error: err.message
    }));
};

//создать пользователя
const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password
  } = req.body;

  bcrypt.hash(password, 8)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash
    }))
    .then(user => res.status(201).send({ _id: user._id, email: user.email, message: 'Пользователь успешно создан' }))
    .catch(err => res.status(500).send({
      message: `Произошла ошибка при создании пользователя`,
      error: err.message
    }));
};

//авторизация пользователя
const loginUser = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then(user => res.send({
      token: jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '7d' }),
      message: 'Успешная авторизация'
    }))
    .catch(err => res.status(401).send({ error: err.message }));
};

//обновить данные пользователя
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.id, { name, about }, { new: true, runValidators: true })
    .then(user => res.status(201).send({ data: user }))
    .catch(err => res.status(500).send({
      message: `Произошла ошибка при обновлении пользователя с id: ${req.params.id}`,
      error: err.message
    }));
};

//обновить аватарку пользователя
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.id, { avatar }, { new: true, runValidators: true })
    .then(user => res.status(201).send({ data: user }))
    .catch(err => res.status(500).send({
      message: `Произошла ошибка при обновлении пользователя с id: ${req.params.id}`,
      error: err.message
    }));
};

//удалить пользователя
const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.status(201).send({ data: user }))
    .catch(err => res.status(500).send({
      message: `Произошла ошибка при удалении пользователя с id: ${req.params.id}`,
      error: err.message
    }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  updateUserAvatar,
  deleteUser
};