import { Request, Response, NextFunction } from 'express';
import * as TOKEN_SECRET from './middleware';
const jwt = require('jsonwebtoken');

export const auth = (req: Request, res: Response, next:NextFunction) => {
    const token = req.header('auth-token');
    if ( token == undefined ) {
        res.send({
            message: "Access Denied (Unauthorized) ",
            status: "401",
            success: 0,
            data: {}
        });
    } else {
        try {
            const verify = jwt.verify(token, TOKEN_SECRET.default);
            // res.send(verify)
            next()
        } catch (err) {
            res.send({
                message: "Invalid Token",
                status: "401",
                success: 0,
                data: {}
            });
        
        }
    }
};