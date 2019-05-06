
// Используя синтаксис ES6 в отдельном документе:
// · Создать класс options
class Options {
    // · Он должен содержать свойства: height, width, bg, fontSize, textAlign
    constructor(heigh = 150, width = 150, bg = "red",
                fontSize = 25, textAlign = "center") {
        this.heigh = heigh;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    // · Он должен содержать метод, создающий новый div на странице, записывающий в него
    //       любой текст и при помощи cssText изменять свой стиль из переданных параметров
    createDiv(text) {

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
        div.innerHTML = text;

    }
}

// · Создать новый объект через класс
// let divIn = new Options(150, 150, "red", 25, "center");
let divIn = new Options(300, 400);


// · Вызвать его метод и получить элемент на странице
// divIn.createDiv();
divIn.createDiv('Любой текст');








