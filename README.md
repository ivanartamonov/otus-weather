# Приложение "Прогноз погоды"

[![Actions Status](https://github.com/ivanartamonov/otus-weather/actions/workflows/sanity-check.yml/badge.svg)](https://github.com/ivanartamonov/otus-weather/actions/workflows/sanity-check.yml/badge.svg)

Приложение, которое показывает погоду для вашего города или того, который вы введете. Изначально текущимй город определяется по IP с помощью [geojs API](https://www.geojs.io/). Он определяет метоположения на основе принадлежности IP к сети провайдера и может ошибаться.

[➡️ ДЕМО](https://ivanartamonov.github.io/otus-weather/)

### Структура проекта

* assets - директотрия с ресурсами (стили, изображения и т.п.)
* public - директория с выхлопом webpack
* src - исходный код
* test - тесты

### Известные проблемы

* Настройки выхлопа в папку public с вложением дальше dist - плохая практика
* Моки для тестов API организованы плохо

## Задача

#### В задании тренируются навыки:
* работы с тестовыми системами
* использование базового синтаксиса js
* публикация кода с помощью сервиса githubpages 

#### Во время выполнения задания вы:
* примените знания по созданию базовых страниц для отображения информации
* познакомитесь с основными инструментами, упрощающими жизнь разработчика

#### Описание/Пошаговая инструкция выполнения домашнего задания:
Создайте страницу:
* при открытии страницы пользователь видит погоду (город, температуру и иконку) в своей местности (для получения прогноза погоды используйте https://openweathermap.org/current )
* он может ввести имя города в поле ввода и увидеть погоду в выбранном городе
* введенные города сохраняются у пользователя в браузере, так что он видит последние 10 городов, где он смотрел погоду
* при клике по строчке города в списке он видит погоду в выбранном городе
* кроме информации о погоде покажите в центре страницы карту для введенного адреса (используйте Google Maps Statis API https://developers.google.com/maps/documentation/maps-static/start )
* Проверить покрытие кода тестами, и добавить проверку покрытия при запуске test скрипта. Покрытие должно быть не ниже 60%

### Критерии оценки:


| Требование                                                                                                                                             | Статус |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|--------|
| создан репозиторий на гитхабе                                                                                                                          | ✅      |
| проект c package.json                                                                                                                                  | ✅      |
| настроены линтеры                                                                                                                                      | ✅      |
| настроены хаски                                                                                                                                        | ✅      |
| настроены github actions                                                                                                                               | ✅      |
| настроены dev и build скрипты                                                                                                                          | ✅      |
| сборка делается с помощью с использованием webpack                                                                                                     | ✅      |
| при открытии страницы пользователь видит свой город и прогноз погоды в своем городе                                                                    | ✅      |
| пользователь может ввести адрес/город и увидеть прогноз погоды                                                                                         | ✅      |
| введенные города сохраняются у пользователя в браузере, так что он видит последние 10 городов, где он смотрел погоду (записи в истории не повторяются) | ✅      |
| при клике по строчке города в списке истории он видит погоду в выбранном городе                                                                        | ✅      |
| вместе с погодой показывается картинка карты местности для точки                                                                                       | ✅      |
| покрытие кода выше 60 %, покрытие проверяется на CI                                                                                                    | ✅      |
| ссылка на страницу для просмотра погоды добавлена в адрес страницы репозитория                                                                         | ✅      |
| в репозитории есть README.md, который содержит описание проекта (что делается, зачем, где смотреть) и описывает структуру проекта                      | ✅      |
| сделана публикация на githubpages (с помощью github action)                                                                                            | ✅      |
| README.md есть badge для отображения статуса проверок на основной ветке (линтеры и тесты)                                                              | ✅      |