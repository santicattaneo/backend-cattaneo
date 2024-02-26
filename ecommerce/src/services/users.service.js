import Users from '../dao/mongo/users.mongo.js';
import { createHash } from '../utils/utils.js';
import { resetPasswordHTML } from '../utils/custom.html.js';
import { sendEmail as sendEmailsService } from './mail.service.js';

const usersManager = new Users();

const isUserInDb = async (email) => {
    const user = await usersManager.getByEmail(email);
    return user;
};

const createUser = async (first_name, last_name, age, email, password) => {
    const user = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password: createHash(password)
    };
    await usersManager.save(user);
    return;
};

const setSessionUser = async (user) => {
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    return;
};

const resetPasswordEmail = async (email) => {
    const emailResetPassword = {
        to: email,
        subjet: 'Reset password',
        html: resetPasswordHTML,
    };
    await sendEmailsService(emailResetPassword)
    return;
};

const resetPassword = async (email, password) => {
    const user = usersManager.getByEmail(email);
    user.password = createHash(password);
    await usersManager.save(user);
    return;
};

const userToAdmin = async (cid) => {
    const user = usersManager.getById(cid);
    user.role = 'ADMIN',
    await usersManager.save(user);
    return;
};

export {
    isUserInDb,
    createUser,
    setSessionUser,
    resetPasswordEmail,
    resetPassword,
    userToAdmin
};