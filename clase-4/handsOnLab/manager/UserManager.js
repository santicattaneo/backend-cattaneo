const fs = require('fs');

class UserManager {
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
            users.push(usuario);
            await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'));
            return usuario;
        } catch (error) {
            console.log('Error:', error)
        };
    };
};

module.exports = {
    UserManager
};