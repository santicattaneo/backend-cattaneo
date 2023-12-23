import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
});

const configs = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
};

export default configs;