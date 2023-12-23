import Users from '../dao/dbManagers/users.manager.js';

const usersManager = new Users();

const getUserByEmail = async (email) => {
    const user = usersManager.getByEmail(email);
    return user;
};

const saveUser = async (user) => {
    await usersManager.save(user);
    return user;
};

export {
    getUserByEmail,
    saveUser
};