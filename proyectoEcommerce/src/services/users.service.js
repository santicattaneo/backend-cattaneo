import Users from '../dao/mongo/users.mongo.js';

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