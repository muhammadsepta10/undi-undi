import { connection } from "../../db";
import { Request, Response } from "express";
import { logger } from '../../winston';

export const getNews = (req: Request, res: Response) => {
  connection.query(
    `SELECT id, topic, picture, summary FROM news ORDER BY created_at DESC LIMIT 4`,
    (err: any, rows: any) => {
      if (err) {
        res.send({
          message: "Get Data Failed",
          success: 0,
          status: "422",
          data: {}
        });
      }

      logger.error({
        message: "Get Data Failed",
        API: 'GET -  https://beta-api.undiundi.id/news',
        query: `SELECT id, topic, picture, summary FROM news ORDER BY created_at DESC LIMIT 4`,
        err
      });
      if (rows.length > 0) {
        let totalData = rows.length;
        let data = [];

        const path = "https://beta-api.undiundi.id/news/";
        for (let index = 0; index < totalData; index++) {
          let id = rows[index].id;
          let topic = rows[index].topic;
          let picture = rows[index].picture;
          let summary = rows[index].summary;

          data.push({
            id: id,
            topic: topic,
            picture: path + picture,
            summary: summary
          });
        }

        res.send({
          message: "Get Data Success",
          success: 1,
          status: "200",
          data: data
        });

        logger.info({
          message: "Get Data Success",
          API: 'GET -  https://beta-api.undiundi.id/news',
          query: `SELECT id, topic, picture, summary FROM news ORDER BY created_at DESC LIMIT 4`
        });
      } else {
        res.send({
          message: "Data Not Found",
          success: 0,
          status: "404",
          data: {}
        });

        logger.warn({
          message: "Data Not Found",
          API: 'GET -  https://beta-api.undiundi.id/news',
          query: `SELECT id, topic, picture, summary FROM news ORDER BY created_at DESC LIMIT 4`
        });
      }
    }
  );
};

export const getNewsById = (req: Request, res: Response) => {
  const id = req.params.id;
  connection.query(
      `SELECT * FROM news WHERE id=${id}`,
      (err: any, rows: any) => {
          if (err) {
              res.send({
                  message: "Get Data Failed",
                  success: 0,
                  status: "422",
                  data: {}                
              });

              logger.error({
                message: "Get Data Failed",
                API: `GET -  https://beta-api.undiundi.id/news/${id}`,
                query: `SELECT * FROM news WHERE id=${id}`,
                err
              });

          } else {
            if (rows.length > 0) {
              res.send({
                  message: "Get Data Success",
                  success: 1,
                  status: "200",
                  data: rows
              });

              logger.info({
                message: "Get Data Success",
                API: `GET -  https://beta-api.undiundi.id/news/${id}`,
                query: `SELECT * FROM news WHERE id=${id}`,
              });
            } else {
                res.send({
                    message: "Data Not Found",
                    success: 0,
                    status: "404",
                    data: {}                
                });

                logger.warn({
                  message: "Data Not Found",
                  API: `GET -  https://beta-api.undiundi.id/news/${id}`,
                  query: `SELECT * FROM news WHERE id=${id}`,
                });
            }
          }
      }
  );
}
