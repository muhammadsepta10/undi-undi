"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
//list Prize data in table prizes
exports.getAllPrize = (req, res) => {
    var sql = `SELECT SUM\(point\) total FROM transactions \
    LEFT JOIN entries ON entries.trans_id= transactions.id \
    LEFT JOIN prizes_category ON prizes_category.id= transactions.prizes_category_id \
    WHERE transactions.profile_id= ${req.params.id} \
    AND transactions.prizes_category_id=2 \
    GROUP BY transactions.profile_id `;
    // console.log(sql);
    db_1.connection.query(sql, (err, data) => {
        if (err) {
            throw err;
        }
        else {
            //list prizes
            var total_point = data[0].total;
            console.log(total_point);
            db_1.connection.query("SELECT * FROM prizes WHERE category = 2 ", (err, data2) => {
                //console.log(total_point) ;
                if (err) {
                    throw err;
                }
                else {
                    res.send({
                        message: "Get Data Success",
                        profile_id: req.params.id,
                        total_point_user: total_point,
                        data: data2,
                        status: 200,
                        succes: 1
                    });
                }
            });
        }
    });
};
//
// export const RedemPoint = (req: Request, res: Response) => {
//   var sql = `SELECT SUM\(point\) total FROM transactions \
//             LEFT JOIN entries ON entries.trans_id= transactions.id \
//             LEFT JOIN prizes_category ON prizes_category.id= transactions.prizes_category_id \
//             WHERE transactions.profile_id= ${req.params.id} \
//             AND transactions.prizes_category_id=2 \
//             GROUP BY transactions.profile_id `;
//   // console.log(sql);
//   connection.query(sql, (err: any, data: any) => {
//     if (err) {
//       throw err;
//     } else {
//       res.send({
//         message: "Redem Point Succes",
//         data: data,
//         status: 200,
//         succes: 1
//       });
//     }
//   });
// };
