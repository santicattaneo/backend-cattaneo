import Router from './router.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';
import { register, login } from '../controllers/users.controller.js';

export default class UsersRouter extends Router {
    init() {
        this.post('/login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, login);
        this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, register);
    };
};