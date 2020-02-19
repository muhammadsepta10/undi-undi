import { connection } from "../../db";
import {Request , Response} from 'express';
import { logger } from '../../winston';

export const getMasterKota = (req: Request, res: Response) => {
    connection.query(
        `SELECT * FROM code_regency`,
        (err: any, rows: any) => {
            if (err) {
                res.send({
                    message: "Get Data Failed",
                    success: 0,
                    status: "422",
                    data: {},
                    // err
                });

                logger.error({
                    message: "Get Data Failed",
                    API: 'GET -  https://beta-api.undiundi.id/master/city/all',
                    query: `SELECT * FROM code_regency`,
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
                        API: 'GET -  https://beta-api.undiundi.id/master/city/all',
                        query: `SELECT * FROM code_regency`
                      });
                } else {
                    res.send({
                        message: "Data Not Found",
                        success: 0,
                        status: "404",
                        data: {},
                    });

                    logger.warn({
                        message: "Data Not Found",
                        API: 'GET -  https://beta-api.undiundi.id/master/city/all',
                        query: `SELECT * FROM code_regency`
                      });
                }
            }
        }
    )
}