'use strict';
(function () {

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
  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
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
    wizardElement.querySelector('.wizard-coat').style.fill = arrWizardsElement.colorCoat;
    // красим плащи
    wizardElement.querySelector('.wizard-eyes').style.fill = arrWizardsElement.colorEyes;
    return wizardElement;
  };

  setupWizardCoat.addEventListener('click', function () {
    var randomCoatColor = getRandomFromArr(COAT_COLORS);
    setupWizardCoat.style.fill = randomCoatColor;
    setupWizardAppearance.querySelector('input[name="coat-color"]').value = randomCoatColor;
    wizard.onCoatChange(randomCoatColor);
  });


  // Изменение цвета глаз персонажа по нажатию.
  // Цвет глаз волшебника меняется произвольным образом на один из ранее заданого массива
  setupWizardEyes.addEventListener('click', function () {
    var randomEyesColor = getRandomFromArr(EYES_COLORS);
    setupWizardEyes.style.fill = randomEyesColor;
    setupWizardAppearance.querySelector('input[name="eyes-color"]').value = randomEyesColor;
    wizard.onEyesChange(randomEyesColor);
  });

  // Изменение цвета фаерболов по нажатию.
  setupFireballWrap.addEventListener('click', function () {
    var randomFireballColor = getRandomFromArr(FIREBALL_COLORS);
    setupFireballWrap.style.backgroundColor = randomFireballColor;
    setupFireballWrap.querySelector('input[name="fireball-color"]').value = randomFireballColor;
  });

  window.setup = {
    renderWizard: renderWizard,
    wizard: wizard
  };

})();
