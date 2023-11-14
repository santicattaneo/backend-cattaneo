import { Router } from 'express';
import Products from '../dao/dbManagers/products.manager.js';
import { __dirname, uploader } from '../utils.js';

const router = Router();
const productsManager = new Products();

router.get('/', async (req, res) => {
    try {
        const products = await productsManager.get();
        res.send({ status: 'success', payload: products });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        console.log(error);
    };
});
router.get('/:pid', async (req, res) => {
    try {
        const product = await productsManager.getById(Number(req.params.pid));
        res.send({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        console.log(error);
    };
});

router.post('/', uploader.array('thumbnail'), async (req, res) => {
    try {
        req.body.thumbnail = [];
        req.files.forEach((file) => {
            const filename = file.filename;
            req.body.thumbnail.push(`http://localhost:8080/img/${filename}`);
        });
        await productsManager.post(req.body);
        res.send({ status: 'success', message: 'Product created' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        console.log(error);
    };
});

router.put('/pid', async (req, res) => {
    try {
        await productsManager.update(Number(req.params.pid), req.body);
        res.send({ status: 'success', message: 'Product updated' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        console.log(error);
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        await productsManager.delete(Number(req.params.pid));
        res.send({ status: 'success', message: 'Product deleted' });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        console.log(error);
    };
});

export default router;