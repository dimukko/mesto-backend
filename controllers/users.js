/* eslint-disable import/no-unresolved */
const User = require('../models/user');

//отобразить всех пользователей
const getUsers = (req, res) => {
  User.find({})
      .then((users) => res.send({ data: users }))
      .catch((err) => res.status(500).send({ message: err.message }));
};

//найти пользователя по id
const getUserById = (req, res) => {
  User.findById(req.params.id)
      .then((user) => { res.send({ data: user }); })
      .catch((err) => res.status(404).send({ message: `Нет пользователя с таким id`, error: err.message })); //в задании указано 404 статус
};

//создать пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => res.status(500).send({ message: `Произошла ошибка при создании пользователя`, error: err.message }));
};

//обновить данные пользователя
const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then(user => res.send({ data: user }))
      .catch(err => res.status(400).send({ message: `Нет пользователя с таким id`, error: err.message }));
};

//обновить аватарку пользователя
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then(user => res.send({ data: user }))
      .catch(err => res.status(400).send({ message: `Нет пользователя с таким id`, error: err.message }));
};

//удалить пользователя
const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
      .then((user) => res.send({ message: `Пользователь успешно удалён: ${user.name}` }))
      .catch((err) => res.status(500).send({ message: `Нет пользователя с таким id`, error: err.message }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  deleteUser
};
