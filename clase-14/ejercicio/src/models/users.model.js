import mongoose from 'mongoose';

//especificar nombre de coleccion
const usersCollection = 'users';

//definir el esquema de nuestro documento
const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    }
});

//parte funcional (CRUD)
export const usersModel = mongoose.model(usersCollection, usersSchema);