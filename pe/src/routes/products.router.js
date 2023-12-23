import Router from './router.js';
import Products from '../dao/dbManagers/products.manager.js';
import { __dirname } from '../utils.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';
import { getProducts, getProductById, postProduct, updateProductById, deleteProductById } from '../controllers/products.controller.js';

export default class ProductsRouter extends Router {
    constructor() {
        super();
        this.productsManager = new Products();
    };

    init() {
        this.get('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, getProducts);
        this.get('/:pid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, getProductById);
        this.post('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, postProduct);
        this.put('/:pid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, updateProductById);
        this.delete('/:pid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, deleteProductById);
    };
};