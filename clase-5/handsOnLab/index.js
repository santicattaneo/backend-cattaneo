import UserManager from "./managers/UserManager.js";

const manager = new UserManager('./files/Usuarios.json');
const env = async () => {
    // const usuarios = await manager.getUsers();
    // console.log(usuarios);
    // const user = {
    //     nombre: 'Santiago',
    //     apellido: 'Cattaneo',
    //     usuario: 'scattaneo',
    //     contrasena: '1234'
    // }
    // await manager.createUser(user);
    await manager.validateUser('scattaneo', '1234')
};

env();