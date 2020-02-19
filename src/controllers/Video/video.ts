import { connection } from '../../db';
import { Request, Response } from 'express';

export const getVideo = (req: Request, res: Response) => {
    connection.query(
        `SELECT * FROM videos ORDER BY created_at DESC LIMIT 4`,
        (err: any, rows: any) => {
            if (err) {
                res.send({
                    message: "Get Data Failed",
                    success: 0,
                    status: "422",
                    data: {}                
                })
            }

            if (rows.length > 0) {
                res.send({
                    message: "Get Data Success",
                    success: 1,
                    status: "200",
                    data: rows
                })
            } else {
                res.send({
                    message: "Get Data Failed",
                    success: 0,
                    status: "422",
                    data: {}                
                })
            }
        }
    );
}

export const getVideoById = (req: Request, res: Response) => {
    const id = req.params.id;
    connection.query(
        `SELECT * FROM videos WHERE id=${id}`,
        (err: any, rows: any) => {
            if (err) {
                res.send({
                    message: "Get Data Failed",
                    success: 0,
                    status: "422",
                    data: {}                
                })
            }

            if (rows.length > 0) {
                res.send({
                    message: "Get Data Success",
                    success: 1,
                    status: "200",
                    data: rows
                })
            } else {
                res.send({
                    message: "Get Data Failed",
                    success: 0,
                    status: "422",
                    data: {}                
                })
            }
        }
    );
}