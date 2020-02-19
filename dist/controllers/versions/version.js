"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const moment = require("moment");
// get all data version  version
exports.indexVersion = (req, res) => {
    db_1.connection.query("SELECT platform,version, last_update,changes  FROM versions", (err, data) => {
        if (err) {
            res.send({
                message: "you query error",
                success: 0,
                status: 400,
                data: err
            });
        }
        else {
            if (data.length < 1) {
                res.send({
                    message: "Can't find data",
                    status: 404,
                    success: 1,
                    data: data
                });
            }
            else {
                res.send({
                    message: "success to get data",
                    status: 200,
                    success: 1,
                    data: data
                });
            }
        }
    });
};
// get version by platform
exports.showVersion = (req, res) => {
    const platform = req.params.platform;
    const lowerPlatform = platform.toLowerCase();
    db_1.connection.query(`SELECT platform,version, last_update,changes  FROM versions WHERE platform="${lowerPlatform}" ORDER BY last_update DESC LIMIT 1`, (err, data) => {
        if (err) {
            res.send({
                message: "you query error",
                success: 0,
                status: 400,
                data: err
            });
        }
        else {
            if (data.length < 1) {
                res.send({
                    message: "Can't find data",
                    status: 404,
                    success: 1,
                    data: data
                });
            }
            else {
                res.send({
                    message: "success to get data",
                    status: 200,
                    success: 1,
                    data: data
                });
            }
        }
    });
};
// chceck last update vrsion by platform
exports.showUpdateVersion = (req, res) => {
    const platform = req.params.platform;
    const lowerPlatform = platform.toLowerCase();
    db_1.connection.query(`SELECT platform,version, last_update,changes  FROM versions WHERE platform="${lowerPlatform}" ORDER BY last_update DESC LIMIT 1`, (err, data) => {
        if (err) {
            res.send({
                message: "you query error",
                success: 0,
                status: 400,
                data: []
            });
        }
        else {
            if (data.length < 1) {
                res.send({
                    message: "Can't find data",
                    status: 404,
                    success: 1,
                    data: []
                });
            }
            else {
                const checkVersion = data[0].version === req.params.version;
                if (checkVersion) {
                    res.send({
                        message: "your aplication version is up to date",
                        status: 200,
                        success: 1,
                        data: []
                    });
                }
                else {
                    res.send({
                        message: "please update you aplication version",
                        status: 200,
                        success: 1,
                        data: []
                    });
                }
            }
        }
    });
};
// show version by id
exports.showVersionById = (req, res) => {
    db_1.connection.query(`SELECT id,platform,version,last_update,changes  FROM versions WHERE id=${req.params.id}`, (err, data) => {
        if (err) {
            res.send({
                message: "you query error",
                success: 0,
                status: 400,
                data: []
            });
        }
        else {
            if (data.length < 1) {
                res.send({
                    message: "Can't find data",
                    status: 404,
                    success: 1,
                    data: []
                });
            }
            else {
                res.send({
                    message: "success to get data",
                    status: 200,
                    success: 1,
                    data: data
                });
            }
        }
    });
};
// input version
exports.postVersion = (req, res) => {
    const bodyPlatform = req.body.platform;
    const platform = bodyPlatform.toLowerCase();
    db_1.connection.query(`SELECT version,platform FROM versions WHERE platform="${platform}" AND version="${req.body.version}"`, (err, data) => {
        if (err) {
            res.send({
                message: "you query error",
                success: 0,
                status: 400,
                data: []
            });
        }
        else {
            if (data.length < 1) {
                db_1.connection.query(`INSERT INTO versions (platform,version,last_update,changes) VALUES('${req.body.platform}','${req.body.version}','${moment().format("YYYY-MM-DD h:mm:ss")}','${req.body.changes}')`, (err, data) => {
                    if (err) {
                        res.send({
                            message: "you query error",
                            success: 0,
                            status: 400,
                            data: []
                        });
                    }
                    else {
                        if (data.length < 1) {
                            res.send({
                                message: "failed to input data",
                                status: 404,
                                success: 1,
                                data: []
                            });
                        }
                        else {
                            res.send({
                                message: "success to input data",
                                status: 200,
                                success: 1,
                                data: []
                            });
                        }
                    }
                });
            }
            else {
                res.send({
                    message: `your ${req.body.platform} version input is alredy exists, please change your coloum version`,
                    status: 200,
                    success: 1,
                    data: []
                });
            }
        }
    });
};
// tidak terpakai
exports.showVersionByPlatform = (req, res) => {
    const platform = req.params.platform.toLowerCase();
    db_1.connection.query(`SELECT *  FROM versions WHERE platform="${platform}"`, (err, data) => {
        if (err) {
            res.send({ message: "error", error: err });
        }
        else {
            res.send(data[0]);
        }
    });
};
exports.putVersion = (req, res) => {
    db_1.connection.query(`UPDATE versions SET platform=${req.body.platform},version=${req.body.version} WHERE id=${req.params.id}`, (err, data) => {
        if (err) {
            res.send({ message: "error", error: err });
        }
        else {
            res.send(data);
        }
    });
};
exports.deleteVersion = (req, res) => {
    db_1.connection.query(`DELETE from versions WHERE id=${req.params.id}`, (err, data) => {
        if (err) {
            res.send({ message: "error", error: err });
        }
        else {
            res.send(data);
        }
    });
};
