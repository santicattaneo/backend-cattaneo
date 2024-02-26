import Products from '../dao/mongo/products.mongo.js';
import { generateProducts } from '../utils/utils.js';

const productsManager = new Products();

const getProducts = async () => {
    const products = await productsManager.get();
    return products;
};

const getProductById = async (pid) => {
    const productById = await productsManager.getById(pid);
    return productById;
};

const postProduct = async (product) => {
    await productsManager.post(product);
    return;
};

const updateProductById = async (pid, product) => {
    await productsManager.update(pid, product);
    return;
};

const deleteProductById = async (pid) => {
    await productsManager.delete(pid);
    return;
};

const getMockProducts = async () => {
    let products = [];
    for(let i=0; i < 100; i++) {
        products.push(generateProducts());
    };
    return products;
};

export{
    getProducts,
    getProductById,
    postProduct,
    updateProductById,
    deleteProductById,
    getMockProducts
};