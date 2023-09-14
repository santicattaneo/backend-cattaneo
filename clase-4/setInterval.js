const contador = () => {
    let contador = 1;
    const timer = setInterval(() => {
        console.log('Contador:', contador);
        contador++;
        if (contador > 5) {
            console.log('Fin del contador')
            clearInterval(timer)
        };
    }, 1000);
};
console.log('Inicio del contador');
contador();