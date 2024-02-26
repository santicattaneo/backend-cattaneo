import dotenv from 'dotenv';
import { __mainDirname } from '../utils/utils.js';

dotenv.config({
    path: `${__mainDirname}/.env`
});

const configs = {
    persistence: process.env.PERSISTENCE,
    mongoUrl: process.env.MONGO_URL,
    privateKeyJwt: process.env.PRIVATE_KEY_JWT,
    userNodemailer: process.env.USER_NODEMAILER,
    passNodemailer: process.env.PASS_NODEMAILER,
    GitHubClientId: process.env.GITHUB_CLIENT_ID,
    GitHubClientSecret: process.env.GITHUB_CLIENT_SECRET
};

export default configs;