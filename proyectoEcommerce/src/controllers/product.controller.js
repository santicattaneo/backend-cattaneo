import { getProducts as getProductsService, getProductById as getProductByIdService, postProduct as postProductService, updateProductById as updateProductByIdService, deleteProductById as deleteProductByIdService} from '../services/products.service.js';
import { generateProducts } from '../utils.js';
import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';

const getProducts = async (req, res) => {
    try {
        const products = await getProductsService();
        res.send({ status: 'success', payload: products });
    } catch (error) {
        throw CustomError.ServerError();
    };
};

const getProductById = async (req, res) => {
    try {
        const product = await getProductByIdService(req.params.pid);
        res.send({ status: 'success', payload: product });
    } catch (error) {
        throw CustomError.ServerError();
    };
};

const postProduct = async (req, res) => {
    try {
        req.body.thumbnail = [];
        req.files.forEach((file) => {
            const filename = file.filename;
            req.body.thumbnail.push(`http://localhost:8080/img/${filename}`);
        });
        const result = await postProductService(req.body);
        res.status(201).send({ status: 'success', message: 'Product created', payload: result });
    } catch (error) {
        throw CustomError.ServerError();
    };
};

const updateProductById = async (req, res) => {
    try {
        req.body.thumbnail = [];
        if(req.body.thumbnail){
            req.files.forEach((file) => {
                const filename = file.filename;
                req.body.thumbnail.push(`http://localhost:8080/img/${filename}`);
            });
        };
        const result = await updateProductByIdService(req.params.pid, req.body);
        res.send({ status: 'success', message: 'product updated', payload: result });
    } catch (error) {
        throw CustomError.ServerError();
    };
};

const deleteProductById = async (req, res) => {
    try {
        const result = await deleteProductByIdService(req.params.pid);
        res.send({ status: 'success', message: 'product updated', pid: result });
    } catch (error) {
        throw CustomError.ServerError();
    };
};

const getMockProducts = async (req, res) => {
    try {
        let users = [];
        for(let i=0; i < 100; i++) {
            users.push(generateProducts());
        };
        res.send({ status: 'success', payload: users });
    } catch (error) {
        throw CustomError.ServerError();
    };
};

export{
    getProducts,
    getProductById,
    postProduct,
    updateProductById,
    deleteProductById,
    getMockProducts
};