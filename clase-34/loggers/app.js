import express from 'express';
import { addLogger } from './utils/loggers.js';

const app = express();

app.use(addLogger);

app.get('/', (req, res) => {
    // req.logger.error('Prueba error');
    // req.logger.warn('Prueba warn');
    // req.logger.info('Prueba info');
    // req.logger.http('Prueba http');
    // req.logger.verbose('Prueba verbose');
    // req.logger.debug('Prueba debug');
    // req.logger.silly('Prueba silly');

    //custom
    req.logger.error('Prueba error');
    req.logger.warning('Prueba warning');
    req.logger.info('Prueba info');
    req.logger.debug('Prueba debug');

    res.send({ result: 'Hola' });
});

app.listen(8080);