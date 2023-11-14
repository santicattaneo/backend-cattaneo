import mongoose from 'mongoose';

const ordersColelction = 'orders';

const ordersSchema = new mongoose.Schema({
    name: String,
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
    },
    price: Number,
    quantity: Number,
    date: Date
});

const ordersModel = mongoose.model(ordersColelction, ordersSchema);

export default ordersModel;