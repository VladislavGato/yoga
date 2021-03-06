// Написать функцию которая принимает массив целых чисел, необходимо отсортировать массив по частоте элементов.
// Самые частые идут первыми.
// Если будет группа чисел одинакового размера то они сортируются в порядке соответствующих номеров во входном массиве
// func([2,3,2,4,5,12,2,3,3,3,12])
// результат -> [3,3,3,3,2,2,2,12,12,4,5]
'use strict';

function func(arr) {
    let m = arr;
    console.log(m);

    let count = m.length;
    console.log(count);

    //создаем вспомогательный массив mysort
    //и в нем считаем сколько каждое число встречается в исходном массиве
    //то есть в итоге получим mysort[1]=1, mysort[2]=2, mysort[4]=1, mysort[6]=1 и тд
    let mysort = {};
    for (let i = 0; i < count; i++) {
        let k = m[i];
        if (mysort[k] === undefined) {
           mysort[k] = 1;
        } else {
           mysort[k]++;
        }
    }
    console.log(mysort);
    
    let n = [];
    //cчитаем сколько значимых элементов в этом массиве
    count = 0;
    for (let item in mysort) {count++;}
    console.log(count);

    //перебираем массив столько раз сколько в нём элементов
    for (let i2 = 0; i2 < count; i2++) {
        let maxcount = 0;
        let digit = 0;

        //в цикле находим элемент с максимальным значением
        for (let item in mysort) {
            if (Number(mysort[item]) > maxcount) {
                //в maxcount пишем текущее максимальное значение
                //в digit индекс элемента с этим значением
                digit = Number(item);
                maxcount = Number(mysort[item]);
            } else {
                //если значения одинаковы то в приоритете элемент с меньшим индексом
                if (mysort[item] == maxcount) {
                    if (Number(item) < Number(digit)) {
                        digit = Number(item);
                    }
                }
            }
         }
          //после того как нашли нужный элемент
          //удаляем его из массива mysort
          //и записываем в массив n число digit столько раз сколько значение maxcount
          delete mysort[digit];
          for (let i = 0; i < maxcount; i++) {
            n.push(digit);
          }
    }
    console.log(n);
}
func([2,3,2,4,5,12,2,3,3,3,12]);


// Только цикл можно было не городить. Это избавит код от лишней нагрузки,
//  как от самого цикла, так и от обработчика на каждый элемент.