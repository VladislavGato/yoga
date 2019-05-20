
// модуль
function myModule() {  // создадим функцию конструктор
    this.hello = function() {
        return 'Hello!';
    }

    this.goodbye = function() {
        return 'goodbye!';
    }
}

module.exports = myModule; // пишем без скобок, так как мы его не вызываем, а экспортируем
// 



























