import Products from "../dao/dbManagers/products.manager.js";

const productsManager = new Products();

const getProducts = async () => {
    const products = productsManager.get();
    return products;
};

const getProductById = async (pid) => {
    const product = productsManager.getById(pid);
    return product;
};

const postProduct = async (prod) => {
    productsManager.post(prod);
    return prod;
};

const updateProductById = async (pid, prod) => {
    productsManager.update(pid, prod);
    const prodUpdated = await getProductById(pid);
    return prodUpdated;
};

const deleteProductById = async (pid) => {
    productsManager.delete(pid);
    return pid;
};

export{
    getProducts,
    getProductById,
    postProduct,
    updateProductById,
    deleteProductById
};