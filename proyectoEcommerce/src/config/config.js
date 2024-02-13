import dotenv from 'dotenv';
import { __mainDirname } from '../utils/utils.js';

dotenv.config({
    path: `${__mainDirname}/.env`
});

const configs = {
    persistence: process.env.PERSISTENCE,
    mongoUrl: process.env.MONGO_URL,
    privateKeyJwt: process.env.PRIVATE_KEY_JWT
};

export default configs;