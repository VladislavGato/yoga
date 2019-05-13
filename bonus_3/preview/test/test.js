// простенькая функция которая будет возвращать строку
function sayName(name) {
    let message = "My name is " + name;
    return message;
}
// тест для её проверки



// функция которая будет возвращать сумму всех чисел массива
let arr = [5, -3, 6, -5, 0, -7, 8, 9];
let result = arr.reduce(function(sum, elem) {
    return sum + elem;
});

// подключаем стиль assert
let assert = require('chai').assert;

describe("sayName", function() {
    it("Получаем фразу с новым именем", function() {
        assert.typeOf(sayName("Ivan"), 'string'); // проверяем действительно ли наша функция с параметром Ivan возвращает строку
    });
});

describe("arr", function() {
    it("Получаем сумму чисел массива ", function() {
        assert.equal(result, 13); // проверяем соответствие на значение/ тест пройдёт только в том случае когда переменная result будет равна 13
    });
});



