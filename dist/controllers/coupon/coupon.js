"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./../../db");
exports.bulkInsert = (req, res) => {
    const sql = "INSERT INTO coupons (coupon,prize_id) VALUES ?";
    const values = [
        [req.body.coupon, req.body.prize_id]
    ];
    db_1.connection.query(sql, [values], (err) => {
        if (err) {
            res.send({ messages: "error", error: err });
        }
        else {
            res.send({ messages: "success" });
        }
    });
};
