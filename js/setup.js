'use strict';
(function () {
  /**
   * количество необходимых визардов
   */
  var NUMBER_OF_WIZARDS = 4;

  /**
   * Массив с именами
   */
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
  /**
   * Массив с фамилиями
   */
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
  /**
   * Массив с цветами для мантий
   */
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  /**
   * Массив с цветами для глаз
   */
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  /**
   * Массив с цветом для фаерболла
   */
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  /**
   * переменная содержащая класс .setup
   */
  var setup = document.querySelector('.setup');
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


  var setupWizardAppearance = setup.querySelector('.setup-wizard-appearance');
  var setupWizard = setupWizardAppearance.querySelector('.setup-wizard');
  // ищем класс для своего*сохраненого визарда
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  // ищем класс для мантии сохраненого визарда
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  // ищем класс для глаз сохраненого визарда
  var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');

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
  };

  getRenderWizardsAll();

  // ниже пишем обработчики событий...................

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
})();
