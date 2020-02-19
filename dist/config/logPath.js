"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("file-system");
var dateNow = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
var monthNow = new Date().getMonth() < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
var yearNow = new Date().getFullYear();
exports.logPath = (path) => {
    const file = 'undiundi' + "-" + String(yearNow) + "-" + String(monthNow) + "-" + dateNow + ".log";
    if (!fs.existsSync(path + "/" + yearNow)) {
        fs.mkdirSync(path + "/" + yearNow, 0o777);
    }
    ;
    if (!fs.existsSync(path + "/" + yearNow + "/" + monthNow)) {
        fs.mkdirSync(path + "/" + yearNow + "/" + monthNow, 0o777);
    }
    ;
    if (!fs.existsSync(path + "/" + yearNow + "/" + monthNow + "/" + file)) {
        fs.closeSync(fs.openSync(path + "/" + yearNow + "/" + monthNow + "/" + file, "w"));
    }
    ;
    const filepath = path + "/" + yearNow + "/" + monthNow + "/" + file;
    return filepath;
};
