import { connection } from "../../db";
import { Request, Response } from "express";
import * as moment from "moment";

export const winnerIndex = (req: Request, res: Response) => {
  connection.query(
    `SELECT profiles.email,profiles.handphone,profiles.accountname,profiles.fullname FROM winner LEFT JOIN profiles ON winner.profile_id = profiles.id WHERE winner.period_id=${req.params.period_id} AND winner.prizes_id=${req.params.prize}`,
    (err: any, data: any) => {
      if (err) {
        res.send({
          message: "you query error",
          success: 0,
          status: 400,
          data: err
        });
      } else {
        if (data.length < 1) {
          res.send({
            message: "Can't find data",
            status: 404,
            success: 1,
            data: data
          });
        } else {
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
};

export const searchWinnerByPeriodId = (req: Request, res: Response) => {
  const period_id = req.params.period_id;
  const search = req.params.search;

  connection.query(
    `SELECT  profiles.accountname, profiles.fullname, profiles.handphone,  profiles.email FROM winner JOIN profiles ON profiles.id = winner.profile_id WHERE period_id = ${period_id} AND (profiles.handphone LIKE "%${search}%" OR profiles.accountname LIKE "%${search}%" OR profiles.fullname LIKE "%${search}%" OR profiles.email LIKE "%${search}%" )`,
    (err: any, rows: any) => {
      if (err) {
        res.status(422).send({
          message: "Get Data Failed",
          success: 0,
          status: "422",
          data: {}
          // err
        });
      }

      if (rows.length > 0) {
        res.status(200).send({
          message: "Get Data Success",
          success: 1,
          status: "200",
          data: rows
        });
      } else {
        res.status(200).send({
          message: "Data Not Found",
          success: 1,
          status: "200",
          data: rows
        });
      }
    }
  );
};

export const getWinnerPeriod = (req: Request, res: Response) => {
  connection.query(
    `SELECT id, periode FROM periode WHERE promo_type = 2 AND category=${req.params.category}`,
    (err: any, rows: any) => {
      if (err) {
        res.status(422).send({
          message: "Failed Get Data",
          success: "0",
          status: "422",
          data: ""
        });
      }

      if (rows.length > 0) {
        res.status(200).send({
          message: "Get Data Success",
          success: "1",
          status: "200",
          data: rows
        });
      } else {
        res.status(404).send({
          message: "Data Not Found",
          success: "0",
          status: "404",
          data: rows
        });
      }
    }
  );
};

export const getActiveWinnerPeriod = (req: Request, res: Response) => {
  connection.query(
    `SELECT id, periode FROM periode WHERE promo_type = 2 AND (start_date <= '${moment().format(
      "YYYY-MM-DD"
    )}' AND end_date > '${moment().format("YYYY-MM-DD")}') AND category=${
      req.params.category
    }`,
    (err: any, rows: any) => {
      if (err) {
        res.status(422).send({
          message: "Failed Get Data",
          success: "0",
          status: "422",
          data: ""
        });
      }

      if (rows.length > 0) {
        res.status(200).send({
          message: "Get Data Success",
          success: "1",
          status: "200",
          data: rows
        });
      } else {
        res.status(404).send({
          message: "Data Not Found",
          success: "0",
          status: "404",
          data: rows
        });
      }
    }
  );
};

export const prizePicture = (req: Request, res: Response) => {
  connection.query(
    `SELECT id,prize,path,picture FROM prizes WHERE periode_id= ${req.params.periode} AND category = 1`,
    (err: any, data: any) => {
      if (err) {
        res.send({ message: "error", status: 400, success: 0, data: err });
      } else {
        if (data.length < 1) {
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
};
