'use strict';
var userDialog = document.querySelector('.setup');
// ищем класс
if (userDialog) {
  userDialog.classList.remove('hidden');
}
// удаляем класс у общего табло

var userFooter = document.querySelector('.setup-similar');
if (userFooter) {
  userFooter.classList.remove('hidden');
}
// удаляем класс у списка - "Похожие персонажи"

var numberOfWizards = 4;
// тут количество необходимых визардов
var similarListElement = document.querySelector('.setup-similar-list');
// Находим список похожих персонажей - куда будем добавлять визардов
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
// находим template в котором храниться шаблоны визардов

// массивы со случайнымми данными
var players = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var family = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// генерация случайного числа


// это фУнкция получает массив и на выходе даёт случайный элемент массива
var arrRandom = function (arrAny) {
  var randomAny = getRandomInt(0, arrAny.length - 1);
  return arrAny[randomAny];
};

// цикл для создание массива с обьекатми
var getwizardMany = function (numberOfWizard) {
  var wizardMany = [];
  for (var i = 0; i < numberOfWizard; i++) {
    wizardMany[i] = {
      name: arrRandom(players) + ' ' + arrRandom(family),
      coatColor: arrRandom(coatColor),
      eyesColor: arrRandom(eyesColor)
    };
  }
  return wizardMany;
};

var wizardArr = getwizardMany(numberOfWizards);

var renderWizard = function (arrWizardsElement) {
  /**
   * Обьявлем функциию renderWizard которая принимает массив  с даными wizards и отрисовывает их
   */
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
  // возвращем WizardElement где в шаблоне от similarWizardTemplate вставлены данные из массива -> имена*цыет плащей и т.п.
};

var getRenderWizardsAll = function (wizardArrAny) {
  var fragment = document.createDocumentFragment();
  // создаем переменую fragment которая в содает в document е любой DOM элемент - но он в коробочке :_)))))
  for (var i = 0; i < wizardArrAny.length; i++) {
    fragment.appendChild(renderWizard(wizardArrAny[i]));
    // тут в fragment циклом накидиваем детей от функции renderWizard с параметром равным элементу массива
  }
  similarListElement.appendChild(fragment);
  // в similarListElement циклом накидываем детей fragment,
};

getRenderWizardsAll(wizardArr);
