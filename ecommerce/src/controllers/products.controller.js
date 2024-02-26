import { getProducts as getProductsService, getProductById as getProductByIdService, postProduct as postProductService, updateProductById as updateProductByIdService, deleteProductById as deleteProductByIdService, getMockProducts as getMockProductsService } from '../services/products.service.js';

const getProducts = async (req, res) => {
    try {
        const products = await getProductsService();
        res.send({ status: 'success', payload: products });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const productById = await getProductByIdService(pid);
        res.send({ status: 'success', payload: productById});
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const postProduct = async (req, res) => {
    try {
        const { title, description, code, price, status = true, stock, category, thumbnail = [], owner = 'ADMIN' } = req.body;
        if(!title, !description, !code, !price, !stock, !category) {
            res.status(400).send({ status: 'error', description: 'product keys incomplete' });
        }
        const product = {
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnail: thumbnail,
            owner: owner
        };
        req.files.forEach((file) => {
            const filename = file.filename;
            product.thumbnail.push(`http://localhost:8080/img/${filename}`);
        });
        await postProductService(product)
        res.status(201).send({ status: 'success', message: 'product created' });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const updateProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const { title, description, code, price, status = true, stock, category, thumbnail = [], owner = 'ADMIN' } = req.body;
        if(!title, !description, !code, !price, !stock, !category) {
            res.status(400).send({ status: 'error', description: 'product keys incomplete' });
        }
        const product = {
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnail: thumbnail,
            owner: owner
        };
        req.files.forEach((file) => {
            const filename = file.filename;
            product.thumbnail.push(`http://localhost:8080/img/${filename}`);
        });
        await updateProductByIdService(pid, product);
        res.status(201).send({ status: 'success', message: 'product updated' });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const deleteProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        await deleteProductByIdService(pid);
        res.send({ status: 'sucess', message: 'product deleted' })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
    };
};

const getMockProducts = async (req, res) => {
    try {
        const products = await getMockProductsService();
        res.send({ status: 'success', payload: products })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.name, description: error.message });
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