'use strict';
(function () {
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
})();
