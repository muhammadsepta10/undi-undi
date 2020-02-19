import { connection } from "../../db";
import { Request, Response } from "express";
import * as TOKEN_SECRET from '../../middleware';
const hash = require("password-hash");
const jwt = require('jsonwebtoken');
import { logger } from "../../winston";
import { timeStamp } from "../../helper/helper";

export const postLogin = (req: Request, res: Response) => {
    const email = req.body.email;

    connection.query(
        `SELECT id, email, password FROM profiles where email='${email}'`,
        (err: any, data: any) => {
            if(err) {
                res.send({
                    message: 'Username or Password Incorrect',
                    success: 0,
                    status: "422",
                    data: "",
                    // err
                });
                logger.error({
                    message: "Username or Password Incorrect",
                    API: 'POST -  https://beta-api.undiundi.id/login',
                    query:  `SELECT id, email, password FROM profiles where email='${email}'`,
                    err
                });
            } else {
            
                if (data.length < 1 ) {
                    res.send({
                        message: 'Username or Password Incorrect',
                        success: 0,
                        status: "422",
                        data: ""
                    });

                    logger.warn({
                        message: "Username or Password Incorrect",
                        API: 'POST -  https://beta-api.undiundi.id/login',
                        query:  `SELECT id, email, password FROM profiles where email='${email}'`
                    });
                } else {
                    const password = data[0].password
                    const verifyPassword = hash.verify(req.body.password, password);
                    if ( verifyPassword === true) {
                        const token = jwt.sign(
                            {
                                id: data[0].id
                            },
                            TOKEN_SECRET.default,
                            {
                                expiresIn: '7d'
                            }
                        );
                        res.header('auth-token', token).send({
                            message: "Login Success",
                            token,
                            success: 1,
                            status: "200",
                            data: {
                                token: token
                            }
                        });
                        logger.info({
                            timeStamp,
                            message: {
                                message:  "Login Success",
                                API: 'POST -  https://beta-api.undiundi.id/login',
                                query:  `SELECT id, email, password FROM profiles where email='${email}'` 
                            }
                        });
                    } else {
                        res.send({
                            message: 'Username or Password Incorrect',
                            success: 0,
                            status: "422",
                            data: ""
                        });

                        logger.warn({
                            message: "Username or Password Incorrect",
                            API: 'POST -  https://beta-api.undiundi.id/login',
                            query:  `SELECT id, email, password FROM profiles where email='${email}'`
                        });
                    }
                }
            };
        }
    );
}