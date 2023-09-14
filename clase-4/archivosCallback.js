const fs = require('fs')
fs.writeFile(
    './callback.txt',
    'Hola mundo!',
    error => { 
        if(error) {
            throw new Error('Error en la creacion del archivo:', error)
        };
        fs.readFile(
            './callback.txt', 
            'utf-8',
            (error, contenido) => {
                if(error) {
                    throw new Error('Error en la lectura del archivo:', error)
                }; 
                console.log(contenido);
                fs.appendFile(
                    '/callback.txt',
                    '\nContenido adicional',
                    error => {
                        if (error) {
                            throw new Error('Error en la actualizacion del archivo:', error);
                        };
                        fs.readFile(
                            './callback.txt',
                            'utf-8',
                            (error, contenido) => {
                                if (error) {
                                    throw new Error('Error en la lectura del archivo:',error);
                                };
                                console.log(contenido);
                                fs.unlink('./callback.txt', error => {
                                    if (error) {
                                        throw new Error('Error en la eliminacion del archivo:',error);
                                    };
                                });
                            });
                    });
            });
    });