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

const authorization = (role) => {
    return async(req, res, next) => {
        if(req.user.role !== role) res.status(403).sent({ status: 'error', message: 'no permissions' });
        next();
    };
};

export{
    __dirname,
    generateToken,
    authToken,
    PRIVATE_KEY,
    authorization
};