import { getUserByEmail as getUserByEmailService, saveUser as saveUserService } from '../services/users.service.js';

const login = async (req, res) => {
    try {
        if(!req.user){
            return res.status(400).send({ status: 'error', message: 'Invalid credentials'})
        };
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age
        };
        res.send({ status: 'success', message: 'Login successful'});
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
};

const githubCb = async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
};

const logout = async (req, res) => {
    req.session.destroy(error => {
        if(error) return res.sendServerError(error.message);
        res.redirect('/');
    });
};

export{
    login,
    githubCb,
    logout
};