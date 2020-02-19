"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const winston_1 = require("./../../winston");
const TOKEN_SECRET = require("../../middleware");
const jwt = require("jsonwebtoken");
exports.getBanner = (req, res) => {
    const API = "GET-https://beta-api.undiundi/Banner";
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    const path = "https://beta-api.undiundi.id/banner/";
    db_1.connection.query(`SELECT language FROM profiles WHERE id=${verify.id}`, (err, lang) => {
        const language = lang[0].language.toLowerCase();
        db_1.connection.query(`SELECT image_url,link_url,link_url FROM banner`, (err, data) => {
            if (language === "en") {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data banner",
                        API: API,
                        err,
                        query: `SELECT image_url,link_url,link_url FROM banner`
                    });
                    res.send({ message: "error", status: 400, success: 0, data: {} });
                }
                else {
                    if (data.length > 0) {
                        let totalData = data.length;
                        let rows = [];
                        for (let index = 0; index < totalData; index++) {
                            let id = data[index].id;
                            let picture = data[index].image_url;
                            let link = data[index].link_url;
                            rows.push({
                                picture: path + picture,
                                link: link
                            });
                        }
                        winston_1.logger.info({
                            message: "success get data banner",
                            API: API,
                            query: `SELECT image_url,link_url,link_url FROM banner`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: { rows }
                        });
                    }
                    else {
                        winston_1.logger.warn({
                            message: "data not found",
                            API: API,
                            query: `SELECT image_url,link_url,link_url FROM banner`
                        });
                        res.send({
                            message: "Data Not Found",
                            status: 404,
                            succes: 1,
                            data: {}
                        });
                    }
                }
            }
            else if (language === "id") {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data banner",
                        API: API,
                        err,
                        query: `SELECT image_url,link_url,link_url FROM banner`
                    });
                    res.send({ message: "error", status: 400, success: 0, data: {} });
                }
                else {
                    if (data.length > 0) {
                        let totalData = data.length;
                        let rows = [];
                        for (let index = 0; index < totalData; index++) {
                            let id = data[index].id;
                            let picture = data[index].image_url;
                            let link = data[index].link_url;
                            rows.push({
                                picture: path + picture,
                                link: link
                            });
                        }
                        winston_1.logger.info({
                            message: "success to get data",
                            API: API,
                            query: `SELECT image_url,link_url,link_url FROM banner`
                        });
                        res.send({
                            message: "sukses mendapatkan data",
                            status: 200,
                            success: 1,
                            data: { rows }
                        });
                    }
                    else {
                        winston_1.logger.warn({
                            message: "data not found",
                            API: API,
                            query: `SELECT image_url,link_url,link_url FROM banner`
                        });
                        res.send({
                            message: "Data tidak ditemukan",
                            status: 404,
                            succes: 1,
                            data: {}
                        });
                    }
                }
            }
            else {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data banner",
                        API: API,
                        err,
                        query: `SELECT image_url,link_url,link_url FROM banner`
                    });
                    res.send({ message: "error", status: 400, success: 0, data: {} });
                }
                else {
                    if (data.length > 0) {
                        let totalData = data.length;
                        let rows = [];
                        for (let index = 0; index < totalData; index++) {
                            let id = data[index].id;
                            let picture = data[index].image_url;
                            let link = data[index].link_url;
                            rows.push({
                                picture: path + picture,
                                link: link
                            });
                        }
                        winston_1.logger.info({
                            message: "success to get data",
                            API: API,
                            query: `SELECT image_url,link_url,link_url FROM banner`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: { rows }
                        });
                    }
                    else {
                        winston_1.logger.warn({
                            message: "data not found",
                            API: API,
                            query: `SELECT image_url,link_url,link_url FROM banner`
                        });
                        res.send({
                            message: "Data Not Found",
                            status: 404,
                            succes: 1,
                            data: {}
                        });
                    }
                }
            }
        });
    });
};
