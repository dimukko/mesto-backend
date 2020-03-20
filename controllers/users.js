/* eslint-disable import/no-unresolved */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { messages } = require('../tools/messages');

const checkUserAndSend = (user, req, res) => {
  if (!user) {
    return res.status(404).send({ message: `${messages.user.id.isNotFound}: ${req.params.id}` });
  }
  return res.send({ data: user });
};

// отобразить всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// найти пользователя по id
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => checkUserAndSend(user, req, res))
    .catch((err) => res.status(500).send({
      message: `${messages.user.id.isNotFound}: ${req.params.id}`,
      error: err.message,
    }));
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
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      message: messages.registration.isSuccessful,
    }))
    .catch((err) => {
      if (err.message.toString().slice(0, 6) === 'E11000') {
        return res.status(409).send({ message: messages.registration.isNotUnique });
      }
      return res.status(500).send({
        message: messages.registration.isFail,
        error: err.message,
      });
    });
};

// авторизация пользователя
const loginUser = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => res.send({
      token: jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '7d' }),
      message: messages.authorization.isSuccessful,
    }))
    .catch((err) => res.status(401).send({ error: err.message }));
};

// обновить данные пользователя
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({
      message: `${messages.user.isFail}: ${req.params.id}`,
      error: err.message,
    }));
};

// обновить аватарку пользователя
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({
      message: `${messages.user.isFail}: ${req.params.id}`,
      error: err.message,
    }));
};

// удалить пользователя
const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({
      message: `${messages.user.isFail}: ${req.params.id}`,
      error: err.message,
    }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  updateUserAvatar,
  deleteUser,
};
