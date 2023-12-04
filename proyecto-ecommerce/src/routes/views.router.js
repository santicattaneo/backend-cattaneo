import Router from './router.js';
import Carts from '../dao/dbManagers/carts.manager.js'
import Products from '../dao/dbManagers/products.manager.js';
import productsModel from '../dao/dbManagers/models/products.model.js';
import usersModel from '../dao/dbManagers/models/users.model.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';

export default class ViewsRouter extends Router {
    constructor() {
        super(),
        this.productsManager = new Products();
        this.cartsManager = new Carts();
    };

    init() {
        this.get('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, this.registerView)
        this.get('/login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, this.loginView)
        this.get('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.profileView)
        this.get('/products-view', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.productsView)
        this.get('/carts-view/:cid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.carByIdView)
    }

    async registerView (req, res) {
        res.render('register');
    };

    async loginView (req, res){
        res.render('login');
    };

    async profileView (req, res){
        res.render('profile', {
            user: req.session.user
        });
    };
    
    async productsView (req, res){
        try {
            const { page = 1, limit = 5, sort, query } = req.query;
            const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate({}, { limit, page, sort, query });
            const plainObjects = docs.map(doc => doc.toObject());
            res.render('products', {
                products: plainObjects,
                hasPrevPage,
                hasNextPage,
                currentPage: parseInt(page),
                nextPage,
                prevPage
            });
        } catch (error) {
            res.sendServerError(error.message);
        };
    };

    async carByIdView (req, res){
        try {
            const cart = await cartsManager.getById(req.params.cid);
            const cartWithToString = cart.map(item => ({
                ...item,
                _id: item._id.toString(),
                products: item.products.map(product => ({ ...product, _id: product._id.toString() }))
            }));
            res.render('carts', { cart: cartWithToString });
        } catch (error) {
            res.sendServerError(error.message);
        };
    };
};