process.on('exit', code => {
    console.log(code);
});

process.on('uncaughtException', error => {
    console.log('Excepcion no contralada: ', error);
});

process.on('message');

console.log('probando listeners'); //code 0
console.log(variable); //code 1