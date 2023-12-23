import Router from './router.js';
import Carts from '../dao/dbManagers/carts.manager.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';
import { getCartById, postCart, postProductOnCart } from '../controllers/carts.controller.js';

export default class CartsRouter extends Router {
    constructor() {
        super();
        this.cartsManager = new Carts();
    };

    init() {
        this.get('/:cid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, getCartById)
        this.post('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, postCart)
        this.post('/:cid/product/:pid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, postProductOnCart)
    };
};