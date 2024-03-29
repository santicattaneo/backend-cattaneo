//esta capa es la mas importante del proyecto
//contiene la logica de negocio

import UsersRepository from "../repositories/users.repository.js";
import { Users } from "../dao/factory.js";
import { InvalidCredentials, UserAlreadyExists } from '../utils/custom.exceptions.js';
import { loginInvalidCredentials } from "../utils/custom.html.js";
import { sendEmail } from "./mail.service.js";

const usersDao = new Users()
const usersRepository = new UsersRepository(usersDao);

const getByEmail = async (email) => {
    const user = await usersRepository.getByEmail(email);
    if(!user) {
        throw new InvalidCredentials('user not found');
    };
    return user;
};

const login = async (password, email) => {
    const user = await usersRepository.getByEmail(email);

    if(!user) throw new InvalidCredentials('incorrect credentials')

    const comparePassword = isValidPassword(password, user.password);
    if(!comparePassword) {
        const emailInvalidCredentials = {
            to: user.email,
            subjet: 'Logid fallido',
            html: loginInvalidCredentials
        };
        await sendEmail(emailInvalidCredentials);

        throw new InvalidCredentials('incorrect credentials');
    }

    const accessToken = generateToken(user);
    return accessToken;
};

const register = async (user) => {
    const userByEmail = await usersRepository.getByEmail(user.email);
    if(userByEmail) {
        throw new UserAlreadyExists('user already exists');
    };

    const hashedPassword = createHash(password);
    const newUser = { ...user };
    newUser.password = hashedPassword;

    const result = await usersRepository.save(newUser);
    return result
};

export {
    login,
    register,
    usersRepository
};