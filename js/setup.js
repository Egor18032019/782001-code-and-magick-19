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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

// это для обработчиков событий
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

/**
 * переменная содержащая класс .setup
 */
var setup = document.querySelector('.setup');
/**
 * переменная содержащая класс .setup-similar
 */
var userFooter = document.querySelector('.setup-similar');
/**
 * переменная содержашая класс .setup-similar-list
 * Список похожих персонажей - куда будем добавлять визардов
 */
var similarListElement = document.querySelector('.setup-similar-list');
/**
 * переменная содержашая id #similar-wizard-template
 * находим template в котором храниться шаблоны визардов
 */
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

/**
 * переменная содержашая класс .setup-open
 */
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
var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');
// ищем класс где пишеться ник визарда
var setupUserName = setup.querySelector('.setup-user-name');

/**
 * функция открытия попапа
 * @param {*} evt
 * при запуске если смотрить где произошло событие + evt.key === ESC_KEY запускает фунцию closePopup();
 * которрая в свою очередь добавляет класс hidden
 * и убирает обработчик который слушает документ на нажатие клавиши ESCкейп
 */
var onPopupEscPress = function (evt) {
  if (document.activeElement !== setupUserName && evt.key === ESC_KEY) {
    closePopup();
  }
};

var onPopupEnterPress = function (evt) {
  // для закрытия попапа с клавиатуру если табом дошли до setupClose (для это в html прописываем табиндех)
  if (document.activeElement === setupClose && evt.key === ENTER_KEY) {
    closePopup();
  }
};

/**
 * функция которая убирает класс hiden
 * и вешает на документ обработчик который слушает документ на нажатие клавиши ESC-кейп
 */
var openPopup = function () {
  setup.classList.remove('hidden');
  userFooter.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  document.addEventListener('keydown', onPopupEnterPress);
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
  // if (setup) {
  //   setup.classList.remove('hidden');
  // }
  // // удаляем класс у общего табло
  // if (userFooter) {
  //   userFooter.classList.remove('hidden');
  // }
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


// Изменение цвета мантии персонажа по нажатию.
// Цвет должен сменяться произвольным образом на один из ранее заданого массива
setupWizardCoat.addEventListener('click', function () {
  var randomCoatColor = getRandomFromArr(COAT_COLORS);
  setupWizardCoat.style.fill = randomCoatColor;
  setupWizardAppearance.querySelector('input[name="coat-color"]').value = randomCoatColor;
});

// Изменение цвета глаз персонажа по нажатию.
// Цвет глаз волшебника меняется произвольным образом на один из ранее заданого массива
setupWizardEyes.addEventListener('click', function () {
  var randomEyesColor = getRandomFromArr(EYES_COLORS);
  setupWizardEyes.style.fill = randomEyesColor;
  setupWizardAppearance.querySelector('input[name="eyes-color"]').value = randomEyesColor;
});

// Изменение цвета фаерболов по нажатию.
setupFireballWrap.addEventListener('click', function () {
  var randomFireballColor = getRandomFromArr(FIREBALL_COLORS);
  setupFireballWrap.style.backgroundColor = randomFireballColor;
  setupFireballWrap.querySelector('input[name="fireball-color"]').value = randomFireballColor;
});
