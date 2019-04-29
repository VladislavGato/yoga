let body = document.querySelector('body');
let divTime = document.getElementsByClassName('time')[0];

function timer() {
    let time = new Date();
    let dataTime = {
        hour: time.getHours(), // Возвращает часы (0-23)
        minute: time.getMinutes(),// Возвращает минуты (0-59)
        second: time.getSeconds()// Возвращает секунды (0-59)
    };
       
    function finalDateFunc() {
        let finalDateFunc = {};
        for (let i in dataTime) {
            finalDateFunc[i] = ( (parseInt(dataTime[i]) < 10 ) ? ('0'+dataTime[i]) : (dataTime[i]) );
        }
        return finalDateFunc;
        // console.log(finalDate);
    }
    let finalDate = finalDateFunc();
    console.log(finalDate);
    /// совмещаем всё в 1 строку
    let dateString = finalDate.hour + ':' + finalDate.minute + ':' + 
        finalDate.second ;
    // console.log(dateString);
    divTime.innerText = dateString;
}

let showTime = setInterval(timer, 1000); // запускает функцию в интервале через каждую секунду
// clearTimeout(timeId); // останавливает выполнение setTimeout