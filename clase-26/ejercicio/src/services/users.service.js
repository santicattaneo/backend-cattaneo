import Users from '../dao/memoryManager/users.manager.js';

const usersManager = new Users();

const getUsers = async () => {
    const users = usersManager.getAll();

    // Lógica de negocio
    //
    //

    return users;
};

const saveUser = async (user) => {
    await usersManager.save(user);

    // Lógica de negocio
    //
    //

    return user;
};

export{
    getUsers,
    saveUser
};