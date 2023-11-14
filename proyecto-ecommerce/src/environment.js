import mongoose from 'mongoose';
import productsModel from './dao/dbManagers/models/products.model.js';
import cartsModel from './dao/dbManagers/models/carts.model.js';

const environment = async () => {
    try {
        await mongoose.connect('mongodb+srv://santiagocattaneo01:XOdbjUkUPk8cmxFD@cluster55575sc.kxvftyn.mongodb.net/proyectoecommerce?retryWrites=true&w=majority');

        const carts = [
            {
                products: [
                    { product: new mongoose.Types.ObjectId('6552a18b48ff8c8ccaa6f9a2') },
                    { product: new mongoose.Types.ObjectId('6552a18b48ff8c8ccaa6f9a6') }
                ]
            },
            {
                products: [
                    { product: new mongoose.Types.ObjectId('6552a18b48ff8c8ccaa6f9a5') },
                    { product: new mongoose.Types.ObjectId('6552a18b48ff8c8ccaa6f9ab') },
                    { product: new mongoose.Types.ObjectId('6552a18b48ff8c8ccaa6f9aa') }
                ]
            },
            {
                products: [
                    { product: new mongoose.Types.ObjectId('6552a18b48ff8c8ccaa6f9a2') }
                ]
            },
            {
                products: [
                    { product: new mongoose.Types.ObjectId('6552a18b48ff8c8ccaa6f9a2') },
                    { product: new mongoose.Types.ObjectId('6552a18b48ff8c8ccaa6f9a6') },
                    { product: new mongoose.Types.ObjectId('6552a18b48ff8c8ccaa6f9aa') }
                ]
            }
        ]; 
        const responseInsert = await cartsModel.insertMany(carts);
        console.log(responseInsert)
    } catch (error) {
        console.log(error);
    }
};

//environment();