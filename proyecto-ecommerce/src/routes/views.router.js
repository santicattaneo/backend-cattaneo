import Router from './router.js';
import Carts from '../dao/dbManagers/carts.manager.js'
import Products from '../dao/dbManagers/products.manager.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.config.js';
import { productsView, carByIdView } from '../controllers/views.controller.js'

export default class ViewsRouter extends Router {
    constructor() {
        super();
        this.productsManager = new Products();
        this.cartsManager = new Carts();
    };

    init() {
        this.get('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, this.registerView)
        this.get('/login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.JWT, this.loginView)
        this.get('/', [accessRolesEnum.USER], passportStrategiesEnum.JWT, this.profileView)
        this.get('/products-view', [accessRolesEnum.USER], passportStrategiesEnum.JWT, productsView)
        this.get('/carts-view/:cid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, carByIdView)
    }

    async registerView (req, res) {
        res.render('register');
    };

    async loginView (req, res){
        res.render('login');
    };

    async profileView (req, res){
        res.render('profile', { user: req.session.user });
    };
};