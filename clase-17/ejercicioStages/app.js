import mongoose from 'mongoose';
import ordersModel from './models/orders.model.js';

const environment = async () => {
    try {
        await mongoose.connect('mongodb+srv://santiagocattaneo01:XOdbjUkUPk8cmxFD@cluster55575sc.kxvftyn.mongodb.net/clase17?retryWrites=true&w=majority');
        console.log('db connected');

        // const orders = [
        //     {name: "Pepperoni", size: "medium", price: 19, quantity: 10, date: "2021-03-13T08:14:30Z"},
        //     {name: "Pepperoni", size: "medium", price: 20, quantity: 20, date: "2021-03-13T09:13:24Z"},
        //     {name: "Pepperoni", size: "large", price: 21, quantity: 30, date: "2021-03-17T09:22:12Z"},
        //     {name: "Cheese", size: "small", price: 12, quantity: 15, date: "2021-03-13T11:21:39.736Z"},
        //     {name: "Cheese", size: "medium", price: 13, quantity: 50, date: "2022-01-12T21:23:13.331Z"},
        //     {name: "Cheese", size: "large", price: 14, quantity: 10, date: "2022-01-12T05:08:13Z"},
        //     {name: "Vegan", size: "small", price: 17, quantity: 10, date: "2021-01-13T05:08:13Z"},
        //     {name: "Vegan", size: "medium", price: 18, quantity: 10, date: "2021-01-13T05:10:13Z"}
        // ];

        //insertar orders a la db
        // await ordersModel.insertMany(orders);
        // const ordersResult = await ordersModel.find();
        // console.log(ordersResult);

        //definir nuestra agregacion
        const orders = await ordersModel.aggregate([
            //contendra los stages de nuestro pipeline
            //definir primer stage

            //filtrar pizzas tamaño mediano
            {
                $match: { size: 'medium' }
            },
            //agrupar las pizzas por sabor para ver cuanto se vendio de cada
            {
                $group: { _id: '$name', totalQuantity: { $sum: '$quantity' } }
            },
            //ordenar de acuerdo a la cantidad de mayor a menor
            {
                $sort: { totalQuantity: -1 }
            },
            //agrupar los documentos para tenerlos en un arreglo
            {
                $group: { _id: 1, orders: { $push: '$$ROOT' } }
            },
            //aplicar proyeccion para generar nuevo doc con nuevo ObjetId
            {
                $project: {
                    '_id': 0,
                    orders: '$orders'
                }
            },
            //generar la nueva coleccion de reporte
            {
                $merge: { into: 'reports' }
            }
        ]);
        console.log(JSON.stringify(orders, null, '\t'));
    } catch (error) {
        console.log('error:', error.message);
    }
};

environment();