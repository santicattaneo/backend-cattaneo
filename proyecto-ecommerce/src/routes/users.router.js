import Router from './router.js';
import usersModel from '../dao/dbManagers/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';
import Users from '../dao/dbManagers/users.manager.js'
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';


export default class UsersRouter extends Router {
    constructor () {
        super();
        this.usersManager = new Users();
    }

    init() {
        this.post('/register', [accessRolesEnum.PUBLIC], passport.authenticate('register', { failureRedirect: 'fail-register' }), this.register);
        this.get('/fail-register', [accessRolesEnum.PUBLIC], this.failRegister);
        this.post('/login', [accessRolesEnum.PUBLIC], passport.authenticate('login', { failureRedirect: 'fail-login' }), this.login);
        this.get('/fail-login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, this.failLogin);
        this.get('/github', [accessRolesEnum.PUBLIC], passport.authenticate('github', { scope: ['user:email'] }), this.github);
        this.get('/githubcb', [accessRolesEnum.PUBLIC], passport.authenticate('github', { failureRedirect: '/login' }), this.githubCb);
        this.get('/logout', [accessRolesEnum.USER, accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, this.logout);
    }

    async register (req, res) {
        res.sendSuccess('user registered')
    };

    async failRegister (req, res) {
        res.sendServerError('register fail')
    };

    async login (req, res) {
        try {
            if(!req.user){
                return res.sendClientError('invalid credentials')
            };
            req.session.user = {
                name: `${req.user.first_name} ${req.user.last_name}`,
                email: req.user.email,
                age: req.user.age
            };
            res.sendSuccess('login success');
        } catch (error) {
            res.sendServerError(error.message);
        };
    };

    async failLogin (req, res) {
        res.sendServerError('login fail');
    };

    async github (req, res) {
        res.sendSuccess('user registered with github');
    };

    async githubCb (req, res) {
        req.session.user = req.user;
        res.redirect('/');
    };

    async logout (req, res) {
        req.session.destroy(error => {
            if(error) return res.sendServerError(error.message);
            res.redirect('/');
        });
    };
};