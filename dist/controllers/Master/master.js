"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const winston_1 = require("../../winston");
exports.getMasterKota = (req, res) => {
    db_1.connection.query(`SELECT * FROM code_regency`, (err, rows) => {
        if (err) {
            res.send({
                message: "Get Data Failed",
                success: 0,
                status: "422",
                data: {},
            });
            winston_1.logger.error({
                message: "Get Data Failed",
                API: 'GET -  https://beta-api.undiundi.id/master/city/all',
                query: `SELECT * FROM code_regency`,
                err
            });
        }
        else {
            if (rows.length > 0) {
                res.send({
                    message: "Get Data Success",
                    success: 1,
                    status: "200",
                    data: rows
                });
                winston_1.logger.info({
                    message: "Get Data Success",
                    API: 'GET -  https://beta-api.undiundi.id/master/city/all',
                    query: `SELECT * FROM code_regency`
                });
            }
            else {
                res.send({
                    message: "Data Not Found",
                    success: 0,
                    status: "404",
                    data: {},
                });
                winston_1.logger.warn({
                    message: "Data Not Found",
                    API: 'GET -  https://beta-api.undiundi.id/master/city/all',
                    query: `SELECT * FROM code_regency`
                });
            }
        }
    });
};
