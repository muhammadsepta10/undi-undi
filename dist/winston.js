"use strict";
const appRoot = require('app-root-path');
const winston = require('winston');
const date = new Date();
//winston configuration
const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        colorize: false,
        timestamp: date.getTime
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: 'false',
        colorize: 'true',
    },
};
// call winston class 
const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(+new Date()), winston.format.json()),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console()
    ],
    exitOnError: false,
});
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};
// export const stream = {
//     write: logger.info
// };
// export default logger
module.exports = logger;
