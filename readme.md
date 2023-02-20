## Node.js + Express проект

Проект дозволяє рееструвати користувачів, відправляти лист на електронну пошту з верифікацією, завантажувати аватарку і зберігати телефонну книгу.
Є можливість додавати нові контакти, редагувати та видаляти.

### Endpoints:

#### /api/users:

- `post` /api/users/register `реєстрація`
- `post` /api/users/login `вхід`
- `get` /api/users/verify/:verificationToken `верифікація`
- `post` /api/users/verify `отримати новий токен`

- `get` /api/users/current `отримати данні поточного користувача`
- `patch` /api/users/current `оновити`

- `post` /api/users/logout `вийти`
- `patch` /api/users/avatar `оновити аватар`

#### /api/contacts:

- `get` /api/contacts/ `отримати всі контакти`
- `get` /api/contacts/:contactId `отримати контакт по id`
- `post` /api/contacts/ `додати новий контакт`
- `delete` /api/contacts/:contactId `видалити контакт`

- `put` /api/contacts/:contactId `оновити контакт`
- `patch` /api/contacts/:contactId/favorite `додати контакт до улюбленних`

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
