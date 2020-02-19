"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const TOKEN_SECRET = require("../../middleware");
const jwt = require("jsonwebtoken");
const winston_1 = require("../../winston");
exports.getUserById = (req, res) => {
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    // console.log(verify.id);
    db_1.connection.query(`SELECT id, accountname, user_id, handphone, identity, address, city, province, ref_code, language FROM profiles WHERE id=${verify.id}`, (err, rows) => {
        if (err) {
            res.send({
                message: "Failed get data",
                success: "0",
                status: "",
                data: "",
                err
            });
            winston_1.logger.error({
                message: "Get Data Failed",
                API: `GET -  https://beta-api.undiundi.id/profiles/id`,
                query: `SELECT id, accountname, user_id, handphone, identity, address, city, province, ref_code, language FROM profiles WHERE id=${verify.id}`,
                err
            });
        }
        else {
            res.send({
                message: "Get Data Success",
                success: "1",
                status: "200",
                data: rows[0]
            });
            winston_1.logger.info({
                message: "Get Data Success",
                API: `GET -  https://beta-api.undiundi.id/profiles/id`,
                query: `SELECT id, accountname, user_id, handphone, identity, address, city, province, ref_code, language FROM profiles WHERE id=${verify.id}`,
            });
        }
    });
};
exports.updateProfiles = (req, res) => {
    const keyName = req.params.params;
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    const value = req.body.value;
    db_1.connection.query(`UPDATE profiles SET ${keyName}='${value}' WHERE id=${verify.id}`, (err, rows) => {
        if (err) {
            if (err.errno) {
                if (err.errno === 1062) {
                    res.send({
                        message: "Duplicate Entry",
                        success: "0",
                        status: "422",
                        data: "",
                    });
                    winston_1.logger.error({
                        message: "Duplicate Entry",
                        API: `PUT -  https://beta-api.undiundi.id/profiles/update/${keyName}`,
                        query: `UPDATE profiles SET ${keyName}='${value}' WHERE id=${verify.id}`,
                        err
                    });
                }
            }
            else {
                res.send({
                    message: "Update Failed",
                    success: "0",
                    status: "422",
                    data: ""
                });
                winston_1.logger.error({
                    message: "Update Data Failed",
                    API: `PUT -  https://beta-api.undiundi.id/profiles/id`,
                    query: `UPDATE profiles SET ${keyName}='${value}' WHERE id=${verify.id}`,
                    err
                });
            }
        }
        ;
        if (rows.affectedRows > 0) {
            res.send({
                message: "Update Success",
                success: 1,
                status: "200",
                data: {}
            });
            winston_1.logger.info({
                message: "Update Data Success",
                API: `PUT -  https://beta-api.undiundi.id/profiles/update/${keyName}`,
                query: `UPDATE profiles SET ${keyName}='${value}' WHERE id=${verify.id}`,
            });
        }
        else {
            res.send({
                message: "Update Failed",
                success: "0",
                status: "422",
                data: ""
            });
            winston_1.logger.error({
                message: "Update Failed",
                API: `PUT -  https://beta-api.undiundi.id/profiles/update/${keyName}`,
                query: `UPDATE profiles SET ${keyName}='${value}' WHERE id=${verify.id}`,
            });
        }
    });
    // const params = req.body;
    // const keyName = Object.keys(params);
    // var index = 0;
    // console.log(keyName[0]);
    // const data = email.email
    // console.log(req.body[keyName[index]]);
    // const fullname = req.body.fullname;
    // const handphone = req.body.handphone;
    // const password = req.body.password;
    // const identity = req.body.identity;
    // const address = req.body.adress;
    // const city = req.body.city;
    // const zipcode = req.body.zipcode;
    // const regency = req.body.regency;
    // const language = req.body.language;
    //   connection.query(
    //     `UPDATE profiles SET ${keyName}='${req.body[keyName[index]]}' WHERE id=${verify.id}`,
    //     (err:any, rows:any) => {
    //       if (err) {
    //         res.status(422).send({
    //           message: "Update Failed",
    //           success: 0,
    //           status: "422",
    //           data: {},
    //           err
    //         });
    //       };
    //       res.send({
    //         data: rows
    //       })      
    //     }
    //   )
};
exports.deleteUser = (req, res) => {
    db_1.connection.query(`DELETE FROM profiles WHERE id=${req.params.id}`, (err, rows) => {
        if (err) {
            res.send({
                message: "Failed get data",
                success: "0",
                status: "",
                data: ""
            });
        }
        else {
            res.send({
                message: "Get Data Success",
                success: "1",
                status: "200",
                data: [rows[0]]
            });
        }
    });
};
