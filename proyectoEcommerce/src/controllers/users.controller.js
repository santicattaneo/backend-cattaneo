import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';
import { resetPassword as resetPasswordService, userToAdmin as userToAdminService, uploadDocumentsById as uploadDocumentsByIdService } from '../services/users.service.js';

const register = async (req, res) => {
    res.send({ status: 'success', message: 'user registered' });
};

const failRegister = async (req, res) => {
    res.send({ status: 'success', message: 'register fail' });
};

const login = async (req, res) => {
    try {
        if(!req.user){
            throw CustomError.createError({
                name: 'UserError',
                cause: 'Invalid credentials',
                message: 'Error trying to create user',
                code: EErrors.INVALID_CREDENTIALS
            });
        };
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age
        };
        res.send({ status: 'success', message: 'Login successful'});
    } catch (error) {
        throw CustomError.ServerError();
    };
};

const failLogin = async (req, res) => {
    res.send({ status: 'success', message: 'login fail' });
};

const github = async (req, res) => {
    res.send({ status: 'success', message: 'user registered with github' });
};

const githubCb = async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
};

const logout = async (req, res) => {
    req.session.destroy(error => {
        if(error){
            throw CustomError.createError({
                name: 'ServerError',
                cause: 'Internal server error',
                message: 'Server error, try again later',
                code: EErrors.INTERNAL_SERVER_ERROR
            });
        };
        res.redirect('/');
    });
};

const current = async (req, res) => {
    const currentUser = req.session.user;
    res.send({ status: 'success', current: currentUser });
};

const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        await resetPasswordService(email, password);
        res.send({ status: 'success', message: 'email to reset your password sent'})
    } catch (error) {
        throw CustomError.ServerError();
    };
};

const userToAdmin = async (req, res) => {
    await userToAdminService(req.params.cid);
    res.send({ status: 'success', message: 'user role changed to admin'})
};

const documents = async (req, res) => {
    try {
        const { uid } = req.params;
        const documents = req.files;
        await uploadDocumentsByIdService(uid, documents);
        res.send({ status: 'success', message: 'documents uploaded' })
    } catch (error) {
        throw CustomError.ServerError();
    }
};

export {
    register,
    failRegister,
    login,
    failLogin,
    github,
    githubCb,
    logout,
    current,
    resetPassword,
    userToAdmin,
    documents
};