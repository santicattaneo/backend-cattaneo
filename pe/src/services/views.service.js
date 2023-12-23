import productsModel from '../dao/dbManagers/models/products.model.js';
import Carts from '../dao/dbManagers/carts.manager.js';

const cartsManager = new Carts();

const productsView = async (limit, page, sort, query) => {
    const response = productsModel.paginate({}, { limit, page, sort, query }) 
    return response;
};

const carByIdView = async (cid) => {
    const cart =  cartsManager.getById(cid);
    return cart;
};

export{
    productsView,
    carByIdView
}