import multer from 'multer';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { fakerES as faker } from '@faker-js/faker';
import winston from 'winston';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __mainDirname = path.join(__dirname, '..', '..');

const storage = () => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/img`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploader = () => multer({
    storage,
    onError: (err, next) => {
        console.log(err.message);
        next();
    }
});

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (painPassword, hashedPassword) => bcrypt.compareSync(painPassword, hashedPassword);


const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(10),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int(1),
        category: faker.commerce.category(),
        thumbnail: faker.image.url(),
        id: faker.database.mongodbObjectId()
    };
};

const ENVIRONMENT = 'desarrollo';
let logger;

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
};

if(ENVIRONMENT === 'desarrollo') {
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'debug'
            })
        ]
    });
} else {
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'info'
            }),
            new winston.transports.File({
                filename: 'logs/errors.log',
                level: 'error'
            })
        ]
    });
};

export {
    __dirname,
    uploader,
    __mainDirname,
    createHash,
    isValidPassword,
    generateProducts
};