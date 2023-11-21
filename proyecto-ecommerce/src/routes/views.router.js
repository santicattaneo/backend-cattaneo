import { Router } from 'express';
import Carts from '../dao/dbManagers/carts.manager.js'
import Products from '../dao/dbManagers/products.manager.js';
import productsModel from '../dao/dbManagers/models/products.model.js';
import usersModel from '../dao/dbManagers/models/users.model.js';

const router = Router();

const cartsManager = new Carts();
const productsManager = new Products();

//midlewares
const publicAccess = (req, res, next) => {
    if(req.session?.user) return res.redirect('/');
    next();
};
const privateAccess = (req, res, next) => {
    if(!req.session?.user) return res.redirect('/login');
    next();
}
//

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});

router.get('/', privateAccess, (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
});

router.get('/products-view', privateAccess, async (req, res) => {
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
        console.log(error);
        res.status(500).send({ status: 'error', message: error.message });
    }
});
router.get('/carts-view/:cid', privateAccess, async (req, res) => {
    try {
        const cart = await cartsManager.getById(req.params.cid);
        const cartWithToString = cart.map(item => ({
            ...item,
            _id: item._id.toString(),
            products: item.products.map(product => ({ ...product, _id: product._id.toString() }))
        }));
        res.render('carts', { cart: cartWithToString });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        console.log(error);
    }
});
export default router;