import connection from "../../db";
import { Request, Response } from "express";

//get all data in table language
export const getAllLanguage = (req: Request, res: Response) => {
  connection.query("SELECT * FROM language", (err: any, data: any) => {
    if (err) {
      throw err;
    } else {
      res.send({
        message: "Get Data Success",
        data
      });
    }
  });
};

//get data by id in table language
export const getLanguageById = (req: Request, res: Response) => {
  connection.query(
    `SELECT * FROM language WHERE id=${req.params.id}`,
    (err: any, data: any) => {
      if (err) {
        throw err;
      } else {
        res.send(data[0]);
      }
    }
  );
};

//insert data into table language
export const postLanguage = (req: Request, res: Response) => {
  const name: string = req.body.name;
  connection.query(
    `INSERT INTO language VALUES (NULL,'${name}') `,
    // `INSERT INTO language ('id', 'language_name') VALUES (NULL, '${name}')`,
    (err: any, data: any) => {
      if (err) {
        throw err;
      } else {
        // console.log(data.insertId);
        connection.query(
          `SELECT * FROM language WHERE id=${data.insertId}`,
          (err: any, rows: any) => {
            res.send(
              // message: "Insert Data Success",
              rows[0]
            );
          }
        );
      }
    }
  );
};

//update data into table language
export const updateLanguage = (req: Request, res: Response) => {
  const name: string = req.body.name;
  connection.query(
    `UPDATE language SET language_name='${name}' WHERE id='${req.params.id}'`,
    (err: any, data: any) => {
      if (err) {
        throw err;
      } else {
        res.send({
          message: "Update Data Success",
          data
        });
      }
    }
  );
};

//delete data by Id from tabel language
export const deleteLanguage = (req: Request, res: Response) => {
  connection.query(
    `DELETE FROM language WHERE id=${req.params.id}`,
    (err: any, data: any) => {
      if (err) {
        throw err;
      } else {
        res.send({
          message: "Data Deleted",
          data
        });
      }
    }
  );
};
