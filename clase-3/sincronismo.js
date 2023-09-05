const delay = () => {
    for (let i =0; i<1e9; i++);
}
function hacerTarea(num) {
    console.log('Haciendo tarea: ', num);
    delay();
};

//tareas sincronicas
//console.log('Iniciando tareas...');
//hacerTarea(1);
//hacerTarea(2);
//hacerTarea(3);
//hacerTarea(4);
//console.log('Fin de tareas');

//tareas asincronicas
console.log('Iniciando tareas...');
setTimeout(() => {
    console.log('Tarea asincronica')
}, 5000);
hacerTarea(1);
hacerTarea(2);
console.log('Fin de tareas');