import { connection } from "../../db";
import { Request, Response, NextFunction } from "express";
import * as moment from "moment";
import * as TOKEN_SECRET from "../../middleware";
const jwt = require("jsonwebtoken");

export const postCoupon = (req: Request, res: Response) => {
  const token = req.header("auth-token");
  const verify = jwt.verify(token, TOKEN_SECRET.default);
  // not yet
  if (req.file) {
    res.send(req.file);
    connection.query(
      `INSERT INTO transactions (profile_id,prizes_category_id,created_at,activity,type_transaction) VALUES (${
        verify.id
      },1,"${moment().format("YYYY-MM-DD h:mm:ss")}","kode unik",1)`,
      (err: any, transaction: any) => {
        if (err) {
          res.send({ message: "error", status: 400, data: [err] });
        } else {
          connection.query(
            `INSERT INTO entries (path,receive_date,sender,media,entry_type,coupon,photo,status,is_valid,trans_id) VALUES("https://beta-api.undiundi/coupon/","${moment().format(
              "YYYY-MM-DD h:mm:ss"
            )}",'${req.body.sender}','${req.body.media}',1,'${
              req.body.coupon
            }',"${req.file.filename}",0,0,${transaction.insertId} )`,
            (err: any, insert: any) => {
              if (err) {
                res.send({
                  message: "your data failed to insert, please try again",
                  err
                });
              } else if (insert) {
                connection.query(
                  // search duplicated coupoon in entries
                  `SELECT * FROM entries WHERE id=${insert.insertId} AND status=1 AND coupon="${req.body.coupon}" `,
                  (err: any, datas: any) => {
                    if (datas.length < 1) {
                      // update status entry if coupon in entries not duplicated
                      connection.query(
                        `UPDATE entries SET status=1 WHERE id=${insert.insertId}`,
                        (err: any, data: any) => {
                          if (err) {
                            res.send({ messages: "error", error: err });
                          } else {
                            // search unused coupon
                            connection.query(
                              `SELECT * FROM coupons WHERE coupon="${req.body.coupon}" AND status=0`,
                              (err: any, rows: any) => {
                                if (rows.length >= 1) {
                                  // -------------------------------------------//
                                  // update table coupon
                                  connection.query(
                                    `UPDATE coupons SET use_date="${moment().format(
                                      "YYYY-MM-DD h:mm:ss"
                                    )}",profile_id=${verify.id},entries_id=${
                                      insert.insertId
                                    },status=1 WHERE id=${rows[0].id}`,
                                    (err: any, data: any) => {
                                      if (err) {
                                        res.send({ message: "error", err });
                                      } else {
                                        // -------------------------------------------//
                                        // search from table coupons where coupon= coupon from entries
                                        connection.query(
                                          `UPDATE entries SET is_valid=1,validation_date="${moment().format(
                                            "YYYY-MM-DD h:mm:ss"
                                          )}" WHERE id=${insert.insertId}`,
                                          (err: any, data: any) => {
                                            if (err) {
                                              res.send({
                                                messages:
                                                  "failed to validation entries",
                                                err
                                              });
                                            } else {
                                              res.send({
                                                message:
                                                  "success to validation coupoon thanks",
                                                success: 1,
                                                status: 200,
                                                data: []
                                              });
                                            }
                                          }
                                        );
                                      }
                                    }
                                  );
                                } else if (rows.length < 1) {
                                  res.send({
                                    message:
                                      "your coupon is not valid or alredy to use",
                                    success: 1,
                                    status: 200,
                                    data: []
                                  });
                                } else if (err) {
                                  res.send({ message: "error", error: err });
                                }
                              }
                            );
                          }
                        }
                      );
                    } else if (datas.length >= 1) {
                      res.send({
                        message: "your coupon is alredy use",
                        success: 0,
                        status: 400,
                        data: []
                      });
                    } else {
                      res.send({ messages: "error", error: err });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
    // -------------------------------------------//
    // insert data to entries table
  } else {
    // -------------------------------------------//
    // insert data to entries table
    connection.query(
      `INSERT INTO transactions (profile_id,prizes_category_id,created_at,activity,type_transaction) VALUES (${
        verify.id
      },1,"${moment().format("YYYY-MM-DD h:mm:ss")}","kode unik",1)`,
      (err: any, transaction: any) => {
        if (err) {
          res.send({ message: "error", status: 400, data: [err] });
        } else {
          connection.query(
            `INSERT INTO entries (receive_date,sender,media,entry_type,coupon,photo,status,is_valid,trans_id) VALUES("${moment().format(
              "YYYY-MM-DD h:mm:ss"
            )}",'${req.body.sender}','${req.body.media}',1,'${
              req.body.coupon
            }',"null",0,0,${transaction.insertId} )`,
            (err: any, insert: any) => {
              if (err) {
                res.send({
                  message: "your data failed to insert, please try again",
                  err
                });
              } else if (insert) {
                connection.query(
                  // search duplicated coupoon in entries
                  `SELECT * FROM entries WHERE id=${insert.insertId} AND status=1 AND coupon="${req.body.coupon}" `,
                  (err: any, datas: any) => {
                    if (datas.length < 1) {
                      // update status entry if coupon in entries not duplicated
                      connection.query(
                        `UPDATE entries SET status=1 WHERE id=${insert.insertId}`,
                        (err: any, data: any) => {
                          if (err) {
                            res.send({ messages: "error", error: err });
                          } else {
                            // search unused coupon
                            connection.query(
                              `SELECT * FROM coupons WHERE coupon="${req.body.coupon}" AND status=0`,
                              (err: any, rows: any) => {
                                if (rows.length >= 1) {
                                  // -------------------------------------------//
                                  // update table coupon
                                  connection.query(
                                    `UPDATE coupons SET use_date="${moment().format(
                                      "YYYY-MM-DD h:mm:ss"
                                    )}",profile_id=${verify.id},entries_id=${
                                      insert.insertId
                                    },status=1 WHERE id=${rows[0].id}`,
                                    (err: any, data: any) => {
                                      if (err) {
                                        res.send({ message: "error", err });
                                      } else {
                                        // -------------------------------------------//
                                        // search from table coupons where coupon= coupon from entries
                                        connection.query(
                                          `UPDATE entries SET is_valid=1,validation_date="${moment().format(
                                            "YYYY-MM-DD h:mm:ss"
                                          )}" WHERE id=${insert.insertId}`,
                                          (err: any, data: any) => {
                                            if (err) {
                                              res.send({
                                                messages:
                                                  "failed to validation entries",
                                                err
                                              });
                                            } else {
                                              res.send({
                                                message:
                                                  "success to validation coupoon thanks",
                                                success: 1,
                                                status: 200,
                                                data: []
                                              });
                                            }
                                          }
                                        );
                                      }
                                    }
                                  );
                                } else if (rows.length < 1) {
                                  res.send({
                                    message:
                                      "your coupon is not valid or alredy to use",
                                    success: 1,
                                    status: 200,
                                    data: []
                                  });
                                } else if (err) {
                                  res.send({ message: "error", error: err });
                                }
                              }
                            );
                          }
                        }
                      );
                    } else if (datas.length >= 1) {
                      res.send({
                        message: "your coupon is alredy use",
                        success: 0,
                        status: 400,
                        data: []
                      });
                    } else {
                      res.send({ messages: "error", error: err });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
};

export const picture = (req: Request, res: Response) => {
  connection.query;
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
