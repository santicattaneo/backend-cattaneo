import { Router } from "express";
import { uploader } from '../utils.js';
import Manager from "../Manager.js";

const router = Router();
const manager = new Manager('./carts.json');

//get
router.get('/:cid', async (req, res) => {
    try {
        const cartById = await manager.getByid(Number(req.params.pid));
        res.send({ status: 'success', payload: cartById });
    } catch (err) {
        res.status(500).send({ status: 'error', message: err.message });
    };
});

//post
router.post('/', async (req, res) => {
    try {
        await manager.add(req.body);
        res.send({ status: 'success', message: 'Carrito creado'});
    } catch (err) {
        res.status(500).send({ status: 'error', message: err.message });
    }
});
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cart = await manager.getByid(Number(req.params.cid));
        const existProduct = cart.products.find((product) => product.id === Number(req.params.pid));
        if(!existProduct) {
            let product = { id: Number(req.params.pid), quantity: 1}
            cart.products.push(product);
        } else {
            existProduct.quantity ++;
        }
        await manager.update(Number(req.params.cid), cart);
        res.send({ status: 'success', message: 'Producto agregado al carrito' });
    } catch (err) {
        res.status(500).send({ status: 'error', message: err.message });
    };
});

export default router;