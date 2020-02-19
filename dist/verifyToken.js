"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TOKEN_SECRET = require("./middleware");
const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
    const token = req.header('auth-token');
    if (token == undefined) {
        res.send({
            message: "Access Denied (Unauthorized) ",
            status: "401",
            success: 0,
            data: {}
        });
    }
    else {
        try {
            const verify = jwt.verify(token, TOKEN_SECRET.default);
            // res.send(verify)
            next();
        }
        catch (err) {
            res.send({
                message: "Invalid Token",
                status: "401",
                success: 0,
                data: {}
            });
        }
    }
};
