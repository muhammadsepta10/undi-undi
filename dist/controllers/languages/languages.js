"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
exports.indexLanguages = (req, res) => {
    db_1.connection.query("SELECT * FROM languages", (err, data) => {
        if (err) {
            res.send({ message: "failed get data", err });
        }
        else {
            res.send({ message: "succes get data", data });
            db_1.connection.release();
        }
    });
};
exports.showLanguages = (req, res) => {
    db_1.connection.query(`SELECT * FROM languages WHERE id=${req.params.id}`, (err, data) => {
        if (err) {
            res.send({ message: "failed to get data", err });
        }
        else {
            res.send(data[0]);
        }
    });
};
exports.postLanguages = (req, res) => {
    db_1.connection.query(`INSERT INTO languages (language,code) VALUES ('${req.body.language}','${req.body.code}')`, (err, data) => {
        if (err) {
            res.status(400).send({ message: "invalid", err });
        }
        else {
            res.send(data);
        }
    });
};
exports.putLanguages = (req, res) => {
    db_1.connection.query(` UPDATE languages SET language='${req.body.language}' code='${req.body.code}' WHERE id=${req.params.id} `, (err, data) => {
        if (err) {
            res.send({ message: err.message, error: err.errno });
        }
        else {
            res.send(data);
        }
    });
};
exports.deleteLanguages = (req, res) => {
    db_1.connection.query(`DELETE FROM languages WHERE id=${req.params.id}`, (err, data) => {
        if (err) {
            res.send({ messages: "error to destroy the files", err });
        }
        else {
            res.send({ messages: "success to destroy the file" });
        }
    });
};
