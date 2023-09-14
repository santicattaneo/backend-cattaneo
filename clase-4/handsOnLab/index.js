//CONSIGNA
//crear clase que permita gestionar usuarios con filesystem y promesas
//metodo crear usuario recibe objeto con los campos: nombre, apellido, edad y curso (debe guardarlo como un array de objetos en un JSON)
//metodo consultar usuarios debe poder leer este JSON y devolver el array de usuarios.

const { UserManager } = require('./manager/UserManager.js');
const manager = new UserManager('./files/Usuarios.json');
const env = async () => {
    const usuarios = await manager.getUsers();
    console.log(usuarios);
    const user = {
        nombre: 'Santiago',
        apellido: 'Cattaneo',
        edad: 21,
        curso: 'Backend'
    }
    await manager.createUser(user);
    const usuariosAgg = await manager.getUsers();
    console.log(usuariosAgg);
};
env();