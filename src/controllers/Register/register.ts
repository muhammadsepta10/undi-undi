import connection from "../../db";
import { Request, Response } from "express";
const uuid = require("uuid");
const hash = require("password-hash");
const jwt = require("jsonwebtoken");

//insert data into table language
export const postRegistration = (req: Request, res: Response) => {
  const accountName = req.body.accountName;
  const email = req.body.email;
  const password = hash.generate(req.body.password);
  // const password = req.body.password;
  const fullName = req.body.fullName;
  const handphone = req.body.handphone;
  const identity = req.body.identity;
  const address = req.body.address;
  const city = req.body.city;
  const userid = uuid();

  connection.query(
    `INSERT INTO profiles VALUES (NULL, '${email}', '${userid}', '${handphone}', '${identity}', NULL, '${accountName}', '', NULL, NULL, '${fullName}', '${password}', '${address}', '', '${city}', '', '', '', '', NULL, NULL,NULL, NOW(), NULL, '', '', '')`,
    (err: any, data: any) => {
      if (err) {
        res.send({
          err
        });
      } else {
        const token: any = jwt.sign(
          {
            userId: data.id
          },
          "my-secret-key",
          {
            expiresIn: 60 * 60
          }
        );
        res.send({
          message: "Insert Success",
          data,
          token
        });
      }
    }
  );
};
