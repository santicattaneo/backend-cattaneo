import cartsModel from './models/carts.model.js'

export default class Carts {
    constructor() {
        console.log('Working carts with DB');
    };

    get = async () => {
        const carts = await cartsModel.find();
        return carts.map((cart) => cart.toObject());
    };

    getById = async (cid) => {
        const cartById = await cartsModel.find({ _id: cid });
        return cartById
    };

    add = async (body) => {
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

    put = async (cid, body) => {
        const result = await cartsModel.updateOne({ _id: cid }, body);
        return result;
    };

    putProduct = async (cid, pid, quantity) => {
        const result = await cartsModel.updateOne({ _id: cid, 'proucts.product_id': pid }, { $set: { 'products.$.quantity': quantity }}, { new: true });
        return result;
    };
}