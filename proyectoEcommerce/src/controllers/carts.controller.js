import { getCartById as getCartByIdService, postCart as postCartService, postProductOnCart as postProductOnCartService} from '../services/cart.service.js'
import { getProductById as getProductByIdService, updateProductById as updateProductByIdService } from '../services/products.service.js';
import Tickets from '../dao/mongo/tickets.mongo.js;'
import uuid from 'uuid';
import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';

const ticketsManager = new Tickets();

const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await getCartByIdService(cid);
        res.send({ status: 'success', payload: cart });
    } catch (error) {
        throw CustomError.createError({
            name: 'ServerError',
            cause: 'Internal server error',
            message: 'Server error, try again later',
            code: EErrors.INTERNAL_SERVER_ERROR
        });
    };
};

const postCart = async (req, res) => {
    try {
        const cart = await postCartService(req.body);
        res.status(201).send({ status: 'success', message: 'cart updated', payload: cart });
    } catch (error) {
        throw CustomError.createError({
            name: 'ServerError',
            cause: 'Internal server error',
            message: 'Server error, try again later',
            code: EErrors.INTERNAL_SERVER_ERROR
        });
    };
};

const postProductOnCart = async (req, res) => {
    try {
        const result = await postProductOnCartService(req.params.cid, req.params.pid, Number(req.params.quantity));
        res.status(201).send({ status: 'success', message: 'product quantity modified', cid: result.cid, pid: result.pid, quantity: result.quantity });
        
    } catch (error) {
        throw CustomError.createError({
            name: 'ServerError',
            cause: 'Internal server error',
            message: 'Server error, try again later',
            code: EErrors.INTERNAL_SERVER_ERROR
        });
    };
};

const purchase = async (req, res) => {
    try {
        const cart = await getCartByIdService(req.params.cid);
        const prodInCart = cart.products[0];
        const prodInDb = await getProductByIdService(prodInCart._id);
        if(prodInCart.quantity < prodInDb.stock) {
            prodInDb.stock -= prodInCart.quantity;
            await updateProductByIdService(prodInDb._id, prodInDb);
            const ticket = {
                code: uuid.v4(),
                purchase_datetime: Date.now(),
                amount: prodInCart.quantity,
                purcharser: req.session.user.email,
            };
            await ticketsManager.save(ticket);
            res.send({ status: 'success', message: 'ticket created', ticket: ticket });
        } else {
            res.send({ status: 'success', message: 'not enough stock' });
        };
    } catch (error) {
        throw CustomError.createError({
            name: 'ServerError',
            cause: 'Internal server error',
            message: 'Server error, try again later',
            code: EErrors.INTERNAL_SERVER_ERROR
        });
    };
};

export {
    getCartById,
    postCart,
    postProductOnCart,
    purchase
};