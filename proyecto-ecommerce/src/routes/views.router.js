import { Router } from 'express';
import Carts from '../dao/dbManagers/carts.manager.js'
import Products from '../dao/dbManagers/products.manager.js';
import productsModel from '../dao/dbManagers/models/products.model.js';

const router = Router();

const cartsManager = new Carts();
const productsManager = new Products();

router.get('/products-view', async (req, res) => {
    try {
        const { page = 1, limit = 5, sort, query } = req.query;
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate({}, { limit: limit, page: page, sort: sort, query: query });
        res.render('products', {
            students: docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage
        });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        console.log(error);
    }
});
router.get('carts-view/:cid', async (req, res) => {
    try {
        const cart = await cartsManager.getById(Number(req.params.cid));
        res.render('carts', { cart }); 
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        console.log(error);
    };
});