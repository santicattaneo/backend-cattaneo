import Router from './router.js';
import passport from 'passport';
import Users from '../dao/dbManagers/users.manager.js'
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';
import { login, githubCb, logout } from '../controllers/users.controller.js';

export default class UsersRouter extends Router {
    constructor () {
        super();
        this.usersManager = new Users();
    }

    init() {
        this.post('/register', [accessRolesEnum.PUBLIC], passport.authenticate('register', { failureRedirect: 'fail-register' }), this.register);
        this.get('/fail-register', [accessRolesEnum.PUBLIC], this.failRegister);
        this.post('/login', [accessRolesEnum.PUBLIC], passport.authenticate('login', { failureRedirect: 'fail-login' }), login);
        this.get('/fail-login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, this.failLogin);
        this.get('/github', [accessRolesEnum.PUBLIC], passport.authenticate('github', { scope: ['user:email'] }), this.github);
        this.get('/githubcb', [accessRolesEnum.PUBLIC], passport.authenticate('github', { failureRedirect: '/login' }), githubCb);
        this.get('/logout', [accessRolesEnum.USER, accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, logout);
    }

    async register (req, res) {
        res.sendSuccess('user registered')
    };

    async failRegister (req, res) {
        res.sendServerError('register fail')
    };

    async failLogin (req, res) {
        res.sendServerError('login fail');
    };

    async github (req, res) {
        res.sendSuccess('user registered with github');
    };
};