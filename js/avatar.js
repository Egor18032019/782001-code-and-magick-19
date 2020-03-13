//  загрузка фото пользователя на аватарку -> без сервера
'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  fileChooser.addEventListener('change', function () {
    // ограничиваем на всякий случай, тем что берем только первый элемент
    var file = fileChooser.files[0];
    // переписываем имя файла маленькими буквами
    var fileName = file.name.toLowerCase();
    // если в массиве FILE_TYPES текущий обрабатываемый элемент массива содержиться в конце fileName то возвратит true
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      // а где находится reader и как мы на него  вешаем обработичик на загрузку
      // если мы где то еще воспользуемся Filereader и на него также повесим обработчик событий
      // не будут ли они пересекаться ?
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
