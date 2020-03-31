const messages = {
  root: {
    isNotFound: 'Запрашиваемый ресурс не найден',
  },
  registration: {
    isSuccessful: 'Пользователь успешно создан',
    isFail: 'Произошла ошибка при создании пользователя',
    isNotUnique: 'Указанный почтовый ящик уже используется',
    isNotLink: 'Неправильный формат ссылки',
    isNotEmail: 'Неправильный формат почтового адреса',
  },
  authorization: {
    isRequired: 'Нужна авторизация',
    isSuccessful: 'Успешная авторизация',
    isFailed: 'Неправильные почта или пароль',
  },
  user: {
    id: {
      isNotFound: 'Нет пользователя с такими id',
      isNotValid: 'Неверный формат id пользователя',
    },
    isFail: 'Произошла ошибка при операции с пользователем',
  },
  card: {
    id: {
      isNotFound: 'Нет карточки с таким id',
      isNotValid: 'Неверный формат id карточки',
    },
    isFail: 'Произошла ошибка при операции с карточкой',
  },
};

module.exports = {
  messages,
};
