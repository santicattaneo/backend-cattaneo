import express from "express";
import mongoose from 'mongoose';
import usersRouter from './routes/users.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);

//conectar con db
try {
    await mongoose.connect('mongodb+srv://santiagocattaneo01:XOdbjUkUPk8cmxFD@cluster55575sc.kxvftyn.mongodb.net/clase14?retryWrites=true&w=majority');
    console.log('DB connected');
} catch (error) {
    console.log('error:', error.message);
}

app.listen(8080);