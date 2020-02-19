import { connection } from "../../db";
import { Request, Response } from "express";
import * as moment from "moment";
import { logger } from "./../../winston";
import * as TOKEN_SECRET from "../../middleware";
const jwt = require("jsonwebtoken");

export const getBanner = (req: Request, res: Response) => {
  const API = "GET-https://beta-api.undiundi/Banner";
  const token = req.header("auth-token");
  const verify = jwt.verify(token, TOKEN_SECRET.default);
  const path = "https://beta-api.undiundi.id/banner/";
  connection.query(
    `SELECT language FROM profiles WHERE id=${verify.id}`,
    (err: any, lang: any) => {
      const language = lang[0].language.toLowerCase();
      connection.query(
        `SELECT image_url,link_url,link_url FROM banner`,
        (err: any, data: any) => {
          if (language === "en") {
            if (err) {
              logger.error({
                message: "failed to get data banner",
                API: API,
                err,
                query: `SELECT image_url,link_url,link_url FROM banner`
              });
              res.send({ message: "error", status: 400, success: 0, data: {} });
            } else {
              if (data.length > 0) {
                let totalData = data.length;
                let rows = [];
                for (let index = 0; index < totalData; index++) {
                  let id = data[index].id;
                  let picture = data[index].image_url;
                  let link = data[index].link_url;

                  rows.push({
                    picture: path + picture,
                    link: link
                  });
                }
                logger.info({
                  message: "success get data banner",
                  API: API,
                  query: `SELECT image_url,link_url,link_url FROM banner`
                });
                res.send({
                  message: "success to get data",
                  status: 200,
                  success: 1,
                  data: { rows }
                });
              } else {
                logger.warn({
                  message: "data not found",
                  API: API,
                  query: `SELECT image_url,link_url,link_url FROM banner`
                });
                res.send({
                  message: "Data Not Found",
                  status: 404,
                  succes: 1,
                  data: {}
                });
              }
            }
          } else if (language === "id") {
            if (err) {
              logger.error({
                message: "failed to get data banner",
                API: API,
                err,
                query: `SELECT image_url,link_url,link_url FROM banner`
              });
              res.send({ message: "error", status: 400, success: 0, data: {} });
            } else {
              if (data.length > 0) {
                let totalData = data.length;
                let rows = [];
                for (let index = 0; index < totalData; index++) {
                  let id = data[index].id;
                  let picture = data[index].image_url;
                  let link = data[index].link_url;

                  rows.push({
                    picture: path + picture,
                    link: link
                  });
                }
                logger.info({
                  message: "success to get data",
                  API: API,
                  query: `SELECT image_url,link_url,link_url FROM banner`
                });
                res.send({
                  message: "sukses mendapatkan data",
                  status: 200,
                  success: 1,
                  data: { rows }
                });
              } else {
                logger.warn({
                  message: "data not found",
                  API: API,
                  query: `SELECT image_url,link_url,link_url FROM banner`
                });
                res.send({
                  message: "Data tidak ditemukan",
                  status: 404,
                  succes: 1,
                  data: {}
                });
              }
            }
          } else {
            if (err) {
              logger.error({
                message: "failed to get data banner",
                API: API,
                err,
                query: `SELECT image_url,link_url,link_url FROM banner`
              });
              res.send({ message: "error", status: 400, success: 0, data: {} });
            } else {
              if (data.length > 0) {
                let totalData = data.length;
                let rows = [];
                for (let index = 0; index < totalData; index++) {
                  let id = data[index].id;
                  let picture = data[index].image_url;
                  let link = data[index].link_url;

                  rows.push({
                    picture: path + picture,
                    link: link
                  });
                }
                logger.info({
                  message: "success to get data",
                  API: API,
                  query: `SELECT image_url,link_url,link_url FROM banner`
                });
                res.send({
                  message: "success to get data",
                  status: 200,
                  success: 1,
                  data: { rows }
                });
              } else {
                logger.warn({
                  message: "data not found",
                  API: API,
                  query: `SELECT image_url,link_url,link_url FROM banner`
                });
                res.send({
                  message: "Data Not Found",
                  status: 404,
                  succes: 1,
                  data: {}
                });
              }
            }
          }
        }
      );
    }
  );
};
