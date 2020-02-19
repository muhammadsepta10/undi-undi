"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appRoot = require("app-root-path");
const logPath = require("./config/logPath");
const winston = require('winston');
const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6,
        custom: 7
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta',
        custom: 'yellow'
    }
};
exports.logger = winston.createLogger({
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint()),
    transports: [new winston.transports.File({ filename: logPath.logPath(`${appRoot}/logs/undi-undi`) })]
});
