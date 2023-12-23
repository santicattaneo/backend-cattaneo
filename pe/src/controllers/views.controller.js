import { productsView as productsViewService, carByIdView as carByIdViewService } from '../services/views.service.js';

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
        res.status(500).send({ status: 'error', message: error.message });
    };
};

const carByIdView = async (req, res) => {
    try {
        const cart = await carByIdViewService(req.params.cid);
        const cartWithToString = cart.map(item => ({
            ...item,
            _id: item._id.toString(),
            products: item.products.map(product => ({ ...product, _id: product._id.toString() }))
        }));
        res.render('carts', { cart: cartWithToString });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
};

export{
    productsView,
    carByIdView
};