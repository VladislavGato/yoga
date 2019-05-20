window.addEventListener('DOMContentLoaded', () => {

    'use strict'; // переведем весь наш код в строгий режим

    // ТАБЫ 
    let tabs = require('./parts/tabs.js');
  

    tabs();



    ////////////////////////////////////////////////////////////////////////
    // Timer
    let deadLine = '2019-06-03'; //наш дэдлайн, по какое время
    
    // функция получает все данные о времени
    let getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date());

        let seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t / (1000*60*60)));

        return {
            'total' : (t > 0) ? t : '0',
            'hours' : (t > 0) ? hours : '0',
            'minutes' : (t > 0) ? minutes : '0',
            'seconds' : (t > 0) ? seconds : '0'
        };    
    };

    // устанавливает наши часы
    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
        // функция которая будет обновлять наши часы каждую секунду
        //получает разницу между временем
            updateClock = () => {
                let t = getTimeRemaining(endtime);
                //подставлять 0 перед значениями, которые состоят из одной цифры
                let finalDateFunc = () => { 
                    let finalDateFunc = {};
                    for (let i in t) {
                        finalDateFunc[i] = ( (parseInt(t[i]) < 10 ) ? ('0'+t[i]) : (t[i]) );
                    }
                    return finalDateFunc;
                };
                
                let finalDate = finalDateFunc();

                // из полученных данных мы записываем эти данные прямо в верстку:
                hours.textContent = finalDate.hours;
                minutes.textContent = finalDate.minutes;
                seconds.textContent = finalDate.seconds;

                //как только разница дойдет до нуля остановим интервал таймер
                (finalDate.total <= 0) ? (clearInterval(timeInterval)) : '';
            },
            timeInterval = setInterval(updateClock, 1000);// интервал, каждую секунду запуск функции updateClock 
    };
    setClock('timer', deadLine );

    ////////////////////////////////////////////////////////////////////////
    // плавная анимация
    // достаем все якоря 
    let anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
        
            let blockID = anchor.getAttribute('href');
        
            document.querySelector(` ${blockID}`).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    /////////////////////////////////////////////////////////////////////////
    
    // Modal ( наше модальное окно)

    let overlay = document.querySelector('.overlay');
        // more = document.querySelector('.more'),
        // close = document.querySelector('.popup-close'),
        // content = document.querySelector('.content');
        // body = document.querySelector('body');

    //функция для всех кнопок УЗНАТЬ ПОДРОБНЕЕ в табах и для УЗНАТЬ БОЛЬШЕ
    let bindModal = ( btn, overlayStatus, overflowStatus ) => {
        overlay.style.display = overlayStatus;
        btn.classList.add('more-splash');
        document.body.style.overflow = overflowStatus;
        setTimeout(() => {
            btn.classList.remove('more-splash');
        }, 1500);
    };

    //событие при клике
    document.body.addEventListener('click', (e) => {
        let target = e.target;
        (target.classList.contains('more') || target.classList.contains('description-btn')) ? bindModal(target, 'block', 'hidden') : '';
        (target.classList.contains('popup-close')) ? bindModal(target, 'none', '') : '';
    });



    /////////////////////////////////////////////////////////////////////////


    // // FORM с промисами

    // объект с сообщениями, с различными состояниями нашего запроса
    let message = {
        loading: 'Загрузка...', // будет показываться пользователю когда наш запрос ещё не обработался
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...' //если сервер не отвечает
    };

    //
    let form = document.getElementsByClassName('main-form')[0], // форма в модальном окне
        formBottom = document.getElementById('form'), // контактная форма
        input = document.getElementsByTagName('input'),  // все input'ы        
        // создадим новый div на странице
        statusMessage = document.createElement('div');
        // добавим к переменной класс
        statusMessage.classList.add('status');
    ///// запрос на сервер
    // в любой форме для отправки данных необходимо чтобы был (button)  или  (input type=submit)


    // событие формы
    let sendForm = (elem) => {
        // elem.addEventListener('submit', function(e) { // для 1 варианта вызова
            // e.preventDefault();  // для 1 варианта вызова
            elem.appendChild(statusMessage);
            let formData = new FormData(elem); // помещаем сюда всё то что ответил пользователь (пара ключ: значение)
            // создаем новый объект в который мы поместим все эти данные

            function postData(data) {
                return new Promise(function(resolve, reject) {
                    // сам запрос
                    let request = new XMLHttpRequest(); // запрос
                    request.open('POST', 'server.php'); // POST - для отправки введенных пользователем данных / URL нашего сервера
                    // заголовок запроса. вариант для JSON файлов , а не обычная форма
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    // получить данные которые ввел пользователь

                    // для того чтобы наблюдать за изменениями состояния нашего запроса
                    request.addEventListener('readystatechange', () => {
                        if (request.readyState < 4) { // наш запрос грузится если сервер будет долго отвечать 
                            resolve(); // 'Загрузка...' это если сервер немножко тупит
                        } else if (request.readyState == 4 && request.status == 200) { // если всё прошло успешно и сервер ответил 200-ым кодом и наш запрос уже в 4-ом состоянии
                            resolve(); // 'Спасибо! Скоро мы с вами свяжемся!' 
                        } else {
                            reject(); // ''Что-то пошло не так...'                 
                        }
                    });

                    ////////// вариант для JSON 
                    let obj = {}; // 
                    data.forEach(function(value, key) { // берем все данные из formData и помещаем в obj
                        obj[key] = value;
                    });
                    // превращаем обычные JS объекты в JSON формат
                    let json = JSON.stringify(obj); // получаем переменную со всеми данными в формате JSON, его мы и отправляем на сервер
                    request.send(json); // отправляет запрос на сервер
                })                
            }

            let clearInput = () => { // чтобы автоматически очищалось поле инпута
                for (let i = 0; i < input.length; i++) {
                    input[i].value = ''; // возмем каждый инпут тот что есть в форме, у каждого инпута возмем value и превратим в пустую строку
                }
            };

            postData(formData)
                .then( ()=> statusMessage.innerHTML = message.loading)
                .then( ()=> statusMessage.innerHTML = message.success)
                .catch( ()=> statusMessage.innerHTML = message.failure)
                .then(clearInput)
 
        // }); // для 1 варианта вызова
    };

    // можно вызвать так(1 вариант):
    // sendForm(form);
    // sendForm(formBottom);

    // или так:
    // // надо вешать НА ФОРМУ,  НЕ НА КНОПКУ.  Следим чтобы форма отправлялась
    document.body.addEventListener('submit', (event) => {  // submit - всегда отправка  СРАБАТЫВАЕТ ТОЛЬКО НА ФОРМАХ
        let target = event.target; // event. где произошло событие
        event.preventDefault(); // чтобы не перезагружалась страница отменим стандартное поведение

        sendForm(target);

        // console.log(target);
    });


    
    // // валидация input в поле телефона
    // document.body.addEventListener('input', e => {
    //     if (e.target.getAttribute('type') === 'tel') {
    //         e.target.value = '+' + e.target.value.replace(/[^\d]/g, '').slice(0, 11);
    //         if (e.target.value.length == 1) e.target.value = '';
    //     }
    // });


    //////////////////////////////////////////////////////////////

    ///////    СЛАЙДЕР      Slider


    //переменная которая отвечает за то, какой слайд показывается
    let slideIndex = 1,

    // сами слайды. получаем все слайды
        slides = document.querySelectorAll('.slider-item'),
    // элементы навигации, стрелочки ВПЕРЕД и НАЗАД
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
    // взаимодействие с нашими точками. получаем обертку точек и сами точки
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    //

    let showSlides = (n) => {
   
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }
 
        slides.forEach((item) => item.style.display = 'none');     
        // //     ! старый аналогичный способ !
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }


        // удаляем класс dot-active
        dots.forEach((item) => item.classList.remove('dot-active')); 

        // покажем тот слайд который нам нужен

        slides[slideIndex - 1].style.display = 'block';

        // добавляем класс dot-active
        dots[slideIndex - 1].classList.add('dot-active');
    };

    showSlides(slideIndex); 

    // функция которая увеличивает наш параметр slideIndex
    let plusSlides = (n) => {
        showSlides(slideIndex += n);
    }

    // функция которая определяет текущий слайд и устанавливает его
    let currentSlide = (n) => {
        showSlides(slideIndex = n);
    }

    // кнопки стрелочка назад и стрелочка вперед
    prev.addEventListener('click', () => {
        plusSlides(-1);
    });
    next.addEventListener('click', () => {
        plusSlides(1);
    });

    // реализуем точки
    dotsWrap.addEventListener('click', (event) => {

        for (let i = 0; i < dots.length + 1; i++) {

            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }      
    });

    /////////////////////////////////////////////////////////////////////

    // Calc      КАЛЬКУЛЯТОР

    // получим два инпута; базу на которой будут отдыхать;
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),

        totalValue = document.getElementById('total'), //общую сумму поездки
        
        personsSum = 0, // количество людей
        daysSum = 0, // на сколько дней
        total = 0; // итоговое значение общей суммы

    // запишем 0 в общую сумму на странице
    totalValue.innerHTML = 0;
    // totalValue.textContent = 0; // можно и так
    
    // отслеживаем то что ввел пользователь
    // можно использовать input(ввод) или change(изменение)

    // НЕЛЬЗЯ ИСПОЛЬЗОВАТЬ СТРЕЛОЧНЫЕ ФУНУКЦИИ, потому что 
    //  используем контекст вызова this 
    // persons.addEventListener('input', function() {
    //     // в переменную personsSum запишем то что ввели в input persons
    //     // при помощи this мы можем получить тот элемент с которым
    //     //  мы общаемся, на котором протсходит событие change
    //     personsSum = +this.value; // значение persons
    //     total = (daysSum + personsSum)*4000;
    //     // если другое поле пустое, то мы ничего показывать не будем
    //     if(restDays.value == '') {
    //         totalValue.innerHTML = 0;
    //     } else {
    //         totalValue.innerHTML = total;
    //     }
    // });

    // restDays.addEventListener('input', function() {
    //     // в переменную personsSum запишем то что ввели в input persons
    //     // при помощи this мы можем получить тот элемент с которым
    //     //  мы общаемся, на котором протсходит событие change
    //     daysSum = +this.value; // значение persons
    //     total = (daysSum + personsSum)*4000;
    //     // если другое поле пустое, то мы ничего показывать не будем
    //     if(persons.value == '') {
    //         totalValue.innerHTML = 0;
    //     } else {
    //         totalValue.innerHTML = total;
    //     }
    // });

    // срабатывает только когда оба инпута заполненны
    // place.addEventListener('change', function() {
    //     if (restDays.value == '' || persons.value == '' || restDays.value == '0' || persons.value == '0') {
    //         totalValue.innerHTML = 0;
    //     } else {
    //         let a = total;
    //         // обращаемся к тому элементу options который мы сейчас задействуем
    //         // через [] обращаемся к тому элементу который был выбран
    //         // и получим его value 
    //         totalValue.innerHTML = a * this.options[this.selectedIndex].value; 
    //     }
    // });

    // document.body.addEventListener('input', e => {
    //     if (e.target.getAttribute('type') === 'number') {
    //         e.target.value = e.target.value.replace(/[^\d]/g, '');
    //         if (e.target.value.length == 0) e.target.value = '';
    //     }
    // });
    
    

    //валидация input в поле телефона и калькулятор
    document.body.addEventListener('input', e => {
        if (e.target.getAttribute('type') === 'tel') {
            e.target.value = '+' + e.target.value.replace(/[^\d]/g, '').slice(0, 11);
            if (e.target.value.length == 1) e.target.value = '';
        }

        if (e.target.classList == 'counter-block-input') {
            e.target.value = e.target.value.replace(/(^[0]{1})/, '');
        }

        personsSum = +persons.value;
        daysSum = +restDays.value;

        total = (daysSum + personsSum) * 4000;

        if (restDays.value === '' || persons.value === '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * place.options[place.selectedIndex].value;
        }
    });

    



 

});














