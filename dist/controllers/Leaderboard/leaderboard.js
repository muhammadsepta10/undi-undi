"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const moment = require("moment");
const TOKEN_SECRET = require("../../middleware");
const jwt = require('jsonwebtoken');
const winston_1 = require("../../winston");
exports.getLeaderboardByPeriodId = (req, res) => {
    const period_id = req.params.period_id;
    db_1.connection.query(`SELECT count(*) as total from leaderboard WHERE period_id = ${period_id}`, (err, data) => {
        if (err) {
            res.send({
                message: "Get Data Failed",
                success: 0,
                status: "422",
                data: {},
            });
            winston_1.logger.error({
                message: 'Get Data Failed',
                API: `GET - https://beta-api.undiundi.id/leaderboard/${period_id}`,
                query: `SELECT count(*) as total from leaderboard WHERE period_id = ${period_id}`,
                err
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
                : "https://beta-api.undiundi.id/leaderboard/" + period_id + "?page=" +
                    (currentPage + 1);
            const prevPage = currentPage === 1
                ? null
                : "https://beta-api.undiundi.id/leaderboard/" + period_id + "?page=" +
                    (currentPage - 1);
            db_1.connection.query(`SELECT leaderboard.id AS leaderboardId, period_id, point, rank, created_at, profiles.id AS profileId, profiles.accountname, profiles.fullname, profiles.user_id
        FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE period_id = ${period_id} ORDER BY rank ASC LIMIT ${firstData}, ${dataPerPage}`, (err, rows) => {
                if (err) {
                    res.send({
                        message: "Get Data Failed",
                        success: 0,
                        status: "422",
                        data: {},
                    });
                    winston_1.logger.error({
                        message: 'Get Data Failed',
                        API: `GET - https://beta-api.undiundi.id/leaderboard/${period_id}`,
                        query: `SELECT leaderboard.id AS leaderboardId, period_id, point, rank, created_at, profiles.id AS profileId, profiles.accountname, profiles.fullname, profiles.user_id
                FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE period_id = ${period_id} ORDER BY rank ASC LIMIT ${firstData}, ${dataPerPage}`,
                        err
                    });
                }
                else {
                    if (rows.length > 0) {
                        res.send({
                            message: "Get Data Success",
                            success: 1,
                            status: "200",
                            data: {
                                dataPerPage: dataPerPage,
                                totalData: totalData,
                                totalPage: totalPage,
                                nextPage: nextPage,
                                prevPage: prevPage,
                                rows
                            }
                        });
                        winston_1.logger.info({
                            message: 'Get Data Success',
                            API: `GET - https://beta-api.undiundi.id/leaderboard/${period_id}`,
                            query: `SELECT leaderboard.id AS leaderboardId, period_id, point, rank, created_at, profiles.id AS profileId, profiles.accountname, profiles.fullname, profiles.user_id
                  FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE period_id = ${period_id} ORDER BY rank ASC LIMIT ${firstData}, ${dataPerPage}`
                        });
                    }
                    else {
                        res.send({
                            message: "Data Not Found",
                            success: 1,
                            status: "404",
                            data: {
                                dataPerPage: dataPerPage,
                                totalData: totalData,
                                totalPage: totalPage,
                                nextPage: null,
                                prevPage: null,
                                rows
                            }
                        });
                        winston_1.logger.warn({
                            message: "Data Not Found",
                            API: `GET - https://beta-api.undiundi.id/leaderboard/${period_id}`,
                            query: `SELECT leaderboard.id AS leaderboardId, period_id, point, rank, created_at, profiles.id AS profileId, profiles.accountname, profiles.fullname, profiles.user_id
                  FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE period_id = ${period_id} ORDER BY rank ASC LIMIT ${firstData}, ${dataPerPage}`
                        });
                    }
                }
            });
        }
    });
};
exports.searchLeaderboardByPeriodId = (req, res) => {
    const period_id = req.params.period_id;
    const search = req.params.params;
    const dataPerPage = 10;
    const page = req.query.page;
    const currentPage = parseInt(page !== undefined ? page : 1);
    const firstData = dataPerPage * currentPage - dataPerPage;
    db_1.connection.query(`SELECT leaderboard.id AS leaderboardId, period_id, point, rank, created_at, profiles.id AS profileId, profiles.accountname, profiles.fullname, profiles.user_id
        FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE period_id = ${period_id} AND (profiles.handphone LIKE "%${search}%" OR 
        profiles.accountname LIKE "%${search}%" OR profiles.fullname LIKE "%${search}%" OR profiles.email LIKE "%${search}%") ORDER BY rank ASC LIMIT ${firstData}, ${dataPerPage}`, (err, rows) => {
        if (err) {
            res.send({
                message: "Get Data Failed",
                success: 0,
                status: "422",
                data: {},
            });
            winston_1.logger.error({
                message: 'Get Data Failed',
                API: `GET - https://beta-api.undiundi.id/leaderboard/search/${period_id}/${search}`,
                query: `SELECT leaderboard.id AS leaderboardId, period_id, point, rank, created_at, profiles.id AS profileId, profiles.accountname, profiles.fullname, profiles.user_id
          FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE period_id = ${period_id} AND (profiles.handphone LIKE "%${search}%" OR 
          profiles.accountname LIKE "%${search}%" OR profiles.fullname LIKE "%${search}%" OR profiles.email LIKE "%${search}%") ORDER BY rank ASC LIMIT ${firstData}, ${dataPerPage}`,
                err
            });
        }
        else {
            const totalData = rows.length;
            const totalPage = Math.ceil(totalData / dataPerPage);
            const nextPage = currentPage === totalPage
                ? null
                : "https://beta-api.undiundi.id/leaderboard/" + period_id + "?page=" +
                    (currentPage + 1);
            const prevPage = currentPage === 1
                ? null
                : "https://beta-api.undiundi.id/leaderboard/" + period_id + "?page=" +
                    (currentPage - 1);
            if (rows.length > 0) {
                res.send({
                    message: "Get Data Success",
                    success: 1,
                    status: "200",
                    data: {
                        dataPerPage: dataPerPage,
                        totalData: totalData,
                        totalPage: totalPage,
                        nextPage: nextPage,
                        prevPage: prevPage,
                        rows
                    }
                });
                winston_1.logger.info({
                    message: 'Get Data Success',
                    API: `GET - https://beta-api.undiundi.id/leaderboard/search/${period_id}/${search}`,
                    query: `SELECT leaderboard.id AS leaderboardId, period_id, point, rank, created_at, profiles.id AS profileId, profiles.accountname, profiles.fullname, profiles.user_id
            FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE period_id = ${period_id} AND (profiles.handphone LIKE "%${search}%" OR 
            profiles.accountname LIKE "%${search}%" OR profiles.fullname LIKE "%${search}%" OR profiles.email LIKE "%${search}%") ORDER BY rank ASC LIMIT ${firstData}, ${dataPerPage}`
                });
            }
            else {
                res.send({
                    message: "Data Not Found",
                    success: 1,
                    status: "404",
                    data: {
                        dataPerPage: dataPerPage,
                        totalData: totalData,
                        totalPage: totalPage,
                        nextPage: null,
                        prevPage: null,
                    }
                });
                winston_1.logger.warn({
                    message: 'Data Not Found',
                    API: `GET - https://beta-api.undiundi.id/leaderboard/search/${period_id}/${search}`,
                    query: `SELECT leaderboard.id AS leaderboardId, period_id, point, rank, created_at, profiles.id AS profileId, profiles.accountname, profiles.fullname, profiles.user_id
            FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE period_id = ${period_id} AND (profiles.handphone LIKE "%${search}%" OR 
            profiles.accountname LIKE "%${search}%" OR profiles.fullname LIKE "%${search}%" OR profiles.email LIKE "%${search}%") ORDER BY rank ASC LIMIT ${firstData}, ${dataPerPage}`
                });
            }
        }
    });
};
exports.getLeaderboardPeriod = (req, res) => {
    db_1.connection.query(`SELECT id, periode FROM periode WHERE promo_type = 1`, (err, rows) => {
        if (err) {
            res.send({
                message: "Get Data Failed",
                success: "0",
                status: "422",
                data: ""
            });
            winston_1.logger.error({
                message: 'Get Data Failed',
                API: `GET - https://beta-api.undiundi.id/leaderboard/period/all`,
                query: `SELECT id, periode FROM periode WHERE promo_type = 1`,
                err
            });
        }
        else {
            if (rows.length > 0) {
                res.send({
                    message: "Get Data Success",
                    success: "1",
                    status: "200",
                    data: rows
                });
                winston_1.logger.info({
                    message: 'Get Data Success',
                    API: `GET - https://beta-api.undiundi.id/leaderboard/period/all`,
                    query: `SELECT id, periode FROM periode WHERE promo_type = 1`
                });
            }
            else {
                res.send({
                    message: "Data Not Found",
                    success: "0",
                    status: "404",
                    data: rows
                });
                winston_1.logger.warn({
                    message: 'Data Not Found',
                    API: `GET - https://beta-api.undiundi.id/leaderboard/period/all`,
                    query: `SELECT id, periode FROM periode WHERE promo_type = 1`
                });
            }
        }
    });
};
exports.getActiveLeaderboardPeriod = (req, res) => {
    db_1.connection.query(`SELECT id, periode FROM periode WHERE promo_type = 1 AND start_date <= '${moment().format("YYYY-MM-DD")}' AND end_date > '${moment().format("YYYY-MM-DD")}' `, (err, rows) => {
        if (err) {
            res.send({
                message: "Get Data Failed",
                success: "0",
                status: "400",
                data: ""
            });
            winston_1.logger.error({
                message: 'Get Data Failed',
                API: `GET - https://beta-api.undiundi.id/leaderboard/period/active`,
                query: `SELECT id, periode FROM periode WHERE promo_type = 1 AND start_date <= '${moment().format("YYYY-MM-DD")}' AND end_date > '${moment().format("YYYY-MM-DD")}' `,
                err
            });
        }
        else {
            if (rows.length > 0) {
                res.send({
                    message: "Get Data Success",
                    success: "1",
                    status: "200",
                    data: rows
                });
                winston_1.logger.info({
                    message: 'Get Data Success',
                    API: `GET - https://beta-api.undiundi.id/leaderboard/period/active`,
                    query: `SELECT id, periode FROM periode WHERE promo_type = 1 AND start_date <= '${moment().format("YYYY-MM-DD")}' AND end_date > '${moment().format("YYYY-MM-DD")}' `,
                });
            }
            else {
                res.send({
                    message: "Data Not Found",
                    success: "0",
                    status: "404",
                    data: rows
                });
                winston_1.logger.warn({
                    message: 'Data Not Found',
                    API: `GET - https://beta-api.undiundi.id/leaderboard/period/active`,
                    query: `SELECT id, periode FROM periode WHERE promo_type = 1 AND start_date <= '${moment().format("YYYY-MM-DD")}' AND end_date > '${moment().format("YYYY-MM-DD")}' `,
                });
            }
        }
    });
};
exports.getCurrentUserLeaderboardbyPeriod = (req, res) => {
    const period_id = req.params.period_id;
    const token = req.header('auth-token');
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    db_1.connection.query(`SELECT rank, point FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE profiles.id = '${verify.id}' AND leaderboard.period_id = '${period_id}'`, (err, rows) => {
        if (err) {
            res.send({
                message: "Get Data Failed",
                success: "0",
                status: "400",
                data: ""
            });
            winston_1.logger.error({
                message: 'Get Data Failed',
                API: `GET - https://beta-api.undiundi.id/leaderboard/user/${period_id}`,
                query: `SELECT rank, point FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE profiles.id = '${verify.id}' AND leaderboard.period_id = '${period_id}'`,
                err
            });
        }
        else {
            if (rows.length > 0) {
                res.send({
                    message: "Get Data Success",
                    success: "1",
                    status: "200",
                    data: rows
                });
                winston_1.logger.info({
                    message: 'Get Data Success',
                    API: `GET - https://beta-api.undiundi.id/leaderboard/user/${period_id}`,
                    query: `SELECT rank, point FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE profiles.id = '${verify.id}' AND leaderboard.period_id = '${period_id}'`
                });
            }
            else {
                res.send({
                    message: "Data Not Found",
                    success: "0",
                    status: "404",
                    data: {}
                });
                winston_1.logger.warn({
                    message: 'Data Not Found',
                    API: `GET - https://beta-api.undiundi.id/leaderboard/user/${period_id}`,
                    query: `SELECT rank, point FROM leaderboard INNER JOIN profiles ON profiles.id = leaderboard.profile_id WHERE profiles.id = '${verify.id}' AND leaderboard.period_id = '${period_id}'`
                });
            }
        }
    });
};
