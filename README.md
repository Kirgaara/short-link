# Тестовое задание frontend части сервиса сокращения ссылок.

Задание выполнено на фреймворке React с использованием TypeScript при помощи create-react-app.
Помимо этого были добавлены пакеты:

- react-redux и redux-toolkit: менеджер состояний;
- axios: для более удобных запросов;
- react-router-dom: для реализации различных страниц;
- sass: для стилизации;

## Инструкция по запуску

- npm i _для загрузки пакетов_
- npm start _для запуска тестового сервера_

## Функционал

В проекте присутствует 4 страницы:

- Страница регистрации;
- Страница авторизации;
- Страница для сжатия ссылок;
- Страница со статистикой по сжатым ссылкам;

Они реализуют следующий функционал: <br />
o Просмотр статистики по созданным ссылкам в виде таблицы; <br />
o Таблица содержит три столбца - короткая ссылка, исходная ссылка,
количество переходов по короткой ссылке; <br />
o Таблица имеет пагинацию; <br />
o Таблица имеет возможность сортировки по столбцам; <br />
o Сокращенные ссылки копируются при клике;
