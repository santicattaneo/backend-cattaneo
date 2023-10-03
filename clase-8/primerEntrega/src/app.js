import express from 'express';
import { __dirname } from './utils.js';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static-files', express.static(`${__dirname}/public`));

//routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use((err, req, res, next) => {
    console.log('Error:',err.message);
    res.status(500).send({ error: err.message });
})

app.listen(8080, () => console.log('Listening on port 8080'));