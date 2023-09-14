const fs = require('fs');

//implementacion sincronica
//creamos el archivo
fs.writeFileSync('./ejemplo.txt', 'Hola mundo!');
if (fs.existsSync('./ejemplo.txt')) {
    //obtenemos el contenido
    let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8');
    console.log('Contenido:',contenido);
    //agregamos contenido
    fs.appendFileSync('./ejemplo.txt', '\nContenido adicional');
    contenido = fs.readFileSync('./ejemplo.txt', 'utf-8');
    console.log('Contenido actualizado:',contenido);
    //eliminamos el archivo
    fs.unlinkSync('./ejemplo.txt');
};