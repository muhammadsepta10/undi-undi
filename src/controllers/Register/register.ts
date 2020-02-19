import { connection } from "../../db";
import { Request, Response } from "express";
import { logger } from '../../winston';
// const uuid = require("uuid");
import * as TOKEN_SECRET from '../../middleware';
const hash = require("password-hash");
const jwt = require("jsonwebtoken");

//insert data into table language
export const postRegistration = (req: Request, res: Response) => {
  const accountName = req.body.accountname;
  const email = req.body.email;
  const password = hash.generate(req.body.password);
  const fullName = req.body.fullname;
  const handphone = req.body.handphone;
  const identity = req.body.identity;
  const address = req.body.address;
  const city = req.body.city;
  const language = req.body.language
  // const uuidUser = uuid().replace(/-/g, '');
  // const userid = uuidUser.substring(0, 10);

  if (identity.length === 16) {
    const provinceCode = identity.substring(0,2);
    const regencyCode = identity.substring(0,4);
    const districtCode = identity.substring(0,6);
    const bornDate = (identity.substring(6,8) > 40 ? identity.substring(6,8) - 40 : identity.substring(6,8));
    const gender = (identity.substring(6,8) > 40 ? 2 : 1);
    const yearNow = String(new Date().getFullYear()).substring(2,4);
    const bornYear = (identity.substring(10,12) > parseInt(yearNow) ? parseInt(yearNow) - 1 : yearNow );
    const birthDate = bornYear + identity.substring(10,12)  + '-' + identity.substring(8,10) + '-' + bornDate;

    connection.query(
      `SELECT code_district.area AS district, code_province.area AS province, code_regency.area AS regency FROM code_district, code_province, code_regency 
      WHERE code_province.code = '${provinceCode}' AND code_regency.code = '${regencyCode}' AND code_district.code = '${districtCode}'`,
      (errr: any, datas: any) => {
        if (errr) {
          res.send({
            message: "Registration Failed",
            success: 0,
            status: "422",
            data: {}
          });

          logger.error({
            message: "Registration Failed",
            API: `POST -  https://beta-api.undiundi.id/registration`,
            query: `SELECT code_district.area AS district, code_province.area AS province, code_regency.area AS regency FROM code_district, code_province, code_regency 
            WHERE code_province.code = '${provinceCode}' AND code_regency.code = '${regencyCode}' AND code_district.code = '${districtCode}'`,
            errr
          });
        } else {
          if (datas.length > 0) {

            connection.query(
              `INSERT INTO profiles VALUES (NULL, '${email}', UUID_SHORT(), '${handphone}', '${identity}', NULL, '${accountName}', '', '${birthDate}', ${gender}, '${fullName}', 
              '${password}', '${address}', '', '${city}', '${datas[0].district}', '${datas[0].regency}', '${datas[0].province}', '', NULL, '${language}',NULL, NOW(), NULL, '', '', '')`,
              (err: any, data: any) => {
                if (err) {
                  if (err.errno) {
                    if (err.errno === 1062) {
                      res.send({
                        message: "Email or handphone or identity has been used",
                        success: "0",
                        status: "422",
                        data: "",
                      });

                      logger.error({
                        message: "Duplicate Entry",
                        API: `POST -  https://beta-api.undiundi.id/registration`,
                        query: `INSERT INTO profiles VALUES (NULL, '${email}', UUID_SHORT(), '${handphone}', '${identity}', NULL, '${accountName}', '', '${birthDate}', ${gender}, '${fullName}', 
                        '${password}', '${address}', '', '${city}', '${datas[0].district}', '${datas[0].regency}', '${datas[0].province}', '', NULL, '${language}',NULL, NOW(), NULL, '', '', '')`,
                        errr
                      });
                    }
                  } else {
                      res.send({
                        message: "Registration Failed",
                        success: "0",
                        status: "422",
                        data: ""
                      });

                      logger.error({
                        message: "Registration Failed",
                        API: `POST -  https://beta-api.undiundi.id/registration`,
                        query: `INSERT INTO profiles VALUES (NULL, '${email}', UUID_SHORT(), '${handphone}', '${identity}', NULL, '${accountName}', '', '${birthDate}', ${gender}, '${fullName}', 
                        '${password}', '${address}', '', '${city}', '${datas[0].district}', '${datas[0].regency}', '${datas[0].province}', '', NULL, '${language}',NULL, NOW(), NULL, '', '', '')`,
                        errr
                      });
                  }
                } else {
                  connection.query(
                    `INSERT INTO transactions VALUES ( NULL, '${data.insertId}', 'Registration', '2', 0, NOW() )`,
                    (erro: any, rows: any) => {
                      if (erro) {
                        res.send({
                          message: "Registration Failed",
                          success: "0",
                          status: "422",
                          data: "",
                          // err
                        });

                        logger.error({
                          message: "Registration Failed",
                          API: `POST -  https://beta-api.undiundi.id/registration`,
                          query: `INSERT INTO transactions VALUES ( NULL, '${data.insertId}', 'Registration', '2', 0, NOW() )`,
                          erro
                        });
                      } else {
                        console.log("tes")
                          const token: any = jwt.sign(
                            {
                              id: data.insertId
                            },
                            TOKEN_SECRET.default,
                            {
                              expiresIn: '7d'
                            }
                          );
                          res.header('auth-token', token).send({
                            message: "Registration Success",
                            id: data.insertId,
                            token,
                            success: "1",
                            status: "200",
                            data: {
                              token: token,
                              id: data.insertId
                            }
                          });

                          logger.info({
                            message: "Registration Success",
                            API: `POST -  https://beta-api.undiundi.id/registration`,
                            query: `INSERT INTO transactions VALUES ( NULL, '${data.insertId}', 'Registration', '2', 0, NOW() )`,
                          });
                          
                      }
                    }
                  );
                }
              }
            );
  
          } else {
            res.send({
              message: "Registration Failed",
              success: 0,
              status: "422",
              data: {}
            })

            logger.error({
              message: "Registration Failed",
              API: `POST -  https://beta-api.undiundi.id/registration`,
              query: `INSERT INTO profiles VALUES (NULL, '${email}', UUID_SHORT(), '${handphone}', '${identity}', NULL, '${accountName}', '', '${birthDate}', ${gender}, '${fullName}', 
              '${password}', '${address}', '', '${city}', '${datas[0].district}', '${datas[0].regency}', '${datas[0].province}', '', NULL, '${language}',NULL, NOW(), NULL, '', '', '')`,
            });
          }
        }
      }
    )
    
  } else {

    connection.query(
      `INSERT INTO profiles VALUES (NULL, '${email}', UUID_SHORT(), '${handphone}', '${identity}', NULL, '${accountName}', '', NULL, NULL, '${fullName}', 
      '${password}', '${address}', '', '${city}', NULL, NULL, NULL, '', NULL, '${language}',NULL, NOW(), NULL, '', '', '')`,
      (err: any, data: any) => {
        if (err) {
          if (err.errno) {
            if (err.errno === 1062) {
              res.send({
                message: "Email or handphone or identity has been used",
                success: "0",
                status: "422",
                data: "",
              });

              logger.error({
                message: "Duplicate Entry",
                API: `POST -  https://beta-api.undiundi.id/registration`,
                query: `INSERT INTO profiles VALUES (NULL, '${email}', UUID_SHORT(), '${handphone}', '${identity}', NULL, '${accountName}', '', NULL, NULL, '${fullName}', 
                '${password}', '${address}', '', '${city}', NULL, NULL, NULL, '', NULL, '${language}',NULL, NOW(), NULL, '', '', '')`,
                err
              });
            }
          } else {
              res.send({
                message: "Registration Failed",
                success: "0",
                status: "422",
                data: ""
              });

              logger.error({
                message: "Registration Failed",
                API: `POST -  https://beta-api.undiundi.id/registration`,
                query: `INSERT INTO profiles VALUES (NULL, '${email}', UUID_SHORT(), '${handphone}', '${identity}', NULL, '${accountName}', '', NULL, NULL, '${fullName}', 
                '${password}', '${address}', '', '${city}', NULL, NULL, NULL, '', NULL, '${language}',NULL, NOW(), NULL, '', '', '')`,
                err
              });
          }
        } else {
          connection.query(
            `INSERT INTO transactions VALUES ( NULL, '${data.insertId}', 'Registration', '2', 0, NOW() )`,
            (err: any, rows: any) => {
              if (err) {
                res.send({
                  message: "Failed insert into Transaction",
                  success: "0",
                  status: "422",
                  data: "",
                });

                logger.error({
                  message: "Registration Failed",
                  API: `POST -  https://beta-api.undiundi.id/registration`,
                  query: `INSERT INTO transactions VALUES ( NULL, '${data.insertId}', 'Registration', '2', 0, NOW() )`,
                  err
                });
              } else {
                  const token: any = jwt.sign(
                    {
                      id: data.insertId
                    },
                    TOKEN_SECRET.default,
                    {
                      expiresIn: '7d'
                    }
                  );
                  res.header('auth-token', token).send({
                    message: "Registration Success",
                    id: data.insertId,
                    token,
                    success: "1",
                    status: "200",
                    data: {
                      token: token,
                      id: data.insertId
                    }
                  });

                  logger.info({
                    message: "Registration Failed",
                    API: `POST -  https://beta-api.undiundi.id/registration`,
                    query: `INSERT INTO transactions VALUES ( NULL, '${data.insertId}', 'Registration', '2', 0, NOW() )`,
                  });
              }
            }
          );
        }
      }
    );
  }  
};
