"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const uuid = require("uuid");
const hash = require("password-hash");
const jwt = require("jsonwebtoken");
//insert data into table language
exports.postRegistration = (req, res) => {
    const accountName = req.body.accountName;
    const email = req.body.email;
    const password = hash.generate(req.body.password);
    // const password = req.body.password;
    const fullName = req.body.fullName;
    const handphone = req.body.handphone;
    const identity = req.body.identity;
    const address = req.body.address;
    const city = req.body.city;
    const userid = uuid();
    db_1.default.query(`INSERT INTO profiles VALUES (NULL, '${email}', '${userid}', '${handphone}', '${identity}', NULL, '${accountName}', '', NULL, NULL, '${fullName}', '${password}', '${address}', '', '${city}', '', '', '', '', NULL, NULL,NULL, NOW(), NULL, '', '', '');`, (err, data) => {
        if (err) {
            res.send({
                err
            });
        }
        else {
            const token = jwt.sign({
                userId: data.id
            }, "my-secret-key");
            res.send({
                message: "Insert Success",
                data,
                token
            });
        }
    });
};
