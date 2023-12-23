import * as businessService from '../services/business.service.js';

const getBusiness = async (req, res) => {
    try {
        const result = await businessService.getBusiness();
        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

const createBusiness = async (req, res) => {
    try {
        const business = req.body;
        const result = await businessService.createBusiness(business);
        res.status(201).send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
};

export {
    getBusiness,
    createBusiness
};