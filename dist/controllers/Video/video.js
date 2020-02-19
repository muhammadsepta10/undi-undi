"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
exports.getVideo = (req, res) => {
    db_1.connection.query(`SELECT * FROM videos ORDER BY created_at DESC LIMIT 4`, (err, rows) => {
        if (err) {
            res.send({
                message: "Get Data Failed",
                success: 0,
                status: "422",
                data: {}
            });
        }
        if (rows.length > 0) {
            res.send({
                message: "Get Data Success",
                success: 1,
                status: "200",
                data: rows
            });
        }
        else {
            res.send({
                message: "Get Data Failed",
                success: 0,
                status: "422",
                data: {}
            });
        }
    });
};
exports.getVideoById = (req, res) => {
    const id = req.params.id;
    db_1.connection.query(`SELECT * FROM videos WHERE id=${id}`, (err, rows) => {
        if (err) {
            res.send({
                message: "Get Data Failed",
                success: 0,
                status: "422",
                data: {}
            });
        }
        if (rows.length > 0) {
            res.send({
                message: "Get Data Success",
                success: 1,
                status: "200",
                data: rows
            });
        }
        else {
            res.send({
                message: "Get Data Failed",
                success: 0,
                status: "422",
                data: {}
            });
        }
    });
};
