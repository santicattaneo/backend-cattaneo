import { Router } from 'express';
import Carts from '../dao/dbManagers/carts.manager.js';

const router = Router();
const cartsManager = new Carts();

//get
router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartsManager.getById(Number(req.params.cid));
        res.send({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        console.log(error);
    };
});

//post
router.post('/', async (req, res) => {
    try {
        await cartsManager.post(req.body);
        res.send({ status: 'success', message: 'Cart created' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        console.log(error);
    };
});
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        await cartsManager.updateProduct(Number(req.params.cid), Number(req.params.pid), Number(req.params.quantity));
        res.send({ status: 'success', message: 'Product quantity modified' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        console.log(error);
    };
});

export default router;