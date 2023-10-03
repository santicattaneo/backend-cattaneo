import express from 'express';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware incorporado
app.use('/static-files', express.static(`${__dirname}/public`));

//middlewares
//global
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});
//endpoint
function middlewareNivelServicio(req, res, next) {
    req.dato1 = 'agregado en el middleware';
    next();
};
//router (se implementa en el archivo) -> pets.router.js
//terceros

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

app.get('/test', middlewareNivelServicio, (req, res) => {
    res.send({ payload: { dato: req.dato1 } });
});

//middleware manejo de errores
app.use((err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(500).send({ error: err.message });
});

app.listen(8080, () => console.log('Listening on port 8080'));