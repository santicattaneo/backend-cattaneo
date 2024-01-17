import { productsView as productsViewService, carByIdView as carByIdViewService } from '../services/views.service.js';
import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';

const registerView = async (req, res) => {
    res.render('register')
};

const loginView = async (req, res) => {
    res.render('login');
};

const profileView = async (req, res) => {
    res.render('profile', { user: req.session.user });
};

const productsView = async (req, res) => {
    try {
        const { page = 1, limit = 5, sort, query } = req.query;
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsViewService(limit, page, sort, query);
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
        throw CustomError.ServerError();
    };
};

const cartByIdView = async (req, res) => {
    try {
        const cart = await carByIdViewService(req.params.cid);
        const cartWithToString = cart.map(item => ({
            ...item,
            _id: item._id.toString(),
            products: item.products.map(product => ({ ...product, _id: product._id.toString() }))
        }));
        res.render('carts', { cart: cartWithToString });
    } catch (error) {
        throw CustomError.ServerError();
    };
};

export {
    registerView,
    loginView,
    profileView,
    productsView,
    cartByIdView
};