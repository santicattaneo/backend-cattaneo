import { Router } from "express";
import { __dirname, uploader } from '../utils.js';
import Manager from "../Manager.js";

const router = Router();
const manager = new Manager('./products.json');

//get
router.get('/', async (req, res) => {
    try {
        const products = await manager.get();
        res.send({ status: 'success', payload: products });
    } catch (err) {
        res.status(500).send({ status: 'error', error: err.message });
    };
});
router.get('/:pid', async (req, res) => {
    try {
        const productById = await manager.getByid(Number(req.params.pid));
        if(productById) {
            res.send({ status: 'success', payload: productById });
        } else {
            res.status(404).send({ status: 'error', error: `El producto de id ${Number(req.params.pid)} no existe` });
        }
    } catch (err) {
        res.status(500).send({ status: 'error', error: err.message});
    };
});

//post
router.post('/', uploader.array('thumbnail'), async (req, res) => {
    try {
        req.body.thumbnail = [];
        req.files.forEach((file) => {
            const filename = file.filename;
            req.body.thumbnail.push(`http://localhost:8080/img/${filename}`)
        })
        if(!req.body.title||!req.body.description||!req.body.code||!req.body.price||!req.body.stock||!req.body.category){
            res.status(400).send({ status:'error', error: 'Todos los campos son obligatorios'})
        };
        const products = await manager.get();
        if(products.find((product) => product.code === req.body.code)) {
            res.status(400).send({ status:'error', error: 'El codigo esta asociado a otro producto'})
        }
        if(!req.body.status) {
            req.body.status = true;
        };
        await manager.add(req.body);
        res.send({ status: 'success', message: 'Producto creado'});
    } catch (err) {
        res.status(500).send({ status: 'error', error: err.message});
    };
});

//put
router.put('/:pid', async (req, res) => {
    try {
        const body = req.body;
        const index = Number(req.params.pid);
        if(index !== -1) {
            await manager.update(index, body);
            res.send({status: 'success', message: 'Producto actualizado' });
        } else {
            res.status(404).send({status: 'error', error: 'Poducto no encontrado'});
        };
    } catch (err) {
        res.status(500).send({ status: 'error', error: err.message});
    };
});

//delete
router.delete('/:pid', async (req, res) => {
    try {
        await manager.delete(Number(req.params.pid));
        res.send({ status: 'success', message: 'Producto eliminado'})
    } catch (error) {
        res.status(500).send({ status: 'error', error: err.message});
    }
});

export default router;