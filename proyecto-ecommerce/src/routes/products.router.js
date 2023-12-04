import Router from './router.js';
import Products from '../dao/dbManagers/products.manager.js';
import { __dirname, uploader } from '../utils.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';

export default class ProductsRouter extends Router {
    constructor() {
        super(),
        this.productsManager = new Products();
    };

    init() {
        this.get('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.getProducts);
        this.get('/:pid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.getProductById);
        this.post('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.postProduct);
        this.put('/:pid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.updateProductById);
        this.delete('/:pid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.deleteProductById);
    };

    async getProducts (req, res) {
        try {
            const products = await this.productsManager.get();
            res.sendSuccess(products);
        } catch (error) {
            res.sendServerError(error.message);
        };
    };

    async getProductById (req, res) {
        try {
            const product = await this.productsManager.getById(req.params.pid);
            res.sendSuccess(product);
        } catch (error) {
            res.sendServerError(error.message);
        };
    };

    async postProduct (req, res) {
        try {
            req.body.thumbnail = [];
            req.files.forEach((file) => {
                const filename = file.filename;
                req.body.thumbnail.push(`http://localhost:8080/img/${filename}`);
            });
            await this.productsManager.post(req.body);
            res.sendSuccess('Product created');
        } catch (error) {
            res.sendServerError(error.message);
        };
    };

    async updateProductById (req, res) {
        try {
            req.body.thumbnail = [];
            if(req.body.thumbnail){
                req.files.forEach((file) => {
                    const filename = file.filename;
                    req.body.thumbnail.push(`http://localhost:8080/img/${filename}`);
                });
            };
            await this.productsManager.update(req.params.pid, req.body);
            res.sendSuccess('Product updated');
        } catch (error) {
            res.sendServerError(error.message);
        };
    };

    async deleteProductById (req, res) {
        try {
            await this.productsManager.delete(req.params.pid);
            res.sendSuccess('Product deleted');
        } catch (error) {
            res.sendServerError(error.message);
        };
    };
};