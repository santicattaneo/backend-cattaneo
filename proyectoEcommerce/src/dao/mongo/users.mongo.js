import usersModel from './models/users.model.js';

export default class Users {
    constructor() {};

    getByEmail = async (email) => {
        const user = await usersModel.findOne({ email }).lean();
        return user;
    };

    getById = async (cid) => {
        const user = await usersModel.findById(cid).lean();
        return user;
    }
    
    save = async (user) => {
        const result = await usersModel.create(user);
        return result;
    };
};