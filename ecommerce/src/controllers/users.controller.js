import { isUserInDb as isUserInDbService, createUser as createUserService, setSessionUser as setSessionUserService, resetPasswordEmail as resetPasswordEmailService, resetPassword as resetPasswordService, userToAdmin as userToAdminService } from '../services/users.service.js';
import { isValidPassword } from "../utils/utils";

const register = async (req, res) => {
    try {
        const { first_name, last_name, age, email, password } = req.body;
        if(!first_name || !last_name || !age || !email || !password){
            res.status(400).send({ status: 'error', description: 'users keys incomplete'})
        }
        const inDb = await isUserInDbService(email);
        if(inDb) {
            res.status(400).send({ status: 'error', message: 'user already exists' });
        };
        await createUserService(first_name, last_name, age, email, password);
        res.send({ status: 'succes', message: 'user registered' });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const inDb = await isUserInDbService(email);
        if(!inDb){
            res.status(400).send({ status: 'error', description: 'user not found' });
        };
        if(!isValidPassword(password, inDb.password)){
            res.status(400).send({ status: 'error', description: 'incorrect password' });
        };
        await setSessionUserService(inDb);
        res.send({ status: 'success', message: 'login successfully' });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const github = async (req, res) => {
    try {
        res.send({ status: 'success', message: 'user registered with github' })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const githubCb = async (req, res) => {
    try {
        req.session.user = req.user;
        res.redirect('/');
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const logout = async (req, res) => {
    try {
        req.session.destroy(error => {
            if(error){
                res.status(500).send({ status: 'error', error: error.name, description: error.message });
            };
            res.redirect('/');
        });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const current = async (req, res) => {
    try {
        const currentUser = req.session.user;
        res.send({ status: 'success', current: currentUser });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const recoverPasswordGet = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email){
            res.status(400).send({ status: 'error', description: 'incomplete values' });
        };
        await resetPasswordEmailService(email);
        res.send({ status: 'success', message: 'password reset email sent' });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const recoverPasswordPost = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            res.status(400).send({ status: 'error', description: 'incomplete credentials' });
        };
        await resetPasswordService(email, password);
        res.send({ status: 'success', message: 'password reset successfully'});
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const userToAdmin = async (req, res) => {
    try {
        const { cid } = req.params;
        if(!cid){
            res.status(400).send({ status: 'error', description: 'missing param' });
        };
        await userToAdminService(cid);
        res.send({ status: 'success', message: 'user role changed to admin' });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

export {
    register,
    login,
    github,
    githubCb,
    logout,
    current,
    recoverPasswordGet,
    recoverPasswordPost,
    userToAdmin
}