"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const moment = require("moment");
const appRoot = require("app-root-path");
const TOKEN_SECRET = require("../../middleware");
const jwt = require("jsonwebtoken");
const winston_1 = require("./../../winston");
exports.category = (req, res) => {
    const API = "GET-https://beta-api.undiundi/prize/categories";
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    db_1.connection.query(`SELECT language FROM profiles WHERE id=${verify.id}`, (err, lang) => {
        const language = lang[0].language.toLowerCase();
        if (language === "en") {
            db_1.connection.query(`SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: err
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data not found",
                            API: API,
                            query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                        });
                        res.send({
                            message: "Can't find data",
                            status: 404,
                            success: 1,
                            data: data
                        });
                    }
                    else {
                        let totalData = data.length;
                        let rows = [];
                        const path = "https://beta-api.undiundi.id/category_prize/";
                        for (let index = 0; index < totalData; index++) {
                            let id = data[index].id;
                            let picture = data[index].picture;
                            rows.push({
                                id: id,
                                picture: path + picture
                            });
                        }
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: { rows }
                        });
                    }
                }
            });
        }
        else if (language === "idn") {
            db_1.connection.query(`SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data not found",
                            API: API,
                            query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                        });
                        res.send({
                            message: "Data Tidak Ditemukan",
                            status: 404,
                            success: 1,
                            data: data
                        });
                    }
                    else {
                        let totalData = data.length;
                        let rows = [];
                        const path = "https://beta-api.undiundi.id/category_prize/";
                        for (let index = 0; index < totalData; index++) {
                            let id = data[index].id;
                            let picture = data[index].picture;
                            rows.push({
                                id: id,
                                picture: path + picture
                            });
                        }
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                        });
                        res.send({
                            message: "Berhasil Mendapatkan Data",
                            status: 200,
                            success: 1,
                            data: { rows }
                        });
                    }
                }
            });
        }
        else {
            db_1.connection.query(`SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: err
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data not found",
                            API: API,
                            query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                        });
                        res.send({
                            message: "Can't find data",
                            status: 404,
                            success: 1,
                            data: data
                        });
                    }
                    else {
                        let totalData = data.length;
                        let rows = [];
                        const path = "https://beta-api.undiundi.id/category_prize/";
                        for (let index = 0; index < totalData; index++) {
                            let id = data[index].id;
                            let picture = data[index].picture;
                            rows.push({
                                id: id,
                                picture: path + picture
                            });
                        }
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: { rows }
                        });
                    }
                }
            });
        }
    });
};
exports.periodIndex = (req, res) => {
    const API = `GET-https://beta-api.undiundi/prize/periodes/${req.params.category}`;
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    db_1.connection.query(`SELECT language FROM profiles WHERE id=${verify.id}`, (err, lang) => {
        const language = lang[0].language.toLowerCase();
        if (language === "en") {
            db_1.connection.query(`SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data not found",
                            API: API,
                            query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                        });
                        res.send({
                            message: "Can't find data",
                            status: 404,
                            success: 1,
                            data: data
                        });
                    }
                    else {
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: data
                        });
                    }
                }
            });
        }
        else if (language === "idn") {
            db_1.connection.query(`SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "gagal mendapatkan data",
                        API: API,
                        err,
                        query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data tidak ditemukan",
                            API: API,
                            query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                        });
                        res.send({
                            message: "data tidak ditemukan",
                            status: 404,
                            success: 1,
                            data: data
                        });
                    }
                    else {
                        winston_1.logger.info({
                            message: "berhasil mendapatkan data",
                            API: API,
                            query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                        });
                        res.send({
                            message: "berhasil mendapatkan data",
                            status: 200,
                            success: 1,
                            data: data
                        });
                    }
                }
            });
        }
        else {
            db_1.connection.query(`SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data not found",
                            API: API,
                            qwuey: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                        });
                        res.send({
                            message: "Can't find data",
                            status: 404,
                            success: 1,
                            data: data
                        });
                    }
                    else {
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: data
                        });
                    }
                }
            });
        }
    });
};
exports.activePeriode = (req, res) => {
    const API = `GET-https://beta-api.undiundi/prize/periode/active/${req.params.category}`;
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    db_1.connection.query(`SELECT language FROM profiles WHERE id=${verify.id}`, (err, lang) => {
        const language = lang[0].language.toLowerCase();
        if (language === "en") {
            db_1.connection.query(`SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`
                    });
                    res.send({ message: "error", status: 400, success: 0, data: {} });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data not found",
                            API: API,
                            query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`
                        });
                        res.send({
                            message: "Can't find data",
                            status: 404,
                            success: 1,
                            data: data[0]
                        });
                    }
                    else {
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: data[0]
                        });
                    }
                }
            });
        }
        else if (language === "idn") {
            db_1.connection.query(`SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`
                    });
                    res.send({ message: "error", status: 400, success: 0, data: {} });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data tidak ditemukan",
                            API: API,
                            query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`
                        });
                        res.send({
                            message: "data tidak ditemukan",
                            status: 404,
                            success: 1,
                            data: data[0]
                        });
                    }
                    else {
                        winston_1.logger.info({
                            message: "berhasil mendapatkan data",
                            API: API,
                            query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`
                        });
                        res.send({
                            message: "berhasil mendapatkan data",
                            status: 200,
                            success: 1,
                            data: data[0]
                        });
                    }
                }
            });
        }
        else {
            db_1.connection.query(`SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`
                    });
                    res.send({ message: "error", status: 400, success: 0, data: {} });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data not found",
                            API: API,
                            query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`
                        });
                        res.send({
                            message: "Can't find data",
                            status: 404,
                            success: 1,
                            data: data[0]
                        });
                    }
                    else {
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${req.params.category}`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: data[0]
                        });
                    }
                }
            });
        }
    });
};
exports.prizesIndex = (req, res) => {
    const API = `GET-https://beta-api.undiundi/prize/${req.params.periode_id}`;
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    db_1.connection.query(`SELECT language FROM profiles WHERE id=${verify.id}`, (err, lang) => {
        const language = lang[0].language.toLowerCase();
        if (language === "en") {
            db_1.connection.query(`SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: err
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data not found",
                            API: API,
                            query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                        });
                        res.send({
                            message: "Can't find data",
                            status: 404,
                            success: 1,
                            data: data
                        });
                    }
                    else {
                        let totalData = data.length;
                        let rows = [];
                        const path = "https://beta-api.undiundi.id/prizes/";
                        for (let index = 0; index < totalData; index++) {
                            let id = data[index].id;
                            let picture = data[index].picture;
                            rows.push({
                                id: id,
                                picture: path + picture
                            });
                        }
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: { rows }
                        });
                    }
                }
            });
        }
        else if (language === "idn") {
            db_1.connection.query(`SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "gagal mendapatkan data",
                        API: API,
                        err,
                        query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: err
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data not found",
                            API: API,
                            query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                        });
                        res.send({
                            message: "data tidak ditemukan",
                            status: 404,
                            success: 1,
                            data: data
                        });
                    }
                    else {
                        let totalData = data.length;
                        let rows = [];
                        const path = "https://beta-api.undiundi.id/prizes/";
                        for (let index = 0; index < totalData; index++) {
                            let id = data[index].id;
                            let picture = data[index].picture;
                            rows.push({
                                id: id,
                                picture: path + picture
                            });
                        }
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                        });
                        res.send({
                            message: "sukses mendapatkan data",
                            status: 200,
                            success: 1,
                            data: { rows }
                        });
                    }
                }
            });
        }
        else {
            db_1.connection.query(`SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: err
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warning({
                            message: "data not found",
                            API: API,
                            query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                        });
                        res.send({
                            message: "Can't find data",
                            status: 404,
                            success: 1,
                            data: data
                        });
                    }
                    else {
                        let totalData = data.length;
                        let rows = [];
                        const path = "https://beta-api.undiundi.id/prizes/";
                        for (let index = 0; index < totalData; index++) {
                            let id = data[index].id;
                            let picture = data[index].picture;
                            rows.push({
                                id: id,
                                picture: path + picture
                            });
                        }
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: { rows }
                        });
                    }
                }
            });
        }
    });
};
exports.inputPeriode = (req, res) => {
    db_1.connection.query(`INSERT INTO periode (periode,promo_type,start_date,end_date,category) value ("${req.body.periode}",2,"${req.body.start_date}","${req.body.end_date}",${req.body.category})`, (err, data) => {
        if (err) {
            res.send({ error: err });
        }
        else {
            res.send("success");
        }
    });
};
