import express from "express";
import handlebars from 'express-handlebars';
import { __dirname, __mainDirname } from "./utils/utils.js";
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import initializePassport from './config/passport.config.js';
import passport from "passport";

const app = express();

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion Proyecto Ecommerce 55575',
            description: 'API desarrollada para la carrera de Desarollo Backend en CoderHouse'
        }
    },
    apis: [`${__mainDirname}/docs/**/*.yaml`]
}
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/', viewsRouter);

app.get('/loggerTest', (req, res) => {
    req.logger.fatal('Prueba fatal');
    req.logger.error('Prueba error');
    req.logger.warning('Prueba warning');
    req.logger.info('Prueba info');
    req.logger.http('Prueba http');
    req.logger.debug('Prueba debug');

    res.send({ status: 'success', result: 'Testing loggers' });
});

app.listen(8080, () => console.log(`Listening on port 8080`));