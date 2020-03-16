/* eslint-disable import/no-unresolved */
const { ObjectId } = require('mongodb');
const User = require('../models/user');

//отобразить всех пользователей
const getUsers = (req, res) => {
  User.find({})
      .then(users => res.send({ data: users }))
      .catch(err => res.status(500).send({ message: err.message }));
};

//найти пользователя по id
const getUserById = (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: `Пользователя с id: ${req.params.id} не существует`})
      }
      res.send({ data: user }); })
    .catch(err => res.status(500).send({ message: `Произошла ошибка при запросе пользователя с id: ${req.params.id}`, error: err.message }));
  } else {
    res.status(400).send({ message: 'Неправильный формат id пользователя' });
  }
};

//создать пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
      .then(user => res.status(201).send({ data: user }))
      .catch(err => res.status(500).send({ message: `Произошла ошибка при создании пользователя`, error: err.message }));
};

//обновить данные пользователя
const updateUser = (req, res) => {
  const { name, about } = req.body;

  if (ObjectId.isValid(req.params.id)) {
    User.findByIdAndUpdate(req.params.id, { name, about }, { new: true, runValidators: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: `Пользователя с id: ${req.params.id} не существует`})
      }
      res.send({ data: user }); })
    .catch(err => res.status(500).send({ message: `Произошла ошибка при обновлении пользователя с id: ${req.params.id}`, error: err.message }));
  } else {
    res.status(400).send({ message: 'Неправильный формат id пользователя' });
  }
};

//обновить аватарку пользователя
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  if (ObjectId.isValid(req.params.id)) {
    User.findByIdAndUpdate(req.params.id, { avatar }, { new: true, runValidators: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: `Пользователя с id: ${req.params.id} не существует`})
      }
      res.send({ data: user }); })
    .catch(err => res.status(500).send({ message: `Произошла ошибка при обновлении аватара пользователя с id: ${req.params.id}`, error: err.message }));
  } else {
    res.status(400).send({ message: 'Неправильный формат id пользователя' });
  }
};

//удалить пользователя
const deleteUser = (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: `Пользователя с id: ${req.params.id} не существует`})
      }
      res.send({ message: `Пользователь успешно удалён: ${user.name}` }); })
    .catch(err => res.status(500).send({ message: `Произошла ошибка при удалении пользователя с id: ${req.params.id}`, error: err.message }));
  } else {
    res.status(400).send({ message: 'Неправильный формат id пользователя' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  deleteUser
};
