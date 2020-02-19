import { connection } from "../../db";
import { Request, Response } from "express";
import * as moment from "moment";

// get all data version  version
export const indexVersion = (req: Request, res: Response) => {
  connection.query(
    "SELECT platform,version, last_update,changes  FROM versions",
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

// get version by platform
export const showVersion = (req: Request, res: Response) => {
  const platform = req.params.platform;
  const lowerPlatform = platform.toLowerCase();
  connection.query(
    `SELECT platform,version, last_update,changes  FROM versions WHERE platform="${lowerPlatform}" ORDER BY last_update DESC LIMIT 1`,
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

// chceck last update vrsion by platform
export const showUpdateVersion = (req: Request, res: Response) => {
  const platform = req.params.platform;
  const lowerPlatform = platform.toLowerCase();
  connection.query(
    `SELECT platform,version, last_update,changes  FROM versions WHERE platform="${lowerPlatform}" ORDER BY last_update DESC LIMIT 1`,
    (err: any, data: any) => {
      if (err) {
        res.send({
          message: "you query error",
          success: 0,
          status: 400,
          data: []
        });
      } else {
        if (data.length < 1) {
          res.send({
            message: "Can't find data",
            status: 404,
            success: 1,
            data: []
          });
        } else {
          const checkVersion = data[0].version === req.params.version;
          if (checkVersion) {
            res.send({
              message: "your aplication version is up to date",
              status: 200,
              success: 1,
              data: []
            });
          } else {
            res.send({
              message: "please update you aplication version",
              status: 200,
              success: 1,
              data: []
            });
          }
        }
      }
    }
  );
};

// show version by id
export const showVersionById = (req: Request, res: Response) => {
  connection.query(
    `SELECT id,platform,version,last_update,changes  FROM versions WHERE id=${req.params.id}`,
    (err: any, data: any) => {
      if (err) {
        res.send({
          message: "you query error",
          success: 0,
          status: 400,
          data: []
        });
      } else {
        if (data.length < 1) {
          res.send({
            message: "Can't find data",
            status: 404,
            success: 1,
            data: []
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

// input version
export const postVersion = (req: Request, res: Response) => {
  const bodyPlatform = req.body.platform;
  const platform = bodyPlatform.toLowerCase();
  connection.query(
    `SELECT version,platform FROM versions WHERE platform="${platform}" AND version="${req.body.version}"`,
    (err: any, data: any) => {
      if (err) {
        res.send({
          message: "you query error",
          success: 0,
          status: 400,
          data: []
        });
      } else {
        if (data.length < 1) {
          connection.query(
            `INSERT INTO versions (platform,version,last_update,changes) VALUES('${
              req.body.platform
            }','${req.body.version}','${moment().format(
              "YYYY-MM-DD h:mm:ss"
            )}','${req.body.changes}')`,
            (err: any, data: any) => {
              if (err) {
                res.send({
                  message: "you query error",
                  success: 0,
                  status: 400,
                  data: []
                });
              } else {
                if (data.length < 1) {
                  res.send({
                    message: "failed to input data",
                    status: 404,
                    success: 1,
                    data: []
                  });
                } else {
                  res.send({
                    message: "success to input data",
                    status: 200,
                    success: 1,
                    data: []
                  });
                }
              }
            }
          );
        } else {
          res.send({
            message: `your ${req.body.platform} version input is alredy exists, please change your coloum version`,
            status: 200,
            success: 1,
            data: []
          });
        }
      }
    }
  );
};

// tidak terpakai

export const showVersionByPlatform = (req: Request, res: Response) => {
  const platform = req.params.platform.toLowerCase();
  connection.query(
    `SELECT *  FROM versions WHERE platform="${platform}"`,
    (err: any, data: any) => {
      if (err) {
        res.send({ message: "error", error: err });
      } else {
        res.send(data[0]);
      }
    }
  );
};

export const putVersion = (req: Request, res: Response) => {
  connection.query(
    `UPDATE versions SET platform=${req.body.platform},version=${req.body.version} WHERE id=${req.params.id}`,
    (err: any, data: any) => {
      if (err) {
        res.send({ message: "error", error: err });
      } else {
        res.send(data);
      }
    }
  );
};

export const deleteVersion = (req: Request, res: Response) => {
  connection.query(
    `DELETE from versions WHERE id=${req.params.id}`,
    (err: any, data: any) => {
      if (err) {
        res.send({ message: "error", error: err });
      } else {
        res.send(data);
      }
    }
  );
};
