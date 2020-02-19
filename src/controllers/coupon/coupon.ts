import { connection } from "./../../db"
import { Request, Response } from "express"


export const bulkInsert = (req: Request, res: Response) => {
    const sql = "INSERT INTO coupons (coupon,prize_id) VALUES ?"
    const values = [
        [req.body.coupon, req.body.prize_id]
    ]
    connection.query(sql, [values], (err: any) => {
        if (err) {
            res.send({ messages: "error", error: err })
        } else {
            res.send({ messages: "success" })
        }
    })
}