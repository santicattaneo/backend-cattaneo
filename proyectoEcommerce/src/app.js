import express from "express";
import handlebars from 'express-handlebars';
import { __dirname } from "./utils/utils.js";
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

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