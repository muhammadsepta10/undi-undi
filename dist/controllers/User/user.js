"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
exports.getAllUser = (req, res) => {
    db_1.default.query("SELECT handphone, accountname FROM profiles", (err, rows) => {
        if (err) {
            res.send({
                message: "Failed get data",
                success: "0",
                status: "",
                data: "",
                err
            });
        }
        else {
            res.send({
                message: "Get Data Success",
                success: "1",
                status: "200",
                data: rows
            });
        }
    });
};
exports.getUserById = (req, res) => {
    db_1.default.query(`SELECT handphone, accountname FROM profiles WHERE id=${req.params.id}`, (err, rows) => {
        if (err) {
            res.send({
                message: "Failed get data",
                success: "0",
                status: "",
                data: "",
                err
            });
        }
        else {
            res.send({
                message: "Get Data Success",
                success: "1",
                status: "200",
                data: rows[0]
            });
        }
    });
};
// export const putUser = (req: Request, res: Response) => {
//   connection.query(
//     ` UPDATE profiles SET language='${req.body.language}' code='${req.body.code}' WHERE id=${req.params.id} `,
//     (err: any, rows: any) => {
//         if (err) {
//             res.send({ 
//                   message: "Failed get data", 
//                   success: "0",
//                   status: "",
//                   data: "",
//                   err 
//               });
//           } else {
//             res.send({ 
//                   message: "Get Data Success", 
//                   success: "1",
//                   status: "200",
//                   data: [rows[0]]
//               });
//           }
//     }
//   );
// };
exports.deleteUser = (req, res) => {
    db_1.default.query(`DELETE FROM profiles WHERE id=${req.params.id}`, (err, rows) => {
        if (err) {
            res.send({
                message: "Failed get data",
                success: "0",
                status: "",
                data: "",
            });
        }
        else {
            res.send({
                message: "Get Data Success",
                success: "1",
                status: "200",
                data: [rows[0]]
            });
        }
    });
};
