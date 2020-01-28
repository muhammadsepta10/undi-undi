import connection from "../../db";
import { Request, Response } from "express";

export const postLogin = (req: Request, res: Response) => {
    const email = req.body.email;
    // const password = req.body.password;

    connection.query(
        `SELECT email, password FROM profiles where email='${email}'`,
        (err: any, data: any) => {
            if(err) {
                res.send({
                    err
                })
            } else {
                if(data.length > 0) {
                    console.log(data.length)
                    res.send(data[0].password)
                } else {
                    res.send({
                        message: 'Data Not Found'
                    })
                }
            }
        }
    );
}