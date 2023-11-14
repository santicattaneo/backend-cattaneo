import mongoose from 'mongoose';

const usersCollection = 'users';
const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    email: String,
    gender: String
});

//indice compusto
//usersSchema.index({ key: 1 o -1 , ...})

//indice asociado a texto
//usersSchema.index({ key: 'text' })

//indice asociado a coordenadas
//usersSchema.index({ coordinatos: '2d' })

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;