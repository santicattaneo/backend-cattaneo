import { getCartById as getCartByIdService, postCart as postCartService, postProductOnCart as postProductOnCartService} from '../services/carts.service.js'

const getCartById = async  (req, res) => {
    try {
        const cart = await getCartByIdService(req.params.cid);
        res.send({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
};

const postCart = async (req, res) => {
    try {
        const cart = await postCartService(req.body);
        res.status(201).send({ status: 'success', message: 'cart updated', payload: cart });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
};

const postProductOnCart = async (req, res) => {
    try {
        const result = await postProductOnCartService(req.params.cid, req.params.pid, Number(req.params.quantity));
        res.status(201).send({ status: 'success', message: 'product quantity modified', cid: result.cid, pid: result.pid, quantity: result.quantity });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
};

export {
    getCartById,
    postCart,
    postProductOnCart,
}