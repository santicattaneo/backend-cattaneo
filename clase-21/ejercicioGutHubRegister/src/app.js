import express from 'express';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { __dirname } from './utils.js';
import { initializePassport } from './config/passport.config.js';
import passport from 'passport';

const app = express();

try {
    await mongoose.connect('mongodb+srv://santiagocattaneo01:XOdbjUkUPk8cmxFD@cluster55575sc.kxvftyn.mongodb.net/clase21?retryWrites=true&w=majority');
    console.log('DB connected');
} catch (error) {
    console.log('error:', error.message);
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder5575secret',
    resave: true,
    saveUninitialized: true,
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(8080, () => console.log('Listening on port 8080'));