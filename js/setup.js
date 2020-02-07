'use strict';
var NUMBER_OF_WIZARDS = 4;
// тут количество необходимых визардов

// массивы со случайнымми данными
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


// это для обработчиков событий
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var setup = document.querySelector('.setup');
// ищем класс
var userFooter = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
// Находим список похожих персонажей - куда будем добавлять визардов
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
// находим template в котором храниться шаблоны визардов

var setupOpen = document.querySelector('.setup-open');
// перменные для обработичиков
var setupClose = setup.querySelector('.setup-close');
var setupWizardAppearance = setup.querySelector('.setup-wizard-appearance');
var setupWizard = setupWizardAppearance.querySelector('.setup-wizard');
// ищем класс для своего*сохраненого визарда
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
// ищем класс для мантии сохраненого визарда
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
// ищем класс для глаз сохраненого визарда


// --?? Дима, почему setupClose не равно evt.target????
// var setupUserName = setup.querySelector('.setup-user-name');
// console.log(setupUserName);
// console.log(evt.target)  -- вставить в функцию
/**
 * функция открытия попапа
 * @param {*} evt
 * при запуске если evt.key === ESC_KEY запускает фунцию closePopup();
 * которрая в свою очередь добавляет класс hidden
 * и убирает обработчик который слушает документ на нажатие клавиши ESCкейп
 */
var onPopupEscPress = function (evt) {
  if (evt.target.classList.value !== 'setup-user-name') {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  }
};
/**
 * функция которая убирает класс hiden
 * и вешает на документ обработчик который слушает документ на нажатие клавиши ESC-кейп
 */
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
/**
 * фунция которая добавляет класс hidden и снимает с документа обработчик событий на нажатие клавиши ESC-кейп
 */
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};


// --------------------------------
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
    // создаем массивы с разными визардами
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
  if (setup) {
    setup.classList.remove('hidden');
  }
  // удаляем класс у общего табло
  if (userFooter) {
    userFooter.classList.remove('hidden');
  }
  // удаляем класс у списка - "Похожие персонажи"
};


getRenderWizardsAll();

// ///////////////// задание 4.1


// ниже пишем обработчики событий...................

// для открытия попапа при клике мышкой по setupOpen
setupOpen.addEventListener('click', function () {
  openPopup();
});

// для открытия при нажатие на клавишу ентер если фокус стоит на setupOpen
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

// для закрытия попапа при клике мышкой по setupClose
setupClose.addEventListener('click', function () {
  closePopup();
});

// для закрытия попапа с клавиатуру если табом дошли до setupClose (для это в html прописываем табиндех)
setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

// Изменение цвета мантии персонажа по нажатию.
// Цвет должен сменяться произвольным образом на один из ранее заданого массива
setupWizardCoat.addEventListener('click', function () {
  setupWizardCoat.style.fill = getRandomFromArr(COAT_COLORS);
  setupWizardAppearance.querySelector('input[name="coat-color"]').value = setupWizardCoat.style.fill;
});

// Изменение цвета глаз персонажа по нажатию.
// Цвет глаз волшебника меняется произвольным образом на один из ранее заданого массива
setupWizardEyes.addEventListener('click', function () {
  setupWizardEyes.style.fill = getRandomFromArr(EYES_COLORS);
  setupWizardAppearance.querySelector('input[name="eyes-color"]').value = setupWizardEyes.style.fill;
});
