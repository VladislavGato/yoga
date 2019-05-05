// для глобального объекта есть 2 события
// load - говорю нашему js что сейчас наша страница будет загружаться. И после того как загрузится ВСЁ, 
// только тогда наш js код будет выполнятся
// DOMContentLoaded - событие сработает только тогда загрузилась структура нашего DOM дерева

window.addEventListener('DOMContentLoaded', function() {
    // именно сюда помещаем весь код со страницы
    'use strict'; // переведем весь наш код в строгий режим
    // Написать рабочие табы - это чтобы на странице показывался только 1 рабочий блок, остальные скрыты
    // и при переключении между вкладкакми они должны показываться

    let info = document.querySelector('.info-header'), // родитель табов
        tab = document.querySelectorAll('.info-header-tab'), // табы 
        // если получаем при помощи классов или тэгов то ставьте индекс элемента в конце
        tabContent = document.querySelectorAll('.info-tabcontent'); //сам контент

    // функция которая скрывает все наши таб конттенты
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');// удалим у них класс show, и чтобы полностью скрыть 
            tabContent[i].classList.add('hide'); //  элементы со страницы, добавлю класс hide
        }
    }
    hideTabContent(1); // скрывает все кроме самого первого( с индексо 0)

    // функция которая показывает определенный таб контент
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');// удалим у них класс hide, и чтобы полностью показать 
            tabContent[b].classList.add('show'); //  элемент , добавлю класс show
        }
    }
    // делегирование события от родителя
    info.addEventListener('click', function(event) {
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
  
    // Timer/.
    let deadLine = '2019-06-03'; //наш дэдлайн, по какое время
    
    // функция получает все данные о времени
    function getTimeRemaining(endtime) { // передаем внутрь наш дедлайн
        //Date.parse() превращает любую дату в количество милисекунд с 1970г
        //new Date() дата которая сейчас, в данный момент, когда пользователь зашел на сайт
        let t = Date.parse(endtime) - Date.parse(new Date());
        
        if (t > 0) {
            //сюда помещаем разницу между датами в милисек.
            // с помощью Math.floor() получаем только целые числа;
            // (t/1000)%60 вычленяем количество минут и берем остаток - секунды
            let seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),// t/1000/60)%60 вычленяем количество часов и берем остаток - минуты
            hours = Math.floor((t / (1000*60*60)));
            // hours = Math.floor((t/1000/60/60) % 24);
            // days =  Math.floor(t / (1000*60*60*24));
					
            return { // создаем объект и возвращаем его обратно в updateClock
                'total' : t, // кол-во милисек. разница
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
        } else {
            return { 
                'total' : '0', // 
                'hours' : '0',
                'minutes' : '0',
                'seconds' : '0'
            }; 
        }
        
        
        
    }

    // функция превращает статическую верстку в динамическую, чтобы вставлять все эти значения в верстку
    // устанавливает наши часы
    //id - находим элемент где будем устанавливать
    //endtime - дедлайн который мы будем устанавливать
    function setClock(id, endtime) { //id - находим элемент где будем устанавливать по id элемента 
        // создаем переменные беря элементы со страницы
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);// интервал, каждую секунду запуск функции updateClock

        // функция которая будет обновлять наши часы каждую секунду
        //получает разницу между временем
        function updateClock() {
            let t = getTimeRemaining(endtime); // передаем дедлайн endtime

            function finalDateFunc() { //подставлять 0 перед значениями, которые состоят из одной цифры
                let finalDateFunc = {};
                for (let i in t) {
                    finalDateFunc[i] = ( (parseInt(t[i]) < 10 ) ? ('0'+t[i]) : (t[i]) );
                }
                return finalDateFunc;
            }
            let finalDate = finalDateFunc();

            // из полученных данных мы записываем эти данные прямо в верстку:
            hours.textContent = finalDate.hours;
            minutes.textContent = finalDate.minutes;
            seconds.textContent = finalDate.seconds;

            if (finalDate.total <= 0) { //как только разница дойдет до нуля
                clearInterval(timeInterval); //остановим интервал таймер
            }
        }
    }
    setClock('timer', deadLine);

    ////////////////////////////////////////////////////////////////////////////
    // плавная анимация
    // достаем все якоря 
    let anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
        
            let blockID = anchor.getAttribute('href');
        
            document.querySelector('' + blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    //////////////////////////////////////////////////////////////////////////////
    
    // Modal ( наше модальное окно)

    let more = document.querySelector('.more'), // кнопка на которую будем кликать
        overlay = document.querySelector('.overlay'), // наше модальное окно
        close = document.querySelector('.popup-close'), // крестик чтобы закрыть
        content = document.querySelector('.content');
    let body = document.querySelector('body');
    // на кнопку more навешиваем обработчик событий click
    // при клике наш overlay должен менять свои стили и он применяет блочную модель
    // при клике на кнопку будет воспроизводится анимация которая будет применена для этой кнопки
    // при клике на кнопку установим CSS правило для document
    //      мы запретим прокрутку страницы как только у нас откроется модальное окно
    // more.addEventListener('click', function() {
    //     overlay.style.display = 'block';
    //     this.classList.add('more-splash'); // добавляем в more новый класс для анимации
    //     document.body.style.overflow = 'hidden';// запретим прокрутку страницы при открытии модального окна
    // });
    // // клик на крестик
    // close.addEventListener('click', function() {
    //     overlay.style.display = 'none'; // стили меняем с блока на none 
    //     more.classList.remove('more-splash'); //убираем класс из more
    //     document.body.style.overflow = ''; // снова можем двигать страницей
    // });

    //Привязать модальное окно к кнопкам “Узнать подробнее” в табах. Код не должен дублироваться.
    // content.addEventListener('click', function(event) {
    //     let target = event.target;
    //     if ( (target && target.classList.contains('description-btn')) || 
    //         (target && target.classList.contains('more')) ) { //если то куда нажали имеет класс Х, то

    //         overlay.style.display = 'block';
    //         this.classList.add('more-splash'); // добавляем в more новый класс
    //         document.body.style.overflow = 'hidden';      
    //         // console.log('Модальное окно работает');
    //     }
    // });
    // close.addEventListener('click', function() {
    //     overlay.style.display = 'none'; // стили меняем с блока на none 
    //     more.classList.remove('more-splash'); //убираем класс из more
    //     document.body.style.overflow = '';
    // });

    // body.addEventListener('click', function(event) {
    //     let target = event.target;
    //     if ( (target.classList.contains('description-btn')) || 
    //         (target.classList.contains('more')) ) { //если то куда нажали имеет класс Х, то
    //         overlay.style.display = 'block';
    //         this.classList.add('more-splash'); // добавляем в more новый класс для анимации
    //         document.body.style.overflow = 'hidden';// запретим прокрутку страницы при открытии модального окна
    //     }
    //     if (target.classList.contains('popup-close')) {
    //         overlay.style.display = 'none'; // стили меняем с блока на none 
    //         more.classList.remove('more-splash'); //убираем класс анимации из more 
    //         document.body.style.overflow = ''; // снова можем двигать страницей
    //     }        
    // });

    //функция для всех кнопок УЗНАТЬ ПОДРОБНЕЕ в табах и для УЗНАТЬ БОЛЬШЕ
    let bindModal = ( btn, overlayStatus, overflowStatus ) => {
        overlay.style.display = overlayStatus; //стили для overlay (блока/none) 
        btn.classList.add('more-splash');//добавляем в more новый класс для анимации
        document.body.style.overflow = overflowStatus;//прокрутку страницы при открытии модального окна (hiden / '')
        setTimeout(() => { // уберем из more класс для анимации через 1.5 сек
            btn.classList.remove('more-splash');
        }, 1500);
    };

    //событие при клике
    document.body.addEventListener('click', e => {
        let target = e.target;

        //если то на что кликнули имеет класс .more или .description-btn, то вызывается функция bindModal и передается в неё:
        (target.classList.contains('more') || target.classList.contains('description-btn') ) ? bindModal(target, 'block', 'hidden') : '';
        (target.classList.contains('popup-close')) ? bindModal(target, 'none', '') : '';
    });



























});