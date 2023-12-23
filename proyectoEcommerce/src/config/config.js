import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
});

const configs = {
    persistence: process.env.PERSISTENCE,
    mongoUrl: process.env.MONGO_URL
};

export default configs;