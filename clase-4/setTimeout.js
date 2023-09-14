const temporizador = (callback) => {
    setTimeout(() => {
        callback();
    }, 5000);
};
const operacion = () => console.log('Fin de tareas');
temporizador(operacion);
console.log('Realizando tareas');