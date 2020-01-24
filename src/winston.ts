const appRoot = require('app-root-path')
const winston = require('winston')

//winston configuration
const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // max file size 5mb
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: 'false',
        colorize: 'true'
    },
};

// call winston class 
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // make apps not stop if any exception
})

// logger.stream = {
//     write: function(message, encoding) {
//         logger.info(message)
//     },
// };

export const stream = {
    write: logger.info
};

module.exports = logger