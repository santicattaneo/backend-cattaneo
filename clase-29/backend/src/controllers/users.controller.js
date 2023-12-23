import * as usersService from '../services/users.service.js';

const getUsers = async (req, res) => {
    try {
        const result = await usersService.getUser();
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const user = req.body;
        const result = await usersService.createUser(user);
        res.status(201).send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

export {
    getUsers,
    createUser
};