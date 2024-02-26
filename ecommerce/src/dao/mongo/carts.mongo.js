import cartsModel from './models/carts.model.js'

export default class Carts {
    constructor() {};

    get = async () => {
        const result = await cartsModel.find().lean();
        return result;
    };

    getById = async (cid) => {
        const result = await cartsModel.find({ _id: cid });
        return result
    };

    post = async (body) => {
        const result = await cartsModel.create(body);
        return result;
    };

    update = async (cid, body) => {
        const result = await cartsModel.updateOne({ _id: cid }, body);
        return result
    };

    delete = async (cid) => {
        const result = await cartsModel.deleteOne({ _id: cid });
        return result;
    };

    deleteProduct = async (cid, pid) => {
        const result = await cartsModel.updateOne({ _id: cid }, { $pull: { products: { _id: pid }}})
        return result;
    };

    update = async (cid, body) => {
        const result = await cartsModel.updateOne({ _id: cid }, body);
        return result;
    };

    updateProduct = async (cid, pid, quantity) => {
        const result = await cartsModel.updateOne({ _id: cid, 'products.product_id': pid }, { $set: { 'products.$.quantity': quantity }}, { new: true });
        return result;
    };
}