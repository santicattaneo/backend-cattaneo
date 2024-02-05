import dotenv from 'dotenv';
import { __dirname } from '../utils.js';

dotenv.config({
    path: `${__dirname}/.env`
});

const configs = {
    persistence: process.env.PERSISTENCE,
    mongoUrl: process.env.MONGO_URL
};

export default configs;