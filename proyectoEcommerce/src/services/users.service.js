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
    if(!userById.documents.identification || !userById.documents.proofOfAdress || !userById.documents.statementOfAccount) {
        res.status(400).send({ status: 'error', description: 'lack of documentation' });
    }
    const result = await UsersRepository.save(userById);
    return result;
}

const uploadDocumentsById = async (uid, documents) => {
    const userById = await UsersRepository.getById(uid);
    documents.forEach((file) => {
        const filename = file.filename;
        userById.documents.push(`http://localhost:8080/img/${filename}`);
    });
    const result = await UsersRepository.save(uid, userById);
    return result;
};

export {
    getUserByEmail,
    saveUser,
    resetPassword,
    userToAdmin,
    uploadDocumentsById
};