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

});