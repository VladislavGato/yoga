window.addEventListener('DOMContentLoaded', () => {

    'use strict'; // переведем весь наш код в строгий режим

    // ТАБЫ 

    let info = document.querySelector('.info-header'), // родитель табов
        tab = document.querySelectorAll('.info-header-tab'), // табы 
        tabContent = document.querySelectorAll('.info-tabcontent'); //сам контент

    // функция которая скрывает все наши таб конттенты
    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');// удалим у них класс show, и чтобы полностью скрыть 
            tabContent[i].classList.add('hide'); //  элементы со страницы, добавлю класс hide
        }
    };
    hideTabContent(1); // скрывает все кроме самого первого( с индексом 0)

    // функция которая показывает определенный таб контент
    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');// удалим у них класс hide, и чтобы полностью показать 
            tabContent[b].classList.add('show'); //  элемент , добавлю класс show
        }
    };

    // делегирование события от родителя
    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) { //если то куда нажали имеет класс Х, то
            for (let i = 0; i < tab.length; i++) { // перебираем все 
                if (target == tab[i]) { // и сравниваем с нажатым, если это он, то
                    hideTabContent(0); // cкрывает абсолютно все таб контенты
                    showTabContent(i); // показывает нужный таб контент
                    break; // завершаем цикл
                }
            } 
        }
    });
  

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



});