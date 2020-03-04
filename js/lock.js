'use strict';
(function () {

  var MAX_SIMILAR_WIZARD_COUNT = 4;

  /**
   * кнопка 'Escape'
   */
  var ESC_KEY = 'Escape';
  /**
   * кнопка 'Enter'
   */
  var ENTER_KEY = 'Enter';
  /**
   * переменная содержащая класс .setup
   */
  var setup = document.querySelector('.setup');
  /**
   * ищем класс где пишеться ник визарда
   */
  var setupUserName = setup.querySelector('.setup-user-name');
  /**
   * переменная содержащая класс .setup-similar
   */
  var userFooter = document.querySelector('.setup-similar');
  /**
   * переменная содержашая класс .setup-open
   */
  var setupOpen = document.querySelector('.setup-open');
  // перменные для обработичиков
  var setupClose = setup.querySelector('.setup-close');
  /**
   * элемент .setup-wizard-form
   */
  var form = setup.querySelector('.setup-wizard-form');
  /**
   * переменная содержашая класс .setup-similar-list
   * Список похожих персонажей - куда будем добавлять визардов
   */
  var similarListElement = document.querySelector('.setup-similar-list');

  /**
   * кнопка Сохраниить
   */
  var submitButton = setup.querySelector('.setup-submit');

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
    // координаты начального положения окна
    setup.style.top = '80px';
    setup.style.left = '50%';
    document.removeEventListener('keydown', onPopupEscPress);
    // удаляем обработчик чтобы визарды немножились
    setupOpen.removeEventListener('click', onLoadForm);
    // находим предупреждение и удаляем его
    var node = document.querySelector('.alert');
    if (node) {
      node.remove();
    }
  };

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

  /**
   * функция для отрисовки ошибок
   * @param {text} errorMessage
   */
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.className = 'alert';
    // добавил класса alert что бы в closePopup найти  у далить его при закрытие
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    submitButton.disabled = false;
    submitButton.textContent = 'Сохранить';
  };

  // обьявляем пустые переменные
  var coatColor;
  var eyesColor;
  var wizards = [];

  /**
   * система ранжирования элементов в массиве
   * @param {*} wizard элемент массив
   * @return  {number} ранг элемента массива
   */
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor && wizard.colorEyes === eyesColor) {
      rank += 3;
    }
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };
  /**
   * функция сортировки элементов массива
   * @param {*} left критерий сортировки
   * @param {*} right критерий сортировки
   * @return  {number} индекс отсортированого элементе
   */
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  /**
   * отрисовка элементов массива
   * @param {*} data  массив
   */
  var render = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > MAX_SIMILAR_WIZARD_COUNT ? MAX_SIMILAR_WIZARD_COUNT : data.length;
    // чистим элемент
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(window.setup.renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    userFooter.classList.remove('hidden');
  };


  var updateWizards = function () {
    // сортируем массив wizards
    wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        // -???  Дима не могу понять эту строчку.. Откуда он тут узнает длину имени ???
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });
    render(wizards);
  };

  // Перезаписываем обработчики-пустышки обьявленные выше

  window.setup.wizard.onEyesChange = window.debounce(function (colors) {
    eyesColor = colors;
    updateWizards();
  });

  // И обработчик на смену цвета мантии
  window.setup.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  /**
   * функция для отрисовки волшебников
   * @param {array} data
   */
  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };


  var addHiddenSetup = function () {
    submitButton.textContent = 'Сохранить';
    submitButton.disabled = false;
    setup.classList.add('hidden');
  };

  var onSetupFormSubmit = function (evt) {
    var data = new FormData(form);
    submitButton.textContent = 'Попытка отправки...';
    submitButton.disabled = true;
    evt.preventDefault();
    window.backend.save(data, addHiddenSetup, onError);
  };
  // --? Дима посмотри пожалуйста правильно ли тут
  var onLoadForm = window.backend.load(onLoad, onError);

  // обработчик который при клике и открытие попапа подгружет данные и проверяет на ошибки
  setupOpen.addEventListener('click', onLoadForm);
  // обработчик который при клике отправляет форму и проверяет ушла она или нет
  form.addEventListener('submit', onSetupFormSubmit);
})();
