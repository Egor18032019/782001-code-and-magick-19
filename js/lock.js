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
  };
  /**
   * функция для отрисовки волшебников
   * @param {array} wizards
   */
  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(window.setup.renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var addHiddenSetup = function () {
    setup.classList.add('hidden');
  };

  var onSetupFormSubmit = function (evt) {
    var data = new FormData(form);
    window.save(data, addHiddenSetup, onError);
    evt.preventDefault();
  };

  var onLoadForm = window.load(onLoad, onError);

  // обработчик который при клике и открытие попапа подгружет данные и проверяет на ошибки
  setupOpen.addEventListener('click', onLoadForm);
  // обработчик который при клике отправляет форму и проверяет ушла она или нет
  form.addEventListener('submit', onSetupFormSubmit);
})();
