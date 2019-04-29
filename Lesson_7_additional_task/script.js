let box = document.getElementById('box'),
    startTime = null,
    btn = document.querySelector('.btn'), // кнопка
    endPos = 500, // в пикселях
    duration = 2000; // в миллисекундах
    
function render(time) {
    if (time === undefined) {
        time = new Date().getTime();
    }
  
    if (startTime === null) {
        startTime = time;
    }

    box.style.left = ((time - startTime) / duration * endPos % endPos) + 'px';
}

btn.addEventListener('click', function() {
    (function animation() {
        render();
        requestAnimationFrame(animation, box);
    }) ();
})