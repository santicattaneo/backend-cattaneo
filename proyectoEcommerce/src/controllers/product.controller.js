import { getProducts as getProductsService, getProductById as getProductByIdService, postProduct as postProductService, updateProductById as updateProductByIdService, deleteProductById as deleteProductByIdService} from '../services/products.service.js';

const getProducts = async (req, res) => {
    try {
        const products = await getProductsService();
        res.send({ status: 'success', payload: products });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
};

const getProductById = async (req, res) => {
    try {
        const product = await getProductByIdService(req.params.pid);
        res.send({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
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
        res.status(500).send({ status: 'error', message: error.message });
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
        res.status(500).send({ status: 'error', message: error.message });
    };
};

const deleteProductById = async (req, res) => {
    try {
        const result = await deleteProductByIdService(req.params.pid);
        res.send({ status: 'success', message: 'product updated', pid: result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    };
};

export{
    getProducts,
    getProductById,
    postProduct,
    updateProductById,
    deleteProductById
};