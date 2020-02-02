'use strict';
var NUMBER_OF_WIZARDS = 4;
// тут количество необходимых визардов
var userDialog = document.querySelector('.setup');
// ищем класс


var userFooter = document.querySelector('.setup-similar');


var similarListElement = document.querySelector('.setup-similar-list');
// Находим список похожих персонажей - куда будем добавлять визардов
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
// находим template в котором храниться шаблоны визардов

// массивы со случайнымми данными
// ? как сделать аперкей в вс коде
var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

/**
 * генерация случайного числа
 * @param {number} min чистло от
 * @param {number} max максимальное число
 * @return {number} случайное число в диапозоне от мин до max
 */
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * это фУнкция получает массив и на выходе даёт случайный элемент массива
 * @param {arr} arr любой массив
 * @return {number} случайный элемент массива
 */
var getRandomFromArr = function (arr) {
  var random = getRandomInt(0, arr.length - 1);
  return arr[random];
};


/**
 * цикл для создание массива с обьектами
 * @param {net} параметров у функции нет , так как используються только константы
 * @return {arr} массив с обьектами
 */
var getWizards = function () {
  var wizards = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    // push добалвяет обьект в конец массива
    wizards.push({
      name: getRandomFromArr(NAMES) + ' ' + getRandomFromArr(SURNAMES),
      coatColor: getRandomFromArr(COAT_COLORS),
      eyesColor: getRandomFromArr(EYES_COLORS)
    });
  }
  return wizards;
};

/**
 * примнимает массив и отрисовывает его элементы согласно клонировануму шаблону
 * @param {arr} arrWizardsElement массив с данными визардов
 * @return {template+arr}   возвращем WizardElement где в шаблоне от similarWizardTemplate вставлены данные из массива -> имена*цыет плащей и т.п.
 */
var renderWizard = function (arrWizardsElement) {
  if (similarWizardTemplate) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    // обьявили переменую wizardElement и в нее циклом копируем шаблоны
  }
  wizardElement.querySelector('.setup-similar-label').textContent = arrWizardsElement.name;
  // подставляем случайные имена взятые из getRandomName
  wizardElement.querySelector('.wizard-coat').style.fill = arrWizardsElement.coatColor;
  // красим плащи
  wizardElement.querySelector('.wizard-eyes').style.fill = arrWizardsElement.eyesColor;
  return wizardElement;
};
/**
 * @description создаем переменую fragment которая в создает в documentе DOM элемент
 *   потом в него циклом накидываем детей от функции renderWizard с параметром равным элементу массива
 *   а потом уже  в similarListElement циклом присоеднияем детей от fragment
 * + показываем общее табло
 * + показываем список "Похожие персонажи"
 * @param {net}   так как используються только константы
 * @description return отрисовываем в DOM заданые элементы массива по  заданному шаблону
 */
var getRenderWizardsAll = function () {
  var fragment = document.createDocumentFragment();
  var wizardArrAny = getWizards();
  for (var i = 0; i < wizardArrAny.length; i++) {
    fragment.appendChild(renderWizard(wizardArrAny[i]));
  }
  similarListElement.appendChild(fragment);
  if (userDialog) {
    userDialog.classList.remove('hidden');
  }
  // удаляем класс у общего табло
  if (userFooter) {
    userFooter.classList.remove('hidden');
  }
  // удаляем класс у списка - "Похожие персонажи"
};


getRenderWizardsAll();
