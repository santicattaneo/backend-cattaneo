import fs from 'fs';
import crypto from 'crypto';

export default class UserManager {
    constructor(path) {
        this.path = path;
    };
    getUsers = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const users = JSON.parse(data);
                return users;
            } else{
                return [];
            };
        } catch (error) {
            console.log('Error:',error);
        };
    };
    createUser = async (usuario) => {
        try {
            const users = await this.getUsers();
            if (users.length === 0) {
                usuario.id = 1;
            } else{
                usuario.id = users[users.length - 1].id + 1;
            };
            usuario.salt = crypto.randomBytes(128).toString('base64');
            usuario.contrasena = crypto.createHmac('sha256', usuario.salt).update(usuario.contrasena).digest('hex');
            users.push(usuario);
            await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'));
            return usuario;
        } catch (error) {
            console.log('Error:', error)
        };
    };
    validateUser = async (username, password) => {
        try {
            const users = await this.getUsers();
            const userIndex = users.findIndex((user) => user.usuario === username);
            if (userIndex === -1) {
                console.log('usuario no encontrado');
                return;
            };
            const user = users[userIndex];
            const newHash = crypto.createHmac('sha256', user.salt).update(password).digest('hex');
            if (newHash === user.contrasena) {
                console.log('ususario logeado');
            } else {
                console.log('constraseña incorrecta')
            };
        } catch (error) {
            console.log(error);
        };
    };
};