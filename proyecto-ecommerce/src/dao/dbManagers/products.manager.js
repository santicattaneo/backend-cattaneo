import productsModel from './models/products.model.js';

export default class Products {
    constructor() {
        console.log('Working products with DB');
    };
    
    get = async () => {
        const result = await productsModel.find().lean();
        return result;
    };

    getById = async (pid) => {
        const result = await productsModel.find({ _id: pid });
        return result;
    };

    post = async (body) => {
        const result = await productsModel.create(body);
        return result;
    };

    update = async (pid, body) => {
        const result = await productsModel.updateOne({ _id: pid }, body);
        return result;
    };

    delete = async (pid) => {
        const result = await productsModel.deleteOne({ _id: pid });
        return result;
    };
}