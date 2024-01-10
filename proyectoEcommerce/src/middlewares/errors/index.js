import EErrors from "./enums.js";

export default (error, req, res, next) => {
    switch(error.code) {
        case EErrors.INVALID_CREDENTIALS:
            res.status(400).send({
                status: 'error',
                error: error.name,
                description: error.cause
            });
        case EErrors.INTERNAL_SERVER_ERROR:
            res.status(500).send({
                status: 'error',
                error: error.name,
                description: error.cause
            });
        default:
            res.status(500).send({
                status: 'error',
                error: error.name,
                description: error.cause
            });
    };
    next();
};