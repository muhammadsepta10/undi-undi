"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//create connection to mysql
const mysql = require("mysql");
const winston_1 = require("./winston");
exports.connection = mysql.createPool({
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // host: '10.2.16.147',
    // user: 'root',
    // password: 'Und1Und12020**',
    host: "10.2.16.147" || "localhost",
    user: "rizki" || "root",
    password: "R1zk!" || "Und1Und12020**",
    database: "undiundi"
});
exports.connection.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            winston_1.logger.error("Database undiundi connection was closed.");
            console.error("Database undiundi connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            winston_1.logger.error("Database undiundi has too many connections.");
            console.error("Database undiundi has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
            winston_1.logger.error("Database undiundi connection was refused.");
            console.error("Database undiundi connection was refused.");
        }
    }
    if (connection)
        connection.release();
    return;
});
exports.emailSenderConnection = mysql.createPool({
    host: "192.168.1.209" || "localhost",
    user: "yusuf",
    password: "yusuf2019**",
    database: "db_email"
    // 192.168.1.209
});
exports.emailSenderConnection.getConnection((err, emailSenderConnection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            winston_1.logger.error("Database engine connection was closed.");
            console.error("Database engine connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            winston_1.logger.error("Database engine has too many connections.");
            console.error("Database engine has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
            winston_1.logger.error("Database engine connection was refused.");
            console.error("Database engine connection was refused.");
        }
    }
    if (emailSenderConnection)
        emailSenderConnection.release();
    return;
});
// export default connection;
