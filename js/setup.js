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
  "black",
  "red",
  "blue",
  "yellow",
  "green"
];

var getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};
// генерация случайного числа

/**
 *  создаем функцию которая генерирует случайные элементы
 */
var getRandomElement = function (massiv, massiv2) {
  var random = getRandomInt(massiv.length);
  if (massiv2) {
    var random2 = getRandomInt(massiv2.length);
    var randomElement2 = massiv2[random2];
  };
  var randomElement = massiv[random];
  return massiv2 ? randomElement + " " + randomElement2 : randomElement;
}

// Создаем массив с данными магов

// массив с данными визардов

var wizards = [{
    name: getRandomElement(players, family),
    coatColor: getRandomElement(coatColor),
    eyesColor: getRandomElement(eyesColor)
  },
  {
    name: getRandomElement(players, family),
    coatColor: getRandomElement(coatColor),
    eyesColor: getRandomElement(eyesColor)
  },
  {
    name: getRandomElement(players, family),
    coatColor: getRandomElement(coatColor),
    eyesColor: getRandomElement(eyesColor)
  },
  {
    name: getRandomElement(players, family),
    coatColor: getRandomElement(coatColor),
    eyesColor: getRandomElement(eyesColor)
  }
];

var similarListElement = document.querySelector('.setup-similar-list');
// Находим список похожих персонажей - куда будем добавлять визардов

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
// находим template в котором храниться шаблоны визардов
console.log(similarWizardTemplate);
// - вопрос к Диме = на каком этапе можно опнять что надо писать функцию ?

var renderWizard = function (wizard) {
  /**
   * Обьявлем функциию renderWizard которая принимает массив  с даными wizard и отрисовывает их
   */
  var wizardElement = similarWizardTemplate.cloneNode(true);
  // обьявили переменую wizardElement и в нее циклом копируем шаблоны
  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  // подставляем случайные имена взятые из getRandomName
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  // красим плащи
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].ceyesColor;
  return wizardElement;
  // возвращем WizardElement где в шаблоне от similarWizardTemplate вставлены данные из массива -> имена*цыет плащей и т.п.
};

var fragment = document.createDocumentFragment();
// создаем переменую fragment которая в содает в document е любой DOM элемент - но он в коробочке :_)))))
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
  // тут в fragment циклом накидиваем детей от функции renderWizard с параметром wizards[i]
}
similarListElement.appendChild(fragment);
// в similarListElement циклом накидываем детей fragmenta ха ха,
