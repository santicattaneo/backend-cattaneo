import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import { fakerES as faker } from '@faker-js/faker';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/img`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploader = multer({
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

export {
    __dirname,
    uploader,
    createHash,
    isValidPassword,
    generateProducts
};