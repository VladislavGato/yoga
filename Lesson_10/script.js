
// Используя синтаксис ES6 в отдельном документе:
// · Создать класс options
class Options {
    // · Он должен содержать свойства: height, width, bg, fontSize, textAlign
    constructor(heigh, width, bg, fontSize, textAlign) {
        this.heigh = heigh;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    // · Он должен содержать метод, создающий новый div на странице, записывающий в него
    //       любой текст и при помощи cssText изменять свой стиль из переданных параметров
    createDiv() {

        let body = document.querySelector('body');
        let div = document.createElement('div');

        div.style.cssText = `
            heigh: ${this.heigh}px;
            width: ${this.width}px;
            background-color: ${this.bg};
            font-size: ${this.fontSize}px;
            text-align: ${this.textAlign};
            `;

        body.appendChild(div);
        div.innerHTML = "Любой текст";

    }
}

// · Создать новый объект через класс
let divIn = new Options(150, 150, "red", 25, "center");

// · Вызвать его метод и получить элемент на странице
divIn.createDiv();







