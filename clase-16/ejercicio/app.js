import mongoose from 'mongoose';
import usersInfo from './Users.json' assert { type: 'json' };
import usersModel from './models/users.model.js';
import { studentsModel } from './models/students.model.js';
import { coursesModel } from './models/courses.model.js';

const environment = async () => {
    try {
        await mongoose.connect('mongodb+srv://santiagocattaneo01:XOdbjUkUPk8cmxFD@cluster55575sc.kxvftyn.mongodb.net/clase16?retryWrites=true&w=majority');
        
        //insertar los elementos a la db
        // const responseInsert = await usersModel.insertMany(usersInfo);
        // console.log(responseInsert);

        //saber cuanto tarda en responder
        // const usertsByNameStats = await usersModel.find({ first_name: 'Jose' }).explain('executionStats');
        // console.log(usertsByNameStats);

        //insertar cursos
        // await coursesModel.insertMany([{
        //     title: 'Pogramacion backend',
        //     description: 'Programacion con node',
        //     teacher: 'Alex'
        // },
        // {
        //     title: 'Pogramacion frontend',
        //     description: 'Programacion con react',
        //     teacher: 'Juan'
        // }]);

        //insertar estudiante
        // await studentsModel.create({
        //     first_name: 'Max',
        //     last_name: 'Verstappen',
        //     email: 'mv@gmail.com',
        //     gender: 'M'
        // });

        //asociacion al curso con el estudiante
        // const student = await studentsModel.findOne({ _id: 'id' });
        // student.courses.push({ course: 'id'});
        // await studentsModel.updateOne({ _id: 'id'}, student);

        //obtener la info del curso con population
        // const students = await studentsModel.find().populate('courses.course');
        // console.log(students);

        //para traer la data hidratada sin ese code hacemos un middleward en el model (nuevo cada metodo o con coma) :)
    } catch (error) {
        console.log('error:', error.message);
    }
}

environment();