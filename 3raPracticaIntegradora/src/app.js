import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { __dirname } from './utils.js';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import ViewsRouter from './routes/views.router.js';
import UsersRouter from './routes/users.router.js';
import ViewsRouter from './routes/views.router.js';
import CoursesRouter from './routes/courses.router.js';
import StudentsRouter from './routes/students.router.js';

const app = express();

const viewsRouter = new ViewsRouter();
const usersRouter = new UsersRouter();
const coursesRouter = new CoursesRouter();
const studentsRouter = new StudentsRouter();

initializePassport();
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter.getRouter());
app.use('/api/students', studentsRouter.getRouter());
app.use('/api/courses', coursesRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());

try {
    await mongoose.connect('mongodb+srv://santiagocattaneo01:XOdbjUkUPk8cmxFD@cluster55575sc.kxvftyn.mongodb.net/practicaIntegradora?retryWrites=true&w=majority');
    console.log('DB connected');
} catch (error) {
    console.log('error:', error.message);
};

app.listen(8080, () => console.log('Listening on port 8080'));