/////////////////////////////////////////// инкапсуляция 

// function User(name, age) {
//     this.name = name;
//     // this.age = age;

//     // 
//     let userAge = age; // безопасная переменная

//     this.say = function() {
//         console.log(`Имя пользователя ${this.name}, возраст: ${userAge}`);
//     };

//     // для безопасного получения данных используем метод геттер и сеттери             ! ! ! ! ! !
//     this.getAge = function() {  // получение возрастаст и передаем
//         return userAge;
//     }
//     // для безопасного bpvtytybz данных используем метод  сеттер                 ! ! ! ! ! !
//     this.setAge = function(age) {  // поменяем значение
//         if (typeof age === 'number' && age > 0 && age < 110) {
//             userAge = age;
//         } else {
//             console.log("Недопустимое значение");
//         }
//     }
// }

// let ivan = new User('Ivan', 25);
// console.log(ivan.name);
// console.log(ivan.userAge);
// console.log(ivan.getAge());
// ivan.setAge(30);
// console.log(ivan.getAge());
// ivan.say();


////////////////////////////////////////////////   МОДУЛИ

// //   1)   анонимная самовызывающаяся функция(самый известный способ создавания модулей) 
// // (приватный метод, скрытый снаружи)
// let number = 1; // глобальная переменная

// // анонимная самовызывающаяся функция
// // она создаёт свою уникальную область видимости, которая не пересекается с глобальной
// (function() {
//     let number = 2;
//     console.log(number);

//     return console.log(number + 3);
// }())

// console.log(number); // 2  /   5   /  1



// //  2)   использование объектного интерфейся (приватный метод, скрытый снаружи)
// // мы наш модуль записываем в переменную и в нём возвращаем методы, которые будут доступны снаружи
// let user = (function() {
//     let private = function() {   // приватный метод. срытая часть которую нельзя получить
//         console.log('I am privat')
//     }

//     return {  
//         sayHello : function() {     
//             console.log('Hello!')
//         }
//     }
// }())

// console.log(user); // { sayHello: [Function: sayHello] } мы не видим что находится в функции, мы добились ИНКАПСУЛЯЦИИ
// console.log(user.sayHello()); // Hello!   /    undefined



// //   3) 

// let user = (function() {
//     let private = function() {   // приватный метод. срытая часть которую нельзя получить
//         console.log('I am privat')
//     }

//     let sayHello = function() {  //   приватный метод.
//         console.log('Hello!')
//     }
//     return {  // создаю объект и
//         sayHello : sayHello   
        
//     }
// }())

// console.log(user); // { sayHello: [Function: sayHello] } мы не видим что находится в функции, мы добились ИНКАПСУЛЯЦИИ
// console.log(user.sayHello()); // Hello!   /    undefined




