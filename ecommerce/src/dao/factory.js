import configs from '../config/config.js';

const persistence = configs.persistence;

let Carts;
let Products;
let Users;

switch(persistence) {
    case 'MONGO':
        console.log('Working with DB');
        const mongoose = await import('mongoose');
        await mongoose.connect(configs.mongoUrl);
        const { default: CartsMongo } = await import('./mongo/carts.mongo.js');
        const { default: ProductsMongo } = await import('./mongo/products.mongo.js');
        const { default: UsersMongo } = await import('./mongo/users.mongo.js');
        Carts = CartsMongo;
        Products = ProductsMongo;
        Users = UsersMongo;
        break;
    case 'FILES':
        console.log('No files in DB');
        break;
};

export{
    Carts,
    Products,
    Users
};