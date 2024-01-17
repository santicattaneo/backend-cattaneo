import winston from 'winston';

// const ENVIRONMENT = 'develop';
// let logger;

// if(ENVIRONMENT === 'production') {
//     logger = winston.createLogger({
//         transports: [
//             new winston.transports.Console({
//                 level: 'http'
//             }),
//             new winston.transports.File({
//                 filename: 'logs/production.log',
//                 level: 'warn',
//             })
//         ]
//     });
// } else {
//     logger = winston.createLogger({
//         transports: [
//             new winston.transports.Console({
//                 level: 'verbose'
//             })
//         ]
//     });
// }

//definir logger y definir transporte
// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console({
//             level: 'info'
//         }),
//         new winston.transports.File({
//             filename: 'logs/dev.log',
//             level: 'warn',

//         })
//     ]
// });

const customLevelOptions = {
    levels: {
        error: 0,
        warning: 1,
        info: 2,
        debug: 3
    },
    colors: {
        error: 'red',
        warning: 'yellow',
        info: 'green',
        debug: 'blue'
    }
};

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({
                    all: true,
                    colors: customLevelOptions.colors
                }),
                winston.format.simple()
            )
        }) 
    ]
});

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next();
};