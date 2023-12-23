import * as ordersService from '../services/orders.service.js';
import * as usersService from '../services/users.service.js';
import * as businessService from '../services/business.service.js';

const getOrders = async (req, res) => {
    try {
        const result = await ordersService.getOrders();
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const { user, business, products } = req.body;

        const userResult = await usersService.getUserById(user);
        if(!userResult) {
            return res.status(404).send({ status: 'error', message: 'User not found' });
        };

        const businessResult = await businessService.getBusinessById(business);
        if(!businessResult) {
            return res.status(404).send({ status: 'error', message: 'Business not found' });
        };

        const result = await ordersService.createOrder(userResult, businessResult, products);

        res.status(201).send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
};

const resolveOrder = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        const orderResult = await ordersService.getOrderById(id);
        if(!orderResult) {
            return res.status(404).send({ status: 'error', message: 'Order not found' });
        };

        const result = await ordersService.resolveOrder(orderResult, status);

        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}

export {
    getOrders,
    createOrder,
    resolveOrder
};