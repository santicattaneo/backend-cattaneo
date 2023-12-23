import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

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

export {
    __dirname,
    uploader,
    createHash,
    isValidPassword
};