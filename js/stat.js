'use strict';
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;

  var CLOUD_X = 100;
  var CLOUD_Y = 10;

  var GAP = 10;

  var COLOR_CLOUD = '#ffffff';

  var FONT_GAP = 15;

  var TEXT_WIDTH = 50;

  var BAR_WIDTH = 40;

  var BAR_MAX_HEIGHT = 150;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };
  // функция расчета формы стастики. сейчас прямоугольник

  // функция нахождения максимального элемента
  var getMaxElement = function (arr) {
    // arr - это любой массив
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  // генерация случайного числа
  var getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
  };

  var getRandomColorSaturation = function (hue, lightness) {
    var saturation = getRandomInt(100);
    // получаем случайную насыщеность
    var randomSaturation = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
    // пишем чему будет равет hsl
    return randomSaturation;
  };
  // делаю рандомную насыщеность цвета
  //  (getRandomColorSaturation(240(hue), 50(lightness)));
  // синий цвет в hsl(240, 100%, 50%) поэтому вызываем фунцкцию с параметрами 240 и 50% а насыщеность будет радномная из фунцкции которая выше

  var createFontStyle = function (ctx, font, baseline, style) {
    // значение ctx.font  равно параметру font из параметров функции
    ctx.font = font;
    ctx.textBaseline = baseline;
    ctx.fillStyle = style;
  };


  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_CLOUD);
    // console.log(ctx);
    createFontStyle(ctx, '16px PT Mono', 'hanging', 'black');
    ctx.fillText('Ура вы победили!', CLOUD_WIDTH / 2, CLOUD_Y + FONT_GAP + GAP);
    ctx.fillText('Список результатов: ', CLOUD_WIDTH / 2, CLOUD_Y + FONT_GAP * 2 + GAP);
    ctx.fillStyle = 'black';

    var maxTime = getMaxElement(times);
    // ищем максимальный элемент в массиве times
    for (var i = 0; i < players.length; i++) {
      var rightBarHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
      // правильная высота столбика  равна заданой максимальной высоты столбика умноженная на время участника и делёное на максимальное время
      var currentY = CLOUD_HEIGHT - GAP - FONT_GAP - rightBarHeight;
      // от максимальной высоты облака отнимаем GAP(разница) и высоту шрифта и  потом  для того что бы строилось снизу вверх отнимаем высоту столбика
      var currentX = CLOUD_X + TEXT_WIDTH + TEXT_WIDTH * i + BAR_WIDTH * i;
      // к начальной координате прибавляем GAP(отступ слева для красоты) и длину текста*умноженную на i
      var currentTime = Math.floor(times[i]);
      // округлям время
      ctx.fillStyle = 'black';
      ctx.fillText(currentTime, currentX, currentY - GAP / 2 - FONT_GAP);
      ctx.fillText(players[i], currentX, CLOUD_HEIGHT - GAP / 2 - FONT_GAP);
      // это пишем имена игроков


      ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomColorSaturation(240, 50);
      // заливка текста равно (если игрок это вы (и это правда) - то вернёт красный цвет если ложь то вернет синий с рандомной насыщеностью)
      ctx.fillRect(currentX, currentY, BAR_WIDTH, rightBarHeight);

    }
  };
})();
