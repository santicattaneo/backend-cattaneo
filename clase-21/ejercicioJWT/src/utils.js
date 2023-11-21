import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PRIVATE_KEY = 'coder55575'

//JWT implementacion y validacion
const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
};

const authToken = (req, res, next) => {
    const authToken = req.headers.authorization;
    if(!authToken) return res.status(401).send({ status: 'error', message: 'not authenticated' });
    const token = authToken.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(401).send({ status: 'error', message: ' not authenticated' });
        req.user = credentials.user;
        next();
    });
};

export{
    __dirname,
    generateToken,
    authToken
};