/* eslint-disable import/no-unresolved */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { messages } = require('../tools/messages');
const settings = require('../appconfig');
const NotFoundError = require('../errors/notFound');

// отобразить всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// найти пользователя по id
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError(`${messages.user.id.isNotFound}: ${req.params.id}`))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: err.message }));
};

// создать пользователя
const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 8)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id, email: user.email, message: messages.registration.isSuccessful,
    }))
    .catch((err) => res.status(500).send({ error: err.message }));
};

// авторизация пользователя
const loginUser = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.cookie('jwt', jwt.sign({ _id: user._id }, settings.JWT_KEY), {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ message: messages.authorization.isSuccessful });
    })
    .catch((err) => res.status(401).send({ error: err.message }));
};

// обновить данные пользователя
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError(`${messages.user.id.isNotFound}: ${req.params.id}`))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: err.message }));
};

// обновить аватарку пользователя
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError(`${messages.user.id.isNotFound}: ${req.params.id}`))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(err.statusCode || 500).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  updateUserAvatar,
};
