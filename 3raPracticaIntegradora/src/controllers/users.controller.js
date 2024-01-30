//RESPONSABILIDADES DE LA CAPA DE CONTROLLERS
//recibir la peticion del cliente
//hacer validaciones basicas

import { UserAlreadyExists } from "../utils/custom.exceptions.js";

//responder a nuestros clientes
const register = async (req, res) => {
    //trycatch siempre en esta capa
    try {
        const { first_name, last_name, role, email, password } = req.body;
        if(!first_name || !last_name || !role || !email || !password ) return res.sendClientError('incomplete values');    
        const result = await usersService.register({ ...req.body })
        res.sendSuccessNewResourse(result);
    } catch (error) {
        if (error instanceof UserAlreadyExists) {
            return res.sendClientError(error.message);
        };
        res.sendServerError(error.message);
    } ;
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password ) return res.sendClientError('incomplete values');

        const accessToken = await usersService.login(password, email);

        res.sendSuccess(accessToken);
    } catch (error) {
        if (error instanceof InvalidCredentials) {
            return res.sendClientError(error.message);
        };
        res.sendServerError(error.message);
    };
};

export {
    register,
    login
};