import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (plainPassword, hashedPassword) => bcrypt.compareSync(plainPassword, hashedPassword);

export{
    __dirname,
    createHash,
    isValidPassword
};