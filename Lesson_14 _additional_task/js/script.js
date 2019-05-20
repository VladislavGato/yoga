// 4) Написать обработчик события, не позволяющий скриптам выполняться до загрузки страницы
// 5) Написать функцию, что при клике на “Выбрать тур” , “Получить консультацию” или “Расписание туров” (все 3 элемента) подложка (класс overlay) медленно появлялась на странице (через прозрачность), а само модальное окно (класс modal) плавно выезжало сверху
// 6) Написать функцию, что при клике на крестик всё происходило бы наоборот: подложка исчезала, модальное окно уезжало вверх

////////////////        усложненное 

// 1) Написать анимацию появления модального окна через animate, используя не менее 2х параметров
// 2) Реализовать асинхронную отправку формы, средствами JQuery
// ·        PHP файл можно взять из лэндинга

$(document).ready(function() {

	// вешаем обработчик событий на кнопки (Выбрать тур), (Получить консультацию), (расписания туров)
	// появляется модальное окно и overlay
	$('.main_btna, .main_btn, .col-sm-7 a:eq(1)').on('click', function() {
		// $('.modal').slideDown();
		$('.modal').animate(
			{
				display: 'block',
				height: 'show',
				width: 'show',
				opacity: 0.8,
			}, 500
		);
		$('.overlay').fadeIn();
	});

	// закрывает модальное окно и overlay при нажатии на крестик или overlay
	$('.modal button:eq(0), .overlay').on('click', function() {
		$('.modal').slideUp();
		$('.overlay').fadeOut();
	});





	/////////////////////////////////////////////////////


	$.ajax({
		type: "POST",
		url: 'server.php',
		success: function(){
		  console.log('Load was performed.');
		}





	});


	

	// $('.contactform_name');
	// $('.contactform_phone');
	// $('.contactform_mail');

	
	$(body).on('submit', (e) => {
		let target = e.target; 
        e.preventDefault();
		sendForm(target);
		



	});

	let sendForm = (e) => {
            let formData = new FormData(e); // помещаем сюда всё то что ответил пользователь (пара ключ: значение)
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
 
    };


























});






















