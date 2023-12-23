import Carts from "../dao/dbManagers/carts.manager.js";

const cartsManager = new Carts();

const getCartById = async (cid) => {
    const cart = cartsManager.getById(cid);
    return cart;
};

const postCart = async (cart) => {
    cartsManager.post(cart);
    return cart;
};

const postProductOnCart = async (cid, pid, quantity) => {
    cartsManager.updateProduct(cid, pid, quantity)
    return response = {cid, pid, quantity};
};

export{
    getCartById,
    postCart,
    postProductOnCart
};