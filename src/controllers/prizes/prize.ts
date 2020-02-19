import { connection } from "../../db";
import * as multer from "multer";
import * as moment from "moment";
import { Request, Response } from "express";
import * as path from "path";
import { picture } from "../entries/entries";
const appRoot = require("app-root-path");
import * as TOKEN_SECRET from "../../middleware";
const jwt = require("jsonwebtoken");
import { logger } from "./../../winston";

export const category = (req: Request, res: Response) => {
  const API = "GET-https://beta-api.undiundi/prize/categories";
  const token = req.header("auth-token");
  const verify = jwt.verify(token, TOKEN_SECRET.default);
  connection.query(
    `SELECT language FROM profiles WHERE id=${verify.id}`,
    (err: any, lang: any) => {
      const language = lang[0].language.toLowerCase();
      if (language === "en") {
        connection.query(
          `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "failed to get data",
                API: API,
                err,
                query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
              });
              res.send({
                message: "error",
                status: 400,
                success: 0,
                data: err
              });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data not found",
                  API: API,
                  query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                });
                res.send({
                  message: "Can't find data",
                  status: 404,
                  success: 1,
                  data: data
                });
              } else {
                let totalData = data.length;
                let rows = [];

                const path = "https://beta-api.undiundi.id/category_prize/";
                for (let index = 0; index < totalData; index++) {
                  let id = data[index].id;
                  let picture = data[index].picture;

                  rows.push({
                    id: id,
                    picture: path + picture
                  });
                }

                logger.info({
                  message: "success get data",
                  API: API,
                  query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                });
                res.send({
                  message: "success to get data",
                  status: 200,
                  success: 1,
                  data: { rows }
                });
              }
            }
          }
        );
      } else if (language === "idn") {
        connection.query(
          `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "failed to get data",
                API: API,
                err,
                query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
              });
              res.send({
                message: "error",
                status: 400,
                success: 0,
                data: {}
              });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data not found",
                  API: API,
                  query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                });
                res.send({
                  message: "Data Tidak Ditemukan",
                  status: 404,
                  success: 1,
                  data: data
                });
              } else {
                let totalData = data.length;
                let rows = [];

                const path = "https://beta-api.undiundi.id/category_prize/";
                for (let index = 0; index < totalData; index++) {
                  let id = data[index].id;
                  let picture = data[index].picture;

                  rows.push({
                    id: id,
                    picture: path + picture
                  });
                }
                logger.info({
                  message: "success get data",
                  API: API,
                  query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                });
                res.send({
                  message: "Berhasil Mendapatkan Data",
                  status: 200,
                  success: 1,
                  data: { rows }
                });
              }
            }
          }
        );
      } else {
        connection.query(
          `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "failed to get data",
                API: API,
                err,
                query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
              });
              res.send({
                message: "error",
                status: 400,
                success: 0,
                data: err
              });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data not found",
                  API: API,
                  query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                });
                res.send({
                  message: "Can't find data",
                  status: 404,
                  success: 1,
                  data: data
                });
              } else {
                let totalData = data.length;
                let rows = [];

                const path = "https://beta-api.undiundi.id/category_prize/";
                for (let index = 0; index < totalData; index++) {
                  let id = data[index].id;
                  let picture = data[index].picture;

                  rows.push({
                    id: id,
                    picture: path + picture
                  });
                }

                logger.info({
                  message: "success get data",
                  API: API,
                  query: `SELECT id,path,picture,category FROM prizes_category WHERE picture != ''`
                });
                res.send({
                  message: "success to get data",
                  status: 200,
                  success: 1,
                  data: { rows }
                });
              }
            }
          }
        );
      }
    }
  );
};

export const periodIndex = (req: Request, res: Response) => {
  const API = `GET-https://beta-api.undiundi/prize/periodes/${req.params.category}`;
  const token = req.header("auth-token");
  const verify = jwt.verify(token, TOKEN_SECRET.default);
  connection.query(
    `SELECT language FROM profiles WHERE id=${verify.id}`,
    (err: any, lang: any) => {
      const language = lang[0].language.toLowerCase();
      if (language === "en") {
        connection.query(
          `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "failed to get data",
                API: API,
                err,
                query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
              });
              res.send({
                message: "error",
                status: 400,
                success: 0,
                data: {}
              });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data not found",
                  API: API,
                  query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                });
                res.send({
                  message: "Can't find data",
                  status: 404,
                  success: 1,
                  data: data
                });
              } else {
                logger.info({
                  message: "success get data",
                  API: API,
                  query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                });
                res.send({
                  message: "success to get data",
                  status: 200,
                  success: 1,
                  data: data
                });
              }
            }
          }
        );
      } else if (language === "idn") {
        connection.query(
          `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "gagal mendapatkan data",
                API: API,
                err,
                query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
              });
              res.send({
                message: "error",
                status: 400,
                success: 0,
                data: {}
              });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data tidak ditemukan",
                  API: API,
                  query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                });
                res.send({
                  message: "data tidak ditemukan",
                  status: 404,
                  success: 1,
                  data: data
                });
              } else {
                logger.info({
                  message: "berhasil mendapatkan data",
                  API: API,
                  query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                });
                res.send({
                  message: "berhasil mendapatkan data",
                  status: 200,
                  success: 1,
                  data: data
                });
              }
            }
          }
        );
      } else {
        connection.query(
          `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "failed to get data",
                API: API,
                err,
                query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
              });
              res.send({
                message: "error",
                status: 400,
                success: 0,
                data: {}
              });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data not found",
                  API: API,
                  qwuey: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                });
                res.send({
                  message: "Can't find data",
                  status: 404,
                  success: 1,
                  data: data
                });
              } else {
                logger.info({
                  message: "success get data",
                  API: API,
                  query: `SELECT id,periode FROM periode WHERE category=${req.params.category} ORDER BY periode`
                });
                res.send({
                  message: "success to get data",
                  status: 200,
                  success: 1,
                  data: data
                });
              }
            }
          }
        );
      }
    }
  );
};

export const activePeriode = (req: Request, res: Response) => {
  const API = `GET-https://beta-api.undiundi/prize/periode/active/${req.params.category}`;
  const token = req.header("auth-token");
  const verify = jwt.verify(token, TOKEN_SECRET.default);
  connection.query(
    `SELECT language FROM profiles WHERE id=${verify.id}`,
    (err: any, lang: any) => {
      const language = lang[0].language.toLowerCase();
      if (language === "en") {
        connection.query(
          `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
            "YYYY-MM-DD"
          )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${
            req.params.category
          }`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "failed to get data",
                API: API,
                err,
                query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
                  "YYYY-MM-DD"
                )}' AND end_date>'${moment().format(
                  "YYYY-MM-DD"
                )}' AND category=${req.params.category}`
              });
              res.send({ message: "error", status: 400, success: 0, data: {} });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data not found",
                  API: API,
                  query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
                    "YYYY-MM-DD"
                  )}' AND end_date>'${moment().format(
                    "YYYY-MM-DD"
                  )}' AND category=${req.params.category}`
                });
                res.send({
                  message: "Can't find data",
                  status: 404,
                  success: 1,
                  data: data[0]
                });
              } else {
                logger.info({
                  message: "success get data",
                  API: API,
                  query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
                    "YYYY-MM-DD"
                  )}' AND end_date>'${moment().format(
                    "YYYY-MM-DD"
                  )}' AND category=${req.params.category}`
                });
                res.send({
                  message: "success to get data",
                  status: 200,
                  success: 1,
                  data: data[0]
                });
              }
            }
          }
        );
      } else if (language === "idn") {
        connection.query(
          `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
            "YYYY-MM-DD"
          )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${
            req.params.category
          }`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "failed to get data",
                API: API,
                err,
                query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
                  "YYYY-MM-DD"
                )}' AND end_date>'${moment().format(
                  "YYYY-MM-DD"
                )}' AND category=${req.params.category}`
              });
              res.send({ message: "error", status: 400, success: 0, data: {} });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data tidak ditemukan",
                  API: API,
                  query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
                    "YYYY-MM-DD"
                  )}' AND end_date>'${moment().format(
                    "YYYY-MM-DD"
                  )}' AND category=${req.params.category}`
                });
                res.send({
                  message: "data tidak ditemukan",
                  status: 404,
                  success: 1,
                  data: data[0]
                });
              } else {
                logger.info({
                  message: "berhasil mendapatkan data",
                  API: API,
                  query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
                    "YYYY-MM-DD"
                  )}' AND end_date>'${moment().format(
                    "YYYY-MM-DD"
                  )}' AND category=${req.params.category}`
                });
                res.send({
                  message: "berhasil mendapatkan data",
                  status: 200,
                  success: 1,
                  data: data[0]
                });
              }
            }
          }
        );
      } else {
        connection.query(
          `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
            "YYYY-MM-DD"
          )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=${
            req.params.category
          }`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "failed to get data",
                API: API,
                err,
                query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
                  "YYYY-MM-DD"
                )}' AND end_date>'${moment().format(
                  "YYYY-MM-DD"
                )}' AND category=${req.params.category}`
              });
              res.send({ message: "error", status: 400, success: 0, data: {} });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data not found",
                  API: API,
                  query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
                    "YYYY-MM-DD"
                  )}' AND end_date>'${moment().format(
                    "YYYY-MM-DD"
                  )}' AND category=${req.params.category}`
                });
                res.send({
                  message: "Can't find data",
                  status: 404,
                  success: 1,
                  data: data[0]
                });
              } else {
                logger.info({
                  message: "success get data",
                  API: API,
                  query: `SELECT id,periode FROM periode WHERE start_date<='${moment().format(
                    "YYYY-MM-DD"
                  )}' AND end_date>'${moment().format(
                    "YYYY-MM-DD"
                  )}' AND category=${req.params.category}`
                });
                res.send({
                  message: "success to get data",
                  status: 200,
                  success: 1,
                  data: data[0]
                });
              }
            }
          }
        );
      }
    }
  );
};

export const prizesIndex = (req: Request, res: Response) => {
  const API = `GET-https://beta-api.undiundi/prize/${req.params.periode_id}`;
  const token = req.header("auth-token");
  const verify = jwt.verify(token, TOKEN_SECRET.default);
  connection.query(
    `SELECT language FROM profiles WHERE id=${verify.id}`,
    (err: any, lang: any) => {
      const language = lang[0].language.toLowerCase();
      if (language === "en") {
        connection.query(
          `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "failed to get data",
                API: API,
                err,
                query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
              });
              res.send({
                message: "error",
                status: 400,
                success: 0,
                data: err
              });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data not found",
                  API: API,
                  query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                });
                res.send({
                  message: "Can't find data",
                  status: 404,
                  success: 1,
                  data: data
                });
              } else {
                let totalData = data.length;
                let rows = [];

                const path = "https://beta-api.undiundi.id/prizes/";
                for (let index = 0; index < totalData; index++) {
                  let id = data[index].id;
                  let picture = data[index].picture;

                  rows.push({
                    id: id,
                    picture: path + picture
                  });
                }
                logger.info({
                  message: "success get data",
                  API: API,
                  query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                });
                res.send({
                  message: "success to get data",
                  status: 200,
                  success: 1,
                  data: { rows }
                });
              }
            }
          }
        );
      } else if (language === "idn") {
        connection.query(
          `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "gagal mendapatkan data",
                API: API,
                err,
                query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
              });
              res.send({
                message: "error",
                status: 400,
                success: 0,
                data: err
              });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data not found",
                  API: API,
                  query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                });
                res.send({
                  message: "data tidak ditemukan",
                  status: 404,
                  success: 1,
                  data: data
                });
              } else {
                let totalData = data.length;
                let rows = [];

                const path = "https://beta-api.undiundi.id/prizes/";
                for (let index = 0; index < totalData; index++) {
                  let id = data[index].id;
                  let picture = data[index].picture;

                  rows.push({
                    id: id,
                    picture: path + picture
                  });
                }
                logger.info({
                  message: "success get data",
                  API: API,
                  query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                });
                res.send({
                  message: "sukses mendapatkan data",
                  status: 200,
                  success: 1,
                  data: { rows }
                });
              }
            }
          }
        );
      } else {
        connection.query(
          `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`,
          (err: any, data: any) => {
            if (err) {
              logger.error({
                message: "failed to get data",
                API: API,
                err,
                query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
              });
              res.send({
                message: "error",
                status: 400,
                success: 0,
                data: err
              });
            } else {
              if (data.length < 1) {
                logger.warning({
                  message: "data not found",
                  API: API,
                  query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                });
                res.send({
                  message: "Can't find data",
                  status: 404,
                  success: 1,
                  data: data
                });
              } else {
                let totalData = data.length;
                let rows = [];

                const path = "https://beta-api.undiundi.id/prizes/";
                for (let index = 0; index < totalData; index++) {
                  let id = data[index].id;
                  let picture = data[index].picture;

                  rows.push({
                    id: id,
                    picture: path + picture
                  });
                }
                logger.info({
                  message: "success get data",
                  API: API,
                  query: `SELECT * FROM prizes WHERE prizes.periode_id=${req.params.periode_id}`
                });
                res.send({
                  message: "success to get data",
                  status: 200,
                  success: 1,
                  data: { rows }
                });
              }
            }
          }
        );
      }
    }
  );
};

export const inputPeriode = (req: Request, res: Response) => {
  connection.query(
    `INSERT INTO periode (periode,promo_type,start_date,end_date,category) value ("${req.body.periode}",2,"${req.body.start_date}","${req.body.end_date}",${req.body.category})`,
    (err: any, data: any) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send("success");
      }
    }
  );
};
