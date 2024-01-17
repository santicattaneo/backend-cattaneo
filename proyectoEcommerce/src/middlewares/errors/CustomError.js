import EErrors from "./enums.js";

export default class CustomError {
    static createError({ name = 'Error', cause, message, code = 1 }) {
        let error = new Error(message,{ cause });
        error.name = name;
        error.code = code;
        return error;
    };

    static ServerError() {
        throw CustomError.createError({
            name: 'ServerError',
            cause: 'Internal server error',
            message: 'Server error, try again later',
            code: EErrors.INTERNAL_SERVER_ERROR
        });
    };
};