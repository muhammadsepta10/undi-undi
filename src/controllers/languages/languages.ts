import { connection } from "../../db";
import { Request, Response } from "express";

export const indexLanguages = (req: Request, res: Response) => {
  connection.query("SELECT * FROM languages", (err: any, data: any) => {
    if (err) {
      res.send({ message: "failed get data", err });
    } else {
      res.send({ message: "succes get data", data });
      connection.release();
    }
  });
};

export const showLanguages = (req: Request, res: Response) => {
  connection.query(
    `SELECT * FROM languages WHERE id=${req.params.id}`,
    (err: any, data: any) => {
      if (err) {
        res.send({ message: "failed to get data", err });
      } else {
        res.send(data[0]);
      }
    }
  );
};

export const postLanguages = (req: Request, res: Response) => {
  connection.query(
    `INSERT INTO languages (language,code) VALUES ('${req.body.language}','${req.body.code}')`,
    (err: any, data: any) => {
      if (err) {
        res.status(400).send({ message: "invalid", err });
      } else {
        res.send(data);
      }
    }
  );
};

export const putLanguages = (req: Request, res: Response) => {
  connection.query(
    ` UPDATE languages SET language='${req.body.language}' code='${req.body.code}' WHERE id=${req.params.id} `,
    (err: any, data: any) => {
      if (err) {
        res.send({ message: err.message, error: err.errno });
      } else {
        res.send(data);
      }
    }
  );
};

export const deleteLanguages = (req: Request, res: Response) => {
  connection.query(
    `DELETE FROM languages WHERE id=${req.params.id}`,
    (err: any, data: any) => {
      if (err) {
        res.send({ messages: "error to destroy the files", err });
      } else {
        res.send({ messages: "success to destroy the file" });
      }
    }
  );
};
