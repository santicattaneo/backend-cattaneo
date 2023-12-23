import mongoose from 'mongoose';
import productsModel from './dao/dbManagers/models/products.model.js';
import cartsModel from './dao/dbManagers/models/carts.model.js';

const environment = async () => {
    try {
        await mongoose.connect('mongodb+srv://santiagocattaneo01:XOdbjUkUPk8cmxFD@cluster55575sc.kxvftyn.mongodb.net/proyectoecommerce?retryWrites=true&w=majority');
        const result = productsModel.updateMany({}, { $set: { thumbnail: [] }});

        result.then((result) => {
            console.log(result);
        }).catch((error) => {
            console.error(error);
});
    } catch (error) {
        console.log(error);
    }
};

//environment();