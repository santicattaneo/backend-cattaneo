import { getUsers as getUsersService, saveUser as saveUserService } from '../services/users.service.js';

const getUsers = async (req, res) => {
    try {
        // Validaciones
        //
        const users = await getUsersService();
        res.send({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).send({ statuss: 'error', message: error.message });
    };
};

const saveUser = async (req, res) => {
    try {
        // Validaciones
        //
        const user = req.body;
        await saveUserService(user);
        res.status(201).send({ status: 'success', message: 'Usuario creado' });
    } catch (error) {
        res.status(500).send({ statuss: 'error', message: error.message });
    };
};

export {
    getUsers,
    saveUser
};