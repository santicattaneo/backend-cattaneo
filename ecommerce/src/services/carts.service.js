import Carts from '../dao/mongo/carts.mongo.js';
import Tickets from '../dao/mongo/tickets.mongo.js';
import Products from '../dao/mongo/products.mongo.js';

const cartsManager = new Carts();
const ticketsManager = new Tickets();
const productsManager = new Products();

const getCartById = async (cid) => {
    const cart = await cartsManager.getById(cid);
    return cart;
};

const createCart = async (products) => {
    const result = await cartsManager.post(products);
    return result;
};

const postProductOnCart = async (cid, pid, quantity) => {
    const result = await cartsManager.updateProduct(cid, pid, quantity);
    return result;
};

const purchase = async (cid) => {
    const cart = await cartsManager.getById(cid);
    for(const prodInCart of cart.products) {
        const productInDb = await productsManager.getById(prodInCart._id);
        if(prodInCart.quantity <= productInDb.stock) {
            productInDb.stock -= prodInCart.quantity;
            await productsManager.update(productInDb._id, productInDb);
        } else {
            return 'not enough stock';
        };
    };
    const ticket = {
        code: updateProductById.v4(),
        purchase_datetime: Date.now(),
        purcharser: req.session.user.email
    };
    await ticketsManager.save(ticket);
    return 'ticket created';
};

export{
    getCartById,
    createCart,
    postProductOnCart,
    purchase
};