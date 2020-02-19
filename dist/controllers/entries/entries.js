"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const moment = require("moment");
const multer = require("multer");
const path = require("path");
const TOKEN_SECRET = require("../../middleware");
const jwt = require("jsonwebtoken");
//set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/coupon");
    },
    filename: function (req, file, cb) {
        const files = file.originalname;
        cb(null, "coupon" + Date.now() + file.originalname);
    }
});
//init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single("photo");
//check file type
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|gif|bmp/; //alowed ext
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);
    //check if ext is true
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb("error : Images Only");
    }
}
exports.postCoupon = (req, res) => {
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    // not yet
    res.send(req.file);
    if (req.file) {
        upload((req, res, err) => {
            res.send(req.file);
            db_1.connection.query(`INSERT INTO transactions (profile_id,prizes_category_id,created_at,activity,type_transaction) VALUES (${verify.id},1,"${moment().format("YYYY-MM-DD h:mm:ss")}","kode unik",1)`, (err, transaction) => {
                if (err) {
                    res.send({ message: "error", status: 400, data: [err] });
                }
                else {
                    db_1.connection.query(`INSERT INTO entries (path,receive_date,sender,media,entry_type,coupon,photo,status,is_valid,profile_id,trans_id) VALUES("https://beta-api.undiundi/coupon/","${moment().format("YYYY-MM-DD h:mm:ss")}",'${req.body.sender}','${req.body.media}',1,'${req.body.coupon}',"${req.file.filename}",0,0,${transaction.insertId} )`, (err, insert) => {
                        if (err) {
                            res.send({
                                message: "your data failed to insert, please try again",
                                err
                            });
                        }
                        else if (insert) {
                            db_1.connection.query(
                            // search duplicated coupoon in entries
                            `SELECT * FROM entries WHERE id=${insert.insertId} AND status=1 AND coupon="${req.body.coupon}" `, (err, datas) => {
                                if (datas.length < 1) {
                                    // update status entry if coupon in entries not duplicated
                                    db_1.connection.query(`UPDATE entries SET status=1 WHERE id=${insert.insertId}`, (err, data) => {
                                        if (err) {
                                            res.send({ messages: "error", error: err });
                                        }
                                        else {
                                            // search unused coupon
                                            db_1.connection.query(`SELECT * FROM coupons WHERE coupon="${req.body.coupon}" AND status=0`, (err, rows) => {
                                                if (rows.length >= 1) {
                                                    // -------------------------------------------//
                                                    // update table coupon
                                                    db_1.connection.query(`UPDATE coupons SET use_date="${moment().format("YYYY-MM-DD h:mm:ss")}",profile_id=${verify.id},entries_id=${insert.insertId},status=1 WHERE id=${rows[0].id}`, (err, data) => {
                                                        if (err) {
                                                            res.send({ message: "error", err });
                                                        }
                                                        else {
                                                            // -------------------------------------------//
                                                            // search from table coupons where coupon= coupon from entries
                                                            db_1.connection.query(`UPDATE entries SET is_valid=1,validation_date="${moment().format("YYYY-MM-DD h:mm:ss")}" WHERE id=${insert.insertId}`, (err, data) => {
                                                                if (err) {
                                                                    res.send({
                                                                        messages: "failed to validation entries",
                                                                        err
                                                                    });
                                                                }
                                                                else {
                                                                    res.send({
                                                                        message: "success to validation coupoon thanks",
                                                                        success: 1,
                                                                        status: 200,
                                                                        data: []
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                                else if (rows.length < 1) {
                                                    res.send({
                                                        message: "your coupon is not valid or alredy to use",
                                                        success: 1,
                                                        status: 200,
                                                        data: []
                                                    });
                                                }
                                                else if (err) {
                                                    res.send({ message: "error", error: err });
                                                }
                                            });
                                        }
                                    });
                                }
                                else if (datas.length >= 1) {
                                    res.send({
                                        message: "your coupon is alredy use",
                                        success: 0,
                                        status: 400,
                                        data: []
                                    });
                                }
                                else {
                                    res.send({ messages: "error", error: err });
                                }
                            });
                        }
                    });
                }
            });
            // -------------------------------------------//
            // insert data to entries table
        });
    }
    else {
        // -------------------------------------------//
        // insert data to entries table
        db_1.connection.query(`INSERT INTO transactions (profile_id,prizes_category_id,created_at,activity,type_transaction) VALUES (${verify.id},1,"${moment().format("YYYY-MM-DD h:mm:ss")}","kode unik",1)`, (err, transaction) => {
            if (err) {
                res.send({ message: "error", status: 400, data: [err] });
            }
            else {
                db_1.connection.query(`INSERT INTO entries (receive_date,sender,media,entry_type,coupon,photo,status,is_valid,trans_id) VALUES("${moment().format("YYYY-MM-DD h:mm:ss")}",'${req.body.sender}','${req.body.media}',1,'${req.body.coupon}',"null",0,0,${transaction.insertId} )`, (err, insert) => {
                    if (err) {
                        res.send({
                            message: "your data failed to insert, please try again",
                            err
                        });
                    }
                    else if (insert) {
                        db_1.connection.query(
                        // search duplicated coupoon in entries
                        `SELECT * FROM entries WHERE id=${insert.insertId} AND status=1 AND coupon="${req.body.coupon}" `, (err, datas) => {
                            if (datas.length < 1) {
                                // update status entry if coupon in entries not duplicated
                                db_1.connection.query(`UPDATE entries SET status=1 WHERE id=${insert.insertId}`, (err, data) => {
                                    if (err) {
                                        res.send({ messages: "error", error: err });
                                    }
                                    else {
                                        // search unused coupon
                                        db_1.connection.query(`SELECT * FROM coupons WHERE coupon="${req.body.coupon}" AND status=0`, (err, rows) => {
                                            if (rows.length >= 1) {
                                                // -------------------------------------------//
                                                // update table coupon
                                                db_1.connection.query(`UPDATE coupons SET use_date="${moment().format("YYYY-MM-DD h:mm:ss")}",profile_id=${verify.id},entries_id=${insert.insertId},status=1 WHERE id=${rows[0].id}`, (err, data) => {
                                                    if (err) {
                                                        res.send({ message: "error", err });
                                                    }
                                                    else {
                                                        // -------------------------------------------//
                                                        // search from table coupons where coupon= coupon from entries
                                                        db_1.connection.query(`UPDATE entries SET is_valid=1,validation_date="${moment().format("YYYY-MM-DD h:mm:ss")}" WHERE id=${insert.insertId}`, (err, data) => {
                                                            if (err) {
                                                                res.send({
                                                                    messages: "failed to validation entries",
                                                                    err
                                                                });
                                                            }
                                                            else {
                                                                res.send({
                                                                    message: "success to validation coupoon thanks",
                                                                    success: 1,
                                                                    status: 200,
                                                                    data: []
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                            else if (rows.length < 1) {
                                                res.send({
                                                    message: "your coupon is not valid or alredy to use",
                                                    success: 1,
                                                    status: 200,
                                                    data: []
                                                });
                                            }
                                            else if (err) {
                                                res.send({ message: "error", error: err });
                                            }
                                        });
                                    }
                                });
                            }
                            else if (datas.length >= 1) {
                                res.send({
                                    message: "your coupon is alredy use",
                                    success: 0,
                                    status: 400,
                                    data: []
                                });
                            }
                            else {
                                res.send({ messages: "error", error: err });
                            }
                        });
                    }
                });
            }
        });
    }
};
exports.picture = (req, res) => {
    db_1.connection.query;
};
// export const getCoupon = (req: Request, res: Response) => {
//   connection.query("SELECT * FROM entries", (err: any, data: any) => {
//     if (err) {
//       res.send({ message: "your data failed to insert, please try again",
//       err });
//     } else {
//       res.send({ message: "success to get data entries", data });
//     }
//   });
// };
