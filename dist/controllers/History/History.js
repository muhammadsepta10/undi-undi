"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const TOKEN_SECRET = require("../../middleware");
const jwt = require("jsonwebtoken");
exports.getHistory = (req, res) => {
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    db_1.connection.query(`SELECT count(*) as total FROM transactions WHERE transactions.profile_id = ${verify.id}`, (err, data) => {
        if (err) {
            res.send({ message: "error", status: 400, success: 0, data: [err] });
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
                const page = req.query.page;
                const totalData = data[0].total;
                const dataPerPage = 10;
                const totalPage = Math.ceil(totalData / dataPerPage);
                const currentPage = parseInt(page !== undefined ? page : 1);
                const firstData = dataPerPage * currentPage - dataPerPage;
                const nextPage = currentPage === totalPage
                    ? null
                    : "http://beta-api.undiundi.id/history" +
                        "?page=" +
                        (currentPage + 1);
                const prevPage = currentPage === 1
                    ? null
                    : "http://beta-api.undiundi.id/history" +
                        "?page=" +
                        (currentPage - 1);
                db_1.connection.query(`SELECT profile_id,coupon,transactions.id as transactions_id,entries.id as entries_id,created_at,transactions.activity,transactions.type_transaction FROM transactions JOIN entries ON entries.trans_id = transactions.id WHERE transactions.profile_id = ${verify.id} ORDER BY transactions.id ASC LIMIT ${firstData}, ${dataPerPage}`, (err, data) => {
                    if (err) {
                        res.send({
                            message: "error",
                            status: 400,
                            success: 0,
                            data: [err]
                        });
                    }
                    else {
                        if (data.length < 1) {
                            res.send({
                                message: "Can't find data",
                                status: 404,
                                success: 1,
                                data: {
                                    dataPerPage: dataPerPage,
                                    totalData: totalData,
                                    totalPage: totalPage,
                                    nextPage: null,
                                    prevPage: null,
                                    data
                                }
                            });
                        }
                        else {
                            res.send({
                                message: "success to get data",
                                status: 200,
                                success: 1,
                                data: {
                                    dataPerPage: dataPerPage,
                                    totalData: totalData,
                                    totalPage: totalPage,
                                    nextPage: nextPage,
                                    prevPage: prevPage,
                                    data
                                }
                            });
                        }
                    }
                });
            }
        }
    });
};
exports.photoCoupon = (req, res) => {
    db_1.connection.query(`SELECT photo,path from entries WHERE trans_id = ${req.params.id}`, (err, data) => {
        if (err) {
            res.send({ message: "error", status: 400, success: 0, data: err });
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
                    status: 404,
                    success: 1,
                    data: `${data[0].path}${data[0].photo}`
                });
            }
        }
    });
};
exports.detaileHistory = (req, res) => {
    db_1.connection.query(`SELECT receive_date,sender,media,coupon,status,is_valid from entries WHERE id=${req.params.entries_id}`, (err, data) => {
        if (err) {
            res.send({ message: "error", status: 400, success: 0, data: err });
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
                    status: 404,
                    success: 1,
                    data: data
                });
            }
        }
    });
};
