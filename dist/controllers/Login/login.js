"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const TOKEN_SECRET = require("../../middleware");
const hash = require("password-hash");
const jwt = require('jsonwebtoken');
const winston_1 = require("../../winston");
const helper_1 = require("../../helper/helper");
exports.postLogin = (req, res) => {
    const email = req.body.email;
    db_1.connection.query(`SELECT id, email, password FROM profiles where email='${email}'`, (err, data) => {
        if (err) {
            res.send({
                message: 'Username or Password Incorrect',
                success: 0,
                status: "422",
                data: "",
            });
            winston_1.logger.error({
                message: "Username or Password Incorrect",
                API: 'POST -  https://beta-api.undiundi.id/login',
                query: `SELECT id, email, password FROM profiles where email='${email}'`,
                err
            });
        }
        else {
            if (data.length < 1) {
                res.send({
                    message: 'Username or Password Incorrect',
                    success: 0,
                    status: "422",
                    data: ""
                });
                winston_1.logger.warn({
                    message: "Username or Password Incorrect",
                    API: 'POST -  https://beta-api.undiundi.id/login',
                    query: `SELECT id, email, password FROM profiles where email='${email}'`
                });
            }
            else {
                const password = data[0].password;
                const verifyPassword = hash.verify(req.body.password, password);
                if (verifyPassword === true) {
                    const token = jwt.sign({
                        id: data[0].id
                    }, TOKEN_SECRET.default, {
                        expiresIn: '7d'
                    });
                    res.header('auth-token', token).send({
                        message: "Login Success",
                        token,
                        success: 1,
                        status: "200",
                        data: {
                            token: token
                        }
                    });
                    winston_1.logger.info({
                        timeStamp: helper_1.timeStamp,
                        message: {
                            message: "Login Success",
                            API: 'POST -  https://beta-api.undiundi.id/login',
                            query: `SELECT id, email, password FROM profiles where email='${email}'`
                        }
                    });
                }
                else {
                    res.send({
                        message: 'Username or Password Incorrect',
                        success: 0,
                        status: "422",
                        data: ""
                    });
                    winston_1.logger.warn({
                        message: "Username or Password Incorrect",
                        API: 'POST -  https://beta-api.undiundi.id/login',
                        query: `SELECT id, email, password FROM profiles where email='${email}'`
                    });
                }
            }
        }
        ;
    });
};
