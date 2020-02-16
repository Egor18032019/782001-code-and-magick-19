'use strict';
(function () {
  /**
   * переменная содержащая класс .setup
   */
  var setupDialogElement = document.querySelector('.setup');
  /**
   * переменная в setupDialogElement содержашая класс '.upload'
   */
  var dialogHandler = setupDialogElement.querySelector('.upload');
  // обработчик нажатия
  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    /**
     * начальные координаты нажатия мышки
     */
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    /**
     * флаг который если мыщка не двинулась то ложь и откроеться окно загрузки
     * а если мышка двинулась то будет отмена действия по умолчанию
     */
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };
    // обработчик на движение
    document.addEventListener('mousemove', onMouseMove);
    // обработчик на отпускание кнопки
    document.addEventListener('mouseup', onMouseUp);
  });
})();
