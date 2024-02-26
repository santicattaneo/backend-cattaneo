import { getCartById as getCartByIdService, createCart as createCartService, postProductOnCart as postProductOnCartService, purchase as purchaseService} from '../services/carts.service.js';

const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await getCartByIdService(cid);
        res.send({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const postCart = async (req, res) => {
    try {
        const { products } = req.body;
        if(!products || typeof products !== 'array'){
            res.status(400).send({ status: 'error', description: 'products array is necessary' });
        };
        await createCartService(products);
        res.status(201).send({ status: 'success', message: 'cart created' });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const postProductOnCart = async (req, res) => {
    try {
        const { cid, pid, quantity } = req.params;
        if(!cid || !pid || !quantity) {
            res.status(400).send({ status: 'error', description: 'cid, pid and quantity are necessary' })
        };
        await postProductOnCartService(cid, pid, quantity);
        res.status(201).send({ status: 'success', message: 'product added to cart'});
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const purchase = async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await purchaseService(cid);
        if(result === 'ticket created'){
            res.status(201).send({ status: 'success', message: 'ticket created' });
        } else {
            res.status(400).send({ status: 'error', description: 'not enough stock' });
        };
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

export {
    getCartById,
    postCart,
    postProductOnCart,
    purchase
};