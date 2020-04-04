/* eslint-disable import/no-unresolved */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { messages } = require('../tools/messages');
const settings = require('../appconfig');
const {
  BadRequestErr,
  NotFoundErr,
  NotAuthorizedErr,
} = require('../errors');

// отобразить всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// найти пользователя по id
const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundErr(`${messages.user.id.isNotFound}: ${req.params.id}`))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// создать пользователя
const createUser = (req, res, next) => {
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
    .catch((err) => next(new BadRequestErr(err.message)));
};

// авторизация пользователя
const loginUser = (req, res, next) => {
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
    .catch((err) => next(new NotAuthorizedErr(err.message)));
};

// обновить данные пользователя
const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(new BadRequestErr(err.message)));
};

// обновить аватарку пользователя
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(new BadRequestErr(err.message)));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  updateUserAvatar,
};
