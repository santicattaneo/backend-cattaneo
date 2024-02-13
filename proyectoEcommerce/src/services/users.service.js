import Users from '../dao/mongo/users.mongo.js';
import UsersRepository from '../repositories/users.repository.js';
import { resetPasswordHTML } from '../utils/custom.html.js';
import { sendEmail } from './mail.service.js';
import EErrors from '../middlewares/errors/enums.js';
import CustomError from '../middlewares/errors/CustomError.js';

const usersManager = new Users();

const getUserByEmail = async (email) => {
    const user = usersManager.getByEmail(email);
    return user;
};

const saveUser = async (user) => {
    await usersManager.save(user);
    return user;
};

const resetPassword = async (email, password) => {
    const userByEmail = await UsersRepository.getByEmail(email);
    const comparePassword = isValidPassword(password, userByEmail.password);
    if(!comparePassword) {
        const emailResetPassword = {
            to: email,
            subjet: 'Reset password',
            html: resetPasswordHTML,
        };
        const result = await sendEmail(emailResetPassword)
        return result;
    } else {
        throw CustomError.createError({
            name: 'UserError',
            cause: 'Invalid credentials',
            message: 'You cannot use the same password',
            code: EErrors.INVALID_CREDENTIALS
        });
    }
}

const userToAdmin = async (cid) => {
    const userById = await UsersRepository.getById(cid);
    userById.role = 'ADMIN'
    const result = await UsersRepository.save(userById);
    return result;
}

export {
    getUserByEmail,
    saveUser,
    resetPassword,
    userToAdmin
};