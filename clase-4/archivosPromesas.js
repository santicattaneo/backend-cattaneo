const fs = require('fs');
const archivosAsincronos = async () => {
    try {
        await fs.promises.writeFile('./promesas.txt', 'Hola mundo!');
        let resultado = await fs.promises.readFile('./promesas.txt', 'utf-8');
        console.log('Contenido: ', resultado);
        await fs.promises.appendFile('./promesas.txt', '\nContenido adicional');
        resultado = await fs.promises.readFile('./promesas.txt', 'utf-8');
        console.log('Contenido modificado:', resultado);
        await fs.promises.unlink('./promesas.txt');
    } catch (error) {
        console.log('Error:',error)
    };
};
archivosAsincronos();