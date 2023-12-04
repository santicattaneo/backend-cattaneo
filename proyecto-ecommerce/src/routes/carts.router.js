import Router from './router.js';
import Carts from '../dao/dbManagers/carts.manager.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';

export default class CartsRouter extends Router {
    constructor() {
        super();
        this.cartsManager = new Carts();
    };

    init() {
        this.get('/:cid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.getCartById)
        this.post('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.postCart)
        this.post('/:cid/product/:pid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.postProductOnCart)
    };

    async getCartById (req, res)  {
        try {
            const cart = await this.cartsManager.getById(req.params.cid);
            res.sendSuccess(cart);
        } catch (error) {
            res.sendServerError(error.message);
        };
    };

    async postCart (req, res) {
        try {
            await this.cartsManager.post(req.body);
            res.sendSuccess('Cart created');
        } catch (error) {
            res.sendServerError(error.message);
        };
    };

    async postProductOnCart (req, res) {
        try {
            await this.cartsManager.updateProduct(req.params.cid, req.params.pid, Number(req.params.quantity));
            res.sendSuccess('Product quantity modified');
        } catch (error) {
            res.sendServerError(error.message);
        };
    };
};