"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const moment = require("moment");
const appRoot = require("app-root-path");
const TOKEN_SECRET = require("../../middleware");
const jwt = require("jsonwebtoken");
const winston_1 = require("./../../winston");
exports.checkUserAnswered = (req, res) => {
    // const API = "GET-https://beta-api.undiundi/survey/surveyAvailable";
    // const token = req.header("auth-token");
    // const verify = jwt.verify(token, TOKEN_SECRET.default);
    // connection.query(
    //   `SELECT language FROM profiles WHERE id=${verify.id}`,
    //   (err: any, lang: any) => {
    //     const language = lang[0].language.toLowerCase();
    //     // jika bahasa inggris
    //     if (language === "en") {
    //       connection.query(
    //         `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
    //           "YYYY-MM-DD"
    //         )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`,
    //         (err: any, data: any) => {
    //           if (err) {
    //             logger.error({
    //               message: "failed to get data periode",
    //               API: API,
    //               err,
    //               query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
    //                 "YYYY-MM-DD"
    //               )}' AND end_date>'${moment().format(
    //                 "YYYY-MM-DD"
    //               )}' AND category=5`
    //             });
    //             res.send({
    //               message: "error",
    //               status: 400,
    //               success: 0,
    //               data: {}
    //             });
    //           } else {
    //             if (data.length < 1) {
    //               if (data.length < 1) {
    //                 logger.warn({
    //                   message:
    //                     "the survey event isn't available yet please try another time",
    //                   API: API,
    //                   query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}' AND end_date>'${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}' AND category=5`
    //                 });
    //                 res.send({
    //                   message:
    //                     "Sorry the survey event isn't available yet please try another time",
    //                   status: 200,
    //                   success: 1,
    //                   data: data
    //                 });
    //               } else {
    //                 connection.query(
    //                   `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                     verify.id
    //                   } AND start_date<='${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}' AND periode.end_date>'${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}'`,
    //                   (err: any, data: any) => {
    //                     if (err) {
    //                       logger.error({
    //                         message: "failed to get data survey_entries",
    //                         API: API,
    //                         err,
    //                         query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                           verify.id
    //                         } AND start_date<='${moment().format(
    //                           "YYYY-MM-DD"
    //                         )}' AND periode.end_date>'${moment().format(
    //                           "YYYY-MM-DD"
    //                         )}'`
    //                       });
    //                       res.send({
    //                         message: "error",
    //                         status: 400,
    //                         success: 0,
    //                         data: {}
    //                       });
    //                     } else {
    //                       if (data.length < 1) {
    //                         logger.info({
    //                           message: "can take survey",
    //                           API: API,
    //                           query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                             verify.id
    //                           } AND start_date<='${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}' AND periode.end_date>'${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}'`
    //                         });
    //                         res.send({
    //                           message: "you can take this survey",
    //                           status: 200,
    //                           success: 1,
    //                           data: {}
    //                         });
    //                       } else {
    //                         logger.warn({
    //                           message:
    //                             " you have taken this survey try another time",
    //                           API: API,
    //                           query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                             verify.id
    //                           } AND start_date<='${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}' AND periode.end_date>'${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}'`
    //                         });
    //                         res.send({
    //                           message:
    //                             "sorry you have taken this survey try another time ",
    //                           status: 200,
    //                           success: 1,
    //                           data: {}
    //                         });
    //                       }
    //                     }
    //                   }
    //                 );
    //               }
    //             }
    //           }
    //         }
    //       );
    //     } else if (language === "idn") {
    //       // bahasa indonesia
    //       connection.query(
    //         `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
    //           "YYYY-MM-DD"
    //         )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`,
    //         (err: any, data: any) => {
    //           if (err) {
    //             logger.error({
    //               message: "failed to get data periode",
    //               API: API,
    //               err,
    //               query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
    //                 "YYYY-MM-DD"
    //               )}' AND end_date>'${moment().format(
    //                 "YYYY-MM-DD"
    //               )}' AND category=5`
    //             });
    //             res.send({
    //               message: "error",
    //               status: 400,
    //               success: 0,
    //               data: {}
    //             });
    //           } else {
    //             if (data.length < 1) {
    //               if (data.length < 1) {
    //                 logger.warn({
    //                   message:
    //                     "the survey event isn't available yet please try another time",
    //                   API: API,
    //                   query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}' AND end_date>'${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}' AND category=5`
    //                 });
    //                 res.send({
    //                   message: "Maaf survey belum tersedia coba lagi lain waktu",
    //                   status: 200,
    //                   succes: {}
    //                 });
    //               } else {
    //                 connection.query(
    //                   `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                     verify.id
    //                   } AND start_date<='${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}' AND periode.end_date>'${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}'`,
    //                   (err: any, data: any) => {
    //                     if (err) {
    //                       logger.error({
    //                         message: "failed to get data survey_entries",
    //                         API: API,
    //                         err,
    //                         query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                           verify.id
    //                         } AND start_date<='${moment().format(
    //                           "YYYY-MM-DD"
    //                         )}' AND periode.end_date>'${moment().format(
    //                           "YYYY-MM-DD"
    //                         )}'`
    //                       });
    //                       res.send({
    //                         message: "error",
    //                         status: 400,
    //                         success: 0,
    //                         data: {}
    //                       });
    //                     } else {
    //                       if (data.length < 1) {
    //                         logger.info({
    //                           message: "can take survey",
    //                           API: API,
    //                           query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                             verify.id
    //                           } AND start_date<='${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}' AND periode.end_date>'${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}'`
    //                         });
    //                         res.send({
    //                           message: "Anda dapat mengisi survey ini",
    //                           status: 200,
    //                           success: 1,
    //                           data: {}
    //                         });
    //                       } else {
    //                         logger.warn({
    //                           message:
    //                             " you have taken this survey try another time",
    //                           API: API,
    //                           query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                             verify.id
    //                           } AND start_date<='${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}' AND periode.end_date>'${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}'`
    //                         });
    //                         res.send({
    //                           message:
    //                             "Maaf anda sudah pernah mengisi survey ini, coba di lain waktu ",
    //                           status: 200,
    //                           success: 1,
    //                           data: {}
    //                         });
    //                       }
    //                     }
    //                   }
    //                 );
    //               }
    //             }
    //           }
    //         }
    //       );
    //     } else {
    //       // default languages
    //       connection.query(
    //         `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
    //           "YYYY-MM-DD"
    //         )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`,
    //         (err: any, data: any) => {
    //           if (err) {
    //             logger.error({
    //               message: "failed to get data periode",
    //               API: API,
    //               err,
    //               query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
    //                 "YYYY-MM-DD"
    //               )}' AND end_date>'${moment().format(
    //                 "YYYY-MM-DD"
    //               )}' AND category=5`
    //             });
    //             res.send({
    //               message: "error",
    //               status: 400,
    //               success: 0,
    //               data: {}
    //             });
    //           } else {
    //             if (data.length < 1) {
    //               if (data.length < 1) {
    //                 logger.warn({
    //                   message:
    //                     "the survey event isn't available yet please try another time",
    //                   API: API,
    //                   query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}' AND end_date>'${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}' AND category=5`
    //                 });
    //                 res.send({
    //                   message:
    //                     "Sorry the survey event isn't available yet please try another time",
    //                   status: 200,
    //                   success: 1,
    //                   data: data
    //                 });
    //               } else {
    //                 connection.query(
    //                   `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                     verify.id
    //                   } AND start_date<='${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}' AND periode.end_date>'${moment().format(
    //                     "YYYY-MM-DD"
    //                   )}'`,
    //                   (err: any, data: any) => {
    //                     if (err) {
    //                       logger.error({
    //                         message: "failed to get data survey_entries",
    //                         API: API,
    //                         err,
    //                         query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                           verify.id
    //                         } AND start_date<='${moment().format(
    //                           "YYYY-MM-DD"
    //                         )}' AND periode.end_date>'${moment().format(
    //                           "YYYY-MM-DD"
    //                         )}'`
    //                       });
    //                       res.send({
    //                         message: "error",
    //                         status: 400,
    //                         success: 0,
    //                         data: {}
    //                       });
    //                     } else {
    //                       if (data.length < 1) {
    //                         logger.info({
    //                           message: "can take survey",
    //                           API: API,
    //                           query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                             verify.id
    //                           } AND start_date<='${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}' AND periode.end_date>'${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}'`
    //                         });
    //                         res.send({
    //                           message: "you can take this survey",
    //                           status: 200,
    //                           success: 1,
    //                           data: {}
    //                         });
    //                       } else {
    //                         logger.warn({
    //                           message:
    //                             " you have taken this survey try another time",
    //                           API: API,
    //                           query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${
    //                             verify.id
    //                           } AND start_date<='${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}' AND periode.end_date>'${moment().format(
    //                             "YYYY-MM-DD"
    //                           )}'`
    //                         });
    //                         res.send({
    //                           message:
    //                             "sorry you have taken this survey try another time ",
    //                           status: 200,
    //                           success: 1,
    //                           data: {}
    //                         });
    //                       }
    //                     }
    //                   }
    //                 );
    //               }
    //             }
    //           }
    //         }
    //       );
    //     }
    //   }
    // );
};
exports.surveyQuestions = (req, res) => {
    const API = "GET-https://beta-api.undiundi/survey/questions";
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    db_1.connection.query(`SELECT language FROM profiles WHERE id=${verify.id}`, (err, lang) => {
        const language = lang[0].language.toLowerCase();
        // jika bahasa inggris
        if (language === "en") {
            db_1.connection.query(`SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data periode",
                        API: API,
                        err,
                        query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warn({
                            message: "the survey event isn't available yet please try another time",
                            API: API,
                            query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`
                        });
                        res.send({
                            message: "Sorry the survey event isn't available yet please try another time",
                            status: 200,
                            success: 1,
                            data: data
                        });
                    }
                    else {
                        db_1.connection.query(`SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}'`, (err, data) => {
                            if (err) {
                                winston_1.logger.error({
                                    message: "failed to get data survey_entries",
                                    API: API,
                                    err,
                                    query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}'`
                                });
                                res.send({
                                    message: "error",
                                    status: 400,
                                    success: 0,
                                    data: {}
                                });
                            }
                            else {
                                if (data.length < 1) {
                                    db_1.connection.query(`SELECT COUNT(*) as total FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`, (err, total) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "failed to get data",
                                                API: API,
                                                err,
                                                query: `SELECT COUNT(*) as total FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            if (total[0].length < 1) {
                                                winston_1.logger.warn({
                                                    message: "Can't find data",
                                                    API: API,
                                                    query: `SELECT COUNT(*) as total FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`
                                                });
                                                res.send({
                                                    message: "Can't find data",
                                                    status: 404,
                                                    success: 1,
                                                    data: total
                                                });
                                            }
                                            else {
                                                const page = req.query.page;
                                                const totalData = total[0].total;
                                                const dataPerPage = 1;
                                                const totalPage = Math.ceil(totalData / dataPerPage);
                                                const currentPage = parseInt(page !== undefined ? page : 1);
                                                const firstData = dataPerPage * currentPage - dataPerPage;
                                                const nextPage = currentPage === totalPage
                                                    ? null
                                                    : "https://beta-api.undiundi.id/survey/questions" +
                                                        "?page=" +
                                                        (currentPage + 1);
                                                const prevPage = currentPage === 1
                                                    ? null
                                                    : "https://beta-api.undiundi.id/survey/questions" +
                                                        "?page=" +
                                                        (currentPage - 1);
                                                db_1.connection.query(`SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`, (err, data) => {
                                                    if (err) {
                                                        winston_1.logger.error({
                                                            message: "failed to get data",
                                                            API: API,
                                                            err,
                                                            query: `SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`
                                                        });
                                                        res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                        });
                                                    }
                                                    else {
                                                        if (data.length < 1) {
                                                            winston_1.logger.warn({
                                                                message: "Can't find data",
                                                                API: API,
                                                                query: `SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`
                                                            });
                                                            res.send({
                                                                message: "Can't find data",
                                                                status: 404,
                                                                success: 1,
                                                                data: {
                                                                    dataPerPage: dataPerPage,
                                                                    totalData: totalData,
                                                                    totalPage: totalPage,
                                                                    nextPage: null,
                                                                    data
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            winston_1.logger.info({
                                                                message: "success to get data questions",
                                                                API: API,
                                                                query: `SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`
                                                            });
                                                            res.send({
                                                                message: "success to get data",
                                                                status: 200,
                                                                success: 1,
                                                                data: {
                                                                    dataPerPage: dataPerPage,
                                                                    totalData: totalData,
                                                                    totalPage: totalPage,
                                                                    nextPage: nextPage,
                                                                    data
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                                else {
                                    winston_1.logger.warn({
                                        message: " you have taken this survey try another time",
                                        API: API,
                                        query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}'`
                                    });
                                    res.send({
                                        message: "sorry you have taken this survey try another time ",
                                        status: 200,
                                        success: 1,
                                        data: {}
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
        // jika bahasa Indonesia
        else if (language === "idn") {
            db_1.connection.query(`SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data periode",
                        API: API,
                        err,
                        query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warn({
                            message: "the survey event isn't available yet please try another time",
                            API: API,
                            query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`
                        });
                        res.send({
                            message: "Maaf survey belum tersedia coba lagi lain waktu",
                            status: 200,
                            succes: {}
                        });
                    }
                    else {
                        db_1.connection.query(`SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}'`, (err, data) => {
                            if (err) {
                                winston_1.logger.error({
                                    message: "failed to get data survey_entries",
                                    API: API,
                                    err,
                                    query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}'`
                                });
                                res.send({
                                    message: "error",
                                    status: 400,
                                    success: 0,
                                    data: {}
                                });
                            }
                            else {
                                if (data.length < 1) {
                                    db_1.connection.query(`SELECT COUNT(*) as total FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`, (err, total) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "failed to get data",
                                                API: API,
                                                err,
                                                query: `SELECT COUNT(*) as total FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            if (total[0].length < 1) {
                                                winston_1.logger.warn({
                                                    message: "Can't find data",
                                                    API: API,
                                                    query: `SELECT COUNT(*) as total FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`
                                                });
                                                res.send({
                                                    message: "data tidak ditemukan",
                                                    status: 404,
                                                    success: 1,
                                                    data: {}
                                                });
                                            }
                                            else {
                                                const page = req.query.page;
                                                const totalData = total[0].total;
                                                const dataPerPage = 1;
                                                const totalPage = Math.ceil(totalData / dataPerPage);
                                                const currentPage = parseInt(page !== undefined ? page : 1);
                                                const firstData = dataPerPage * currentPage - dataPerPage;
                                                const nextPage = currentPage === totalPage
                                                    ? null
                                                    : "https://beta-api.undiundi.id/survey/questions" +
                                                        "?page=" +
                                                        (currentPage + 1);
                                                const prevPage = currentPage === 1
                                                    ? null
                                                    : "https://beta-api.undiundi.id/survey/questions" +
                                                        "?page=" +
                                                        (currentPage - 1);
                                                db_1.connection.query(`SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`, (err, data) => {
                                                    if (err) {
                                                        winston_1.logger.error({
                                                            message: "failed to get data",
                                                            API: API,
                                                            err,
                                                            query: `SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`
                                                        });
                                                        res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                        });
                                                    }
                                                    else {
                                                        if (data.length < 1) {
                                                            winston_1.logger.warn({
                                                                message: "Can't find data",
                                                                API: API,
                                                                query: `SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`
                                                            });
                                                            res.send({
                                                                message: "Data tidak ditemukan",
                                                                status: 404,
                                                                success: 1,
                                                                data: {
                                                                    dataPerPage: dataPerPage,
                                                                    totalData: totalData,
                                                                    totalPage: totalPage,
                                                                    nextPage: null,
                                                                    data
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            winston_1.logger.info({
                                                                message: "success to get data questions",
                                                                API: API,
                                                                query: `SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`
                                                            });
                                                            res.send({
                                                                message: "sukses mendapatkan data",
                                                                status: 200,
                                                                success: 1,
                                                                data: {
                                                                    dataPerPage: dataPerPage,
                                                                    totalData: totalData,
                                                                    totalPage: totalPage,
                                                                    nextPage: nextPage,
                                                                    data
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                                else {
                                    winston_1.logger.warn({
                                        message: " you have taken this survey try another time",
                                        API: API,
                                        query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}'`
                                    });
                                    res.send({
                                        message: "Maaf anda sudah pernah mengisi survey ini, coba di lain waktu ",
                                        status: 200,
                                        success: 1,
                                        data: {}
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
        // jika data yang dimasukan tidak ada bahasa default
        else {
            db_1.connection.query(`SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data periode",
                        API: API,
                        err,
                        query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warn({
                            message: "the survey event isn't available yet please try another time",
                            API: API,
                            query: `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`
                        });
                        res.send({
                            message: "Sorry the survey event isn't available yet please try another time",
                            status: 200,
                            success: 1,
                            data: data
                        });
                    }
                    else {
                        db_1.connection.query(`SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}'`, (err, data) => {
                            if (err) {
                                winston_1.logger.error({
                                    message: "failed to get data survey_entries",
                                    API: API,
                                    err,
                                    query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}'`
                                });
                                res.send({
                                    message: "error",
                                    status: 400,
                                    success: 0,
                                    data: {}
                                });
                            }
                            else {
                                if (data.length < 1) {
                                    db_1.connection.query(`SELECT COUNT(*) as total FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`, (err, total) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "failed to get data",
                                                API: API,
                                                err,
                                                query: `SELECT COUNT(*) as total FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            if (total[0].length < 1) {
                                                winston_1.logger.warn({
                                                    message: "Can't find data",
                                                    API: API,
                                                    query: `SELECT COUNT(*) as total FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`
                                                });
                                                res.send({
                                                    message: "Can't find data",
                                                    status: 404,
                                                    success: 1,
                                                    data: total
                                                });
                                            }
                                            else {
                                                const page = req.query.page;
                                                const totalData = total[0].total;
                                                const dataPerPage = 1;
                                                const totalPage = Math.ceil(totalData / dataPerPage);
                                                const currentPage = parseInt(page !== undefined ? page : 1);
                                                const firstData = dataPerPage * currentPage - dataPerPage;
                                                const nextPage = currentPage === totalPage
                                                    ? null
                                                    : "https://beta-api.undiundi.id/survey/questions" +
                                                        "?page=" +
                                                        (currentPage + 1);
                                                const prevPage = currentPage === 1
                                                    ? null
                                                    : "https://beta-api.undiundi.id/survey/questions" +
                                                        "?page=" +
                                                        (currentPage - 1);
                                                db_1.connection.query(`SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`, (err, data) => {
                                                    if (err) {
                                                        winston_1.logger.error({
                                                            message: "failed to get data",
                                                            API: API,
                                                            err,
                                                            query: `SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`
                                                        });
                                                        res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                        });
                                                    }
                                                    else {
                                                        if (data.length < 1) {
                                                            winston_1.logger.warn({
                                                                message: "Can't find data",
                                                                API: API,
                                                                query: `SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`
                                                            });
                                                            res.send({
                                                                message: "Can't find data",
                                                                status: 404,
                                                                success: 1,
                                                                data: {
                                                                    dataPerPage: dataPerPage,
                                                                    totalData: totalData,
                                                                    totalPage: totalPage,
                                                                    nextPage: null,
                                                                    data
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            winston_1.logger.info({
                                                                message: "success to get data questions",
                                                                API: API,
                                                                query: `SELECT survey_questions.id,question FROM survey_questions JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5 ORDER BY survey_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`
                                                            });
                                                            res.send({
                                                                message: "success to get data",
                                                                status: 200,
                                                                success: 1,
                                                                data: {
                                                                    dataPerPage: dataPerPage,
                                                                    totalData: totalData,
                                                                    totalPage: totalPage,
                                                                    nextPage: nextPage,
                                                                    data
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                                else {
                                    winston_1.logger.warn({
                                        message: " you have taken this survey try another time",
                                        API: API,
                                        query: `SELECT survey_entries.id, survey_entries.profile_id,survey_entries.periode,periode.id as periode,periode.start_date,periode.end_date FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}'`
                                    });
                                    res.send({
                                        message: "sorry you have taken this survey try another time ",
                                        status: 200,
                                        success: 1,
                                        data: {}
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    });
};
exports.surveyAnswer = (req, res) => {
    const API = `GET-https://beta-api.undiundi/survey/answer/${req.params.questionsId}`;
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    db_1.connection.query(`SELECT language FROM profiles WHERE id=${verify.id}`, (err, lang) => {
        const language = lang[0].language.toLowerCase();
        if (language === "en") {
            db_1.connection.query(`SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warn({
                            message: "data not found",
                            API: API,
                            query: `SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`
                        });
                        res.send({
                            message: "data not found",
                            status: 200,
                            success: 1,
                            data: {}
                        });
                    }
                    else {
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: data
                        });
                    }
                }
            });
        }
        else if (language === "idn") {
            db_1.connection.query(`SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warn({
                            message: "data not found",
                            API: API,
                            query: `SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`
                        });
                        res.send({
                            message: "data tidak ditemukan",
                            status: 200,
                            success: 1,
                            data: {}
                        });
                    }
                    else {
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`
                        });
                        res.send({
                            message: "Sukses mendapatkan data",
                            status: 200,
                            success: 1,
                            data: data
                        });
                    }
                }
            });
        }
        else {
            db_1.connection.query(`SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "failed to get data",
                        API: API,
                        err,
                        query: `SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length < 1) {
                        winston_1.logger.warn({
                            message: "data not found",
                            API: API,
                            query: `SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`
                        });
                        res.send({
                            message: "data not found",
                            status: 200,
                            success: 1,
                            data: {}
                        });
                    }
                    else {
                        winston_1.logger.info({
                            message: "success get data",
                            API: API,
                            query: `SELECT id,code,answer FROM survey_answers WHERE survey_question_id=${req.params.questionsId}`
                        });
                        res.send({
                            message: "success to get data",
                            status: 200,
                            success: 1,
                            data: data
                        });
                    }
                }
            });
        }
    });
};
exports.surveyEntries = (req, res) => {
    const API = `POST-https://beta-api.undiundi/survey/entries`;
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    db_1.connection.query(`SELECT language FROM profiles WHERE id=${verify.id}`, (err, lang) => {
        const language = lang[0].language.toLowerCase();
        if (language === "en") {
            const query = `SELECT id FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`;
            db_1.connection.query(query, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "error",
                        API: API,
                        err,
                        query: query
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    // response yang dikirim jika tidak ditemukan quiz setting yang sedang berjalan
                    if (data.length < 1) {
                        winston_1.logger.warn({
                            message: "Time Ups, try again late",
                            API: API,
                            query: query
                        });
                        res.send({
                            message: "Time Ups, try again later",
                            status: 200,
                            success: 1,
                            data: {}
                        });
                    }
                    else {
                        const token = req.header("auth-token");
                        const verify = jwt.verify(token, TOKEN_SECRET.default);
                        // cek jawaban duplicate dari user
                        const query = `SELECT profile_id,survey_answer,periode FROM survey_entries WHERE profile_id =${verify.id} AND survey_answer = ${req.body.answerId} AND periode = ${data[0].id} `;
                        db_1.connection.query(query, (err, duplicateEntries) => {
                            if (err) {
                                winston_1.logger.error({
                                    message: "errorr",
                                    API: API,
                                    err,
                                    query: query
                                });
                                res.send({
                                    message: "error",
                                    status: 400,
                                    success: 0,
                                    data: {}
                                });
                            }
                            else {
                                // perintah jika user sudah pernah mengisi jawaban sebelumnya (jawaban yang dipilih tidak diinputkan kembali ke database)
                                if (duplicateEntries.length >= 1) {
                                    // menghitung jumlah question dalam satu periode berjalan
                                    const query = `SELECT COUNT(*) AS countQuestions FROM survey_questions LEFT JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`;
                                    db_1.connection.query(query, (err, count) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            winston_1.logger.warn({
                                                message: "data not found",
                                                API: API,
                                                query: query
                                            });
                                            if (count[0] < 1) {
                                                res.send({
                                                    message: "data not found",
                                                    status: 200,
                                                    success: 1,
                                                    data: {}
                                                });
                                            }
                                            else {
                                                let countQuestions = count[0].countQuestions;
                                                // menghitung jumlah jawaban yang diinputkan user
                                                const query = `SELECT COUNT(*) AS countAnswer FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND (periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}') AND periode.category=5`;
                                                db_1.connection.query(query, (err, countEntries) => {
                                                    if (err) {
                                                        winston_1.logger.error({
                                                            message: "error",
                                                            API: API,
                                                            err,
                                                            query: query
                                                        });
                                                        res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                        });
                                                    }
                                                    else {
                                                        if (countEntries[0].countAnswer < 1) {
                                                            winston_1.logger.warn({
                                                                message: "data not found",
                                                                API: API,
                                                                query: query
                                                            });
                                                            res.send({
                                                                message: "data not found",
                                                                status: 200,
                                                                success: 1,
                                                                data: {}
                                                            });
                                                        }
                                                        else {
                                                            let userAnswer = countEntries[0].countAnswer;
                                                            // cek apakah jawaban dan pertanyaan berjumlah sama
                                                            if (countQuestions === userAnswer) {
                                                                const query = `SELECT profile_id,periode FROM survey_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                                                db_1.connection.query(query, (err, checkLead) => {
                                                                    if (err) {
                                                                        winston_1.logger.error({
                                                                            message: "error",
                                                                            API: API,
                                                                            err,
                                                                            query: query
                                                                        });
                                                                        res.send({
                                                                            message: "error",
                                                                            status: 400,
                                                                            success: 0,
                                                                            data: {}
                                                                        });
                                                                    }
                                                                    else {
                                                                        if (checkLead.length < 1) {
                                                                            const query = `INSERT INTO survey_leaderboard (profile_id,periode,createdAt) VALUES(${verify.id},${data[0].id},'${moment().format("YYYY-MM-DD")}')`;
                                                                            db_1.connection.query(query, (err, lead) => {
                                                                                if (err) {
                                                                                    winston_1.logger.error({
                                                                                        message: "error",
                                                                                        API: API,
                                                                                        err,
                                                                                        query: query
                                                                                    });
                                                                                    res.send({
                                                                                        message: "error",
                                                                                        status: 400,
                                                                                        success: 0,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    winston_1.logger.info({
                                                                                        message: "Thank you for participating in our survey",
                                                                                        API: API,
                                                                                        query: query
                                                                                    });
                                                                                    res.send({
                                                                                        message: `Thank you for participating in our survey`,
                                                                                        status: 200,
                                                                                        success: 1,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            // insert point
                                                                            const query = `INSERT INTO point (profile_id,date,type_point,point) VALUES(${verify.id},'${moment().format("YYYY-MM-DD")}',3,10)`;
                                                                            db_1.connection.query(query, (err, data) => {
                                                                                if (err) {
                                                                                    winston_1.logger.error({
                                                                                        message: "error insert point",
                                                                                        API: API,
                                                                                        query: query,
                                                                                        err
                                                                                    });
                                                                                    res.send({
                                                                                        message: "error",
                                                                                        status: "400",
                                                                                        success: 0,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    winston_1.logger.info({
                                                                                        message: "Thank you for participating in our survey",
                                                                                        API: API,
                                                                                        query: query
                                                                                    });
                                                                                    res.send({
                                                                                        message: `Thank you for participating in our survey`,
                                                                                        status: 200,
                                                                                        success: 1,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                            else {
                                                                winston_1.logger.info({
                                                                    message: "Continue answering the survey",
                                                                    API: API,
                                                                    query: query
                                                                });
                                                                res.send({
                                                                    message: `Continue answering the survey`,
                                                                    status: 200,
                                                                    success: 1,
                                                                    data: {}
                                                                });
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                                else {
                                    // jika user belum pernah mengikuti quiz sama sekali, jawaban yang diinputak user akan diinput ke database
                                    const query = `INSERT INTO survey_entries (profile_id,survey_answer,periode) VALUES (${verify.id},${req.body.answerId},${data[0].id})`;
                                    db_1.connection.query(query, (err, rows) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            if (rows.insertId > 0) {
                                                // menghitung jumlah question dalam satu periode berjalan
                                                const query = `SELECT COUNT(*) AS countQuestions FROM survey_questions LEFT JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`;
                                                db_1.connection.query(query, (err, count) => {
                                                    if (err) {
                                                        winston_1.logger.error({
                                                            message: "error",
                                                            API: API,
                                                            err,
                                                            query: query
                                                        });
                                                        res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                        });
                                                    }
                                                    else {
                                                        if (count[0] < 1) {
                                                            winston_1.logger.warn({
                                                                message: "data not found",
                                                                API: API,
                                                                query: query
                                                            });
                                                            res.send({
                                                                message: "data not found",
                                                                status: 200,
                                                                success: 1,
                                                                data: {}
                                                            });
                                                        }
                                                        else {
                                                            let countQuestions = count[0].countQuestions;
                                                            // menghitung jumlah jawaban yang diinputkan user
                                                            const query = `SELECT COUNT(*) AS countAnswer FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND (periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}') AND periode.category=5`;
                                                            db_1.connection.query(query, (err, countEntries) => {
                                                                if (err) {
                                                                    winston_1.logger.error({
                                                                        message: "error",
                                                                        API: API,
                                                                        err,
                                                                        query: query
                                                                    });
                                                                    res.send({
                                                                        message: "error",
                                                                        status: 400,
                                                                        success: 0,
                                                                        data: {}
                                                                    });
                                                                }
                                                                else {
                                                                    if (countEntries[0].countAnswer < 1) {
                                                                        winston_1.logger.warn({
                                                                            message: "data not found",
                                                                            API: API,
                                                                            query: query
                                                                        });
                                                                        res.send({
                                                                            message: "data not found",
                                                                            status: 200,
                                                                            success: 1,
                                                                            data: {}
                                                                        });
                                                                    }
                                                                    else {
                                                                        let userAnswer = countEntries[0].countAnswer;
                                                                        // cek apakah jawaban dan pertanyaan berjumlah sama
                                                                        if (countQuestions === userAnswer) {
                                                                            const query = `SELECT profile_id,periode FROM survey_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                                                            db_1.connection.query(query, (err, checkLead) => {
                                                                                if (err) {
                                                                                    winston_1.logger.error({
                                                                                        message: "error",
                                                                                        API: API,
                                                                                        err,
                                                                                        query: query
                                                                                    });
                                                                                    res.send({
                                                                                        message: "error",
                                                                                        status: 400,
                                                                                        success: 0,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    if (checkLead.length < 1) {
                                                                                        const query = `INSERT INTO survey_leaderboard (profile_id,periode,createdAt) VALUES(${verify.id},${data[0].id},'${moment().format("YYYY-MM-DD")}')`;
                                                                                        db_1.connection.query(query, (err, lead) => {
                                                                                            winston_1.logger.error({
                                                                                                message: "error",
                                                                                                API: API,
                                                                                                err,
                                                                                                query: query
                                                                                            });
                                                                                            if (err) {
                                                                                                res.send({
                                                                                                    message: "error",
                                                                                                    status: 400,
                                                                                                    success: 0,
                                                                                                    data: {}
                                                                                                });
                                                                                            }
                                                                                            else {
                                                                                                winston_1.logger.info({
                                                                                                    message: "Thank you for participating in our survey",
                                                                                                    API: API,
                                                                                                    query: query
                                                                                                });
                                                                                                res.send({
                                                                                                    message: `Thank you for participating in our survey`,
                                                                                                    status: 200,
                                                                                                    success: 1,
                                                                                                    data: {}
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else {
                                                                                        // insert point
                                                                                        const query = `INSERT INTO point (profile_id,date,type_point,point) VALUES(${verify.id},'${moment().format("YYYY-MM-DD")}',3,10)`;
                                                                                        db_1.connection.query(query, (err, data) => {
                                                                                            if (err) {
                                                                                                winston_1.logger.error({
                                                                                                    message: "error insert point",
                                                                                                    API: API,
                                                                                                    query: query,
                                                                                                    err
                                                                                                });
                                                                                                res.send({
                                                                                                    message: "error",
                                                                                                    status: "400",
                                                                                                    success: 0,
                                                                                                    data: {}
                                                                                                });
                                                                                            }
                                                                                            else {
                                                                                                winston_1.logger.info({
                                                                                                    message: "Thank you for participating in our survey",
                                                                                                    API: API,
                                                                                                    query: query
                                                                                                });
                                                                                                res.send({
                                                                                                    message: `Thank you for participating in our survey`,
                                                                                                    status: 200,
                                                                                                    success: 1,
                                                                                                    data: {}
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            winston_1.logger.info({
                                                                                message: "Continue answering the survey",
                                                                                API: API,
                                                                                query: query
                                                                            });
                                                                            res.send({
                                                                                message: `Continue answering the survey`,
                                                                                status: 200,
                                                                                success: 1,
                                                                                data: {}
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                            else {
                                                winston_1.logger.warn({
                                                    message: "not found script for input",
                                                    API: API,
                                                    query: query
                                                });
                                                res.send({
                                                    message: `not found script for input`,
                                                    status: 404,
                                                    success: 0,
                                                    data: {}
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
        else if (language === "idn") {
            const query = `SELECT id FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`;
            db_1.connection.query(query, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "error",
                        API: API,
                        err,
                        query: query
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    // response yang dikirim jika tidak ditemukan quiz setting yang sedang berjalan
                    if (data.length < 1) {
                        winston_1.logger.warn({
                            message: "Time Ups, try again late",
                            API: API,
                            query: query
                        });
                        res.send({
                            message: "Waktu habis, coba lagi di lain waktu",
                            status: 200,
                            success: 1,
                            data: {}
                        });
                    }
                    else {
                        const token = req.header("auth-token");
                        const verify = jwt.verify(token, TOKEN_SECRET.default);
                        // cek jawaban duplicate dari user
                        const query = `SELECT profile_id,survey_answer,periode FROM survey_entries WHERE profile_id =${verify.id} AND survey_answer = ${req.body.answerId} AND periode = ${data[0].id} `;
                        db_1.connection.query(query, (err, duplicateEntries) => {
                            if (err) {
                                winston_1.logger.error({
                                    message: "errorr",
                                    API: API,
                                    err,
                                    query: query
                                });
                                res.send({
                                    message: "error",
                                    status: 400,
                                    success: 0,
                                    data: {}
                                });
                            }
                            else {
                                // perintah jika user sudah pernah mengisi jawaban sebelumnya (jawaban yang dipilih tidak diinputkan kembali ke database)
                                if (duplicateEntries.length >= 1) {
                                    // menghitung jumlah question dalam satu periode berjalan
                                    const query = `SELECT COUNT(*) AS countQuestions FROM survey_questions LEFT JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`;
                                    db_1.connection.query(query, (err, count) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            winston_1.logger.warn({
                                                message: "data not found",
                                                API: API,
                                                query: query
                                            });
                                            if (count[0] < 1) {
                                                res.send({
                                                    message: "data tidak ditemukan",
                                                    status: 200,
                                                    success: 1,
                                                    data: {}
                                                });
                                            }
                                            else {
                                                let countQuestions = count[0].countQuestions;
                                                // menghitung jumlah jawaban yang diinputkan user
                                                const query = `SELECT COUNT(*) AS countAnswer FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND (periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}') AND periode.category=5`;
                                                db_1.connection.query(query, (err, countEntries) => {
                                                    if (err) {
                                                        winston_1.logger.error({
                                                            message: "error",
                                                            API: API,
                                                            err,
                                                            query: query
                                                        });
                                                        res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                        });
                                                    }
                                                    else {
                                                        if (countEntries[0].countAnswer < 1) {
                                                            winston_1.logger.warn({
                                                                message: "data not found",
                                                                API: API,
                                                                query: query
                                                            });
                                                            res.send({
                                                                message: "data tidak ditemukan",
                                                                status: 200,
                                                                success: 1,
                                                                data: {}
                                                            });
                                                        }
                                                        else {
                                                            let userAnswer = countEntries[0].countAnswer;
                                                            // cek apakah jawaban dan pertanyaan berjumlah sama
                                                            if (countQuestions === userAnswer) {
                                                                const query = `SELECT profile_id,periode FROM survey_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                                                db_1.connection.query(query, (err, checkLead) => {
                                                                    if (err) {
                                                                        winston_1.logger.error({
                                                                            message: "error",
                                                                            API: API,
                                                                            err,
                                                                            query: query
                                                                        });
                                                                        res.send({
                                                                            message: "error",
                                                                            status: 400,
                                                                            success: 0,
                                                                            data: {}
                                                                        });
                                                                    }
                                                                    else {
                                                                        if (checkLead.length < 1) {
                                                                            const query = `INSERT INTO survey_leaderboard (profile_id,periode,createdAt) VALUES(${verify.id},${data[0].id},'${moment().format("YYYY-MM-DD")}')`;
                                                                            db_1.connection.query(query, (err, lead) => {
                                                                                if (err) {
                                                                                    winston_1.logger.error({
                                                                                        message: "error",
                                                                                        API: API,
                                                                                        err,
                                                                                        query: query
                                                                                    });
                                                                                    res.send({
                                                                                        message: "error",
                                                                                        status: 400,
                                                                                        success: 0,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    // insert point
                                                                                    const query = `INSERT INTO point (profile_id,date,type_point,point) VALUES(${verify.id},'${moment().format("YYYY-MM-DD")}',3,10)`;
                                                                                    db_1.connection.query(query, (err, data) => {
                                                                                        if (err) {
                                                                                            winston_1.logger.error({
                                                                                                message: "error insert point",
                                                                                                API: API,
                                                                                                query: query,
                                                                                                err
                                                                                            });
                                                                                            res.send({
                                                                                                message: "error",
                                                                                                status: "400",
                                                                                                success: 0,
                                                                                                data: {}
                                                                                            });
                                                                                        }
                                                                                        else {
                                                                                            winston_1.logger.info({
                                                                                                message: "Thank you for participating in our survey",
                                                                                                API: API,
                                                                                                query: query
                                                                                            });
                                                                                            res.send({
                                                                                                message: `Terimakasi telah berpartisipasi dalam survey kami`,
                                                                                                status: 200,
                                                                                                success: 1,
                                                                                                data: {}
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            // insert point
                                                                            const query = `INSERT INTO point (profile_id,date,type_point,point) VALUES(${verify.id},'${moment().format("YYYY-MM-DD")}',3,10)`;
                                                                            db_1.connection.query(query, (err, data) => {
                                                                                if (err) {
                                                                                    winston_1.logger.error({
                                                                                        message: "error insert point",
                                                                                        API: API,
                                                                                        query: query,
                                                                                        err
                                                                                    });
                                                                                    res.send({
                                                                                        message: "error",
                                                                                        status: "400",
                                                                                        success: 0,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    winston_1.logger.info({
                                                                                        message: "Thank you for participating in our survey",
                                                                                        API: API,
                                                                                        query: query
                                                                                    });
                                                                                    res.send({
                                                                                        message: `Terimakasih telah berpartisipasi dalam survey kami`,
                                                                                        status: 200,
                                                                                        success: 1,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                            else {
                                                                winston_1.logger.info({
                                                                    message: "Continue answering the survey",
                                                                    API: API,
                                                                    query: query
                                                                });
                                                                res.send({
                                                                    message: `lanjutkan menjawab pertanyaan`,
                                                                    status: 200,
                                                                    success: 1,
                                                                    data: {}
                                                                });
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                                else {
                                    // jika user belum pernah mengikuti quiz sama sekali, jawaban yang diinputak user akan diinput ke database
                                    const query = `INSERT INTO survey_entries (profile_id,survey_answer,periode) VALUES (${verify.id},${req.body.answerId},${data[0].id})`;
                                    db_1.connection.query(query, (err, rows) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            if (rows.insertId > 0) {
                                                // menghitung jumlah question dalam satu periode berjalan
                                                const query = `SELECT COUNT(*) AS countQuestions FROM survey_questions LEFT JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`;
                                                db_1.connection.query(query, (err, count) => {
                                                    if (err) {
                                                        winston_1.logger.error({
                                                            message: "error",
                                                            API: API,
                                                            err,
                                                            query: query
                                                        });
                                                        res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                        });
                                                    }
                                                    else {
                                                        if (count[0] < 1) {
                                                            winston_1.logger.warn({
                                                                message: "data not found",
                                                                API: API,
                                                                query: query
                                                            });
                                                            res.send({
                                                                message: "data tidak ditemukan",
                                                                status: 200,
                                                                success: 1,
                                                                data: {}
                                                            });
                                                        }
                                                        else {
                                                            let countQuestions = count[0].countQuestions;
                                                            // menghitung jumlah jawaban yang diinputkan user
                                                            const query = `SELECT COUNT(*) AS countAnswer FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND (periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}') AND periode.category=5`;
                                                            db_1.connection.query(query, (err, countEntries) => {
                                                                if (err) {
                                                                    winston_1.logger.error({
                                                                        message: "error",
                                                                        API: API,
                                                                        err,
                                                                        query: query
                                                                    });
                                                                    res.send({
                                                                        message: "error",
                                                                        status: 400,
                                                                        success: 0,
                                                                        data: {}
                                                                    });
                                                                }
                                                                else {
                                                                    if (countEntries[0].countAnswer < 1) {
                                                                        winston_1.logger.warn({
                                                                            message: "data not found",
                                                                            API: API,
                                                                            query: query
                                                                        });
                                                                        res.send({
                                                                            message: "data tidak ditemukan",
                                                                            status: 200,
                                                                            success: 1,
                                                                            data: {}
                                                                        });
                                                                    }
                                                                    else {
                                                                        let userAnswer = countEntries[0].countAnswer;
                                                                        // cek apakah jawaban dan pertanyaan berjumlah sama
                                                                        if (countQuestions === userAnswer) {
                                                                            const query = `SELECT profile_id,periode FROM survey_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                                                            db_1.connection.query(query, (err, checkLead) => {
                                                                                if (err) {
                                                                                    winston_1.logger.error({
                                                                                        message: "error",
                                                                                        API: API,
                                                                                        err,
                                                                                        query: query
                                                                                    });
                                                                                    res.send({
                                                                                        message: "error",
                                                                                        status: 400,
                                                                                        success: 0,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    if (checkLead.length < 1) {
                                                                                        const query = `INSERT INTO survey_leaderboard (profile_id,periode,createdAt) VALUES(${verify.id},${data[0].id},'${moment().format("YYYY-MM-DD")}')`;
                                                                                        db_1.connection.query(query, (err, lead) => {
                                                                                            if (err) {
                                                                                                winston_1.logger.error({
                                                                                                    message: "error",
                                                                                                    API: API,
                                                                                                    err,
                                                                                                    query: query
                                                                                                });
                                                                                                res.send({
                                                                                                    message: "error",
                                                                                                    status: 400,
                                                                                                    success: 0,
                                                                                                    data: {}
                                                                                                });
                                                                                            }
                                                                                            else {
                                                                                                // insert point
                                                                                                const query = `INSERT INTO point (profile_id,date,type_point,point) VALUES(${verify.id},'${moment().format("YYYY-MM-DD")}',3,10)`;
                                                                                                db_1.connection.query(query, (err, data) => {
                                                                                                    if (err) {
                                                                                                        winston_1.logger.error({
                                                                                                            message: "error insert point",
                                                                                                            API: API,
                                                                                                            query: query,
                                                                                                            err
                                                                                                        });
                                                                                                        res.send({
                                                                                                            message: "error",
                                                                                                            status: "400",
                                                                                                            success: 0,
                                                                                                            data: {}
                                                                                                        });
                                                                                                    }
                                                                                                    else {
                                                                                                        winston_1.logger.info({
                                                                                                            message: "Thank you for participating in our survey",
                                                                                                            API: API,
                                                                                                            query: query
                                                                                                        });
                                                                                                        res.send({
                                                                                                            message: `Thank you for participating in our survey`,
                                                                                                            status: 200,
                                                                                                            success: 1,
                                                                                                            data: {}
                                                                                                        });
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else {
                                                                                        winston_1.logger.info({
                                                                                            message: "Thank you for participating in our survey",
                                                                                            API: API,
                                                                                            query: query
                                                                                        });
                                                                                        res.send({
                                                                                            message: `terimakasih sudah berpartisipasi dalam survey kami`,
                                                                                            status: 200,
                                                                                            success: 1,
                                                                                            data: {}
                                                                                        });
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            winston_1.logger.info({
                                                                                message: "Continue answering the survey",
                                                                                API: API,
                                                                                query: query
                                                                            });
                                                                            res.send({
                                                                                message: `lanjutkan menjawab pertanyaan`,
                                                                                status: 200,
                                                                                success: 1,
                                                                                data: {}
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                            else {
                                                winston_1.logger.warn({
                                                    message: "not found script for input",
                                                    API: API,
                                                    query: query
                                                });
                                                res.send({
                                                    message: `tidak ditemukan data untuk diinput`,
                                                    status: 404,
                                                    success: 0,
                                                    data: {}
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
        else {
            const query = `SELECT id FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`;
            db_1.connection.query(query, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "error",
                        API: API,
                        err,
                        query: query
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    // response yang dikirim jika tidak ditemukan quiz setting yang sedang berjalan
                    if (data.length < 1) {
                        winston_1.logger.warn({
                            message: "Time Ups, try again late",
                            API: API,
                            query: query
                        });
                        res.send({
                            message: "Time Ups, try again later",
                            status: 200,
                            success: 1,
                            data: {}
                        });
                    }
                    else {
                        const token = req.header("auth-token");
                        const verify = jwt.verify(token, TOKEN_SECRET.default);
                        // cek jawaban duplicate dari user
                        const query = `SELECT profile_id,survey_answer,periode FROM survey_entries WHERE profile_id =${verify.id} AND survey_answer = ${req.body.answerId} AND periode = ${data[0].id} `;
                        db_1.connection.query(query, (err, duplicateEntries) => {
                            if (err) {
                                winston_1.logger.error({
                                    message: "errorr",
                                    API: API,
                                    err,
                                    query: query
                                });
                                res.send({
                                    message: "error",
                                    status: 400,
                                    success: 0,
                                    data: {}
                                });
                            }
                            else {
                                // perintah jika user sudah pernah mengisi jawaban sebelumnya (jawaban yang dipilih tidak diinputkan kembali ke database)
                                if (duplicateEntries.length >= 1) {
                                    // menghitung jumlah question dalam satu periode berjalan
                                    const query = `SELECT COUNT(*) AS countQuestions FROM survey_questions LEFT JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`;
                                    db_1.connection.query(query, (err, count) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            winston_1.logger.warn({
                                                message: "data not found",
                                                API: API,
                                                query: query
                                            });
                                            if (count[0] < 1) {
                                                res.send({
                                                    message: "data not found",
                                                    status: 200,
                                                    success: 1,
                                                    data: {}
                                                });
                                            }
                                            else {
                                                let countQuestions = count[0].countQuestions;
                                                // menghitung jumlah jawaban yang diinputkan user
                                                const query = `SELECT COUNT(*) AS countAnswer FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND (periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}') AND periode.category=5`;
                                                db_1.connection.query(query, (err, countEntries) => {
                                                    if (err) {
                                                        winston_1.logger.error({
                                                            message: "error",
                                                            API: API,
                                                            err,
                                                            query: query
                                                        });
                                                        res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                        });
                                                    }
                                                    else {
                                                        if (countEntries[0].countAnswer < 1) {
                                                            winston_1.logger.warn({
                                                                message: "data not found",
                                                                API: API,
                                                                query: query
                                                            });
                                                            res.send({
                                                                message: "data not found",
                                                                status: 200,
                                                                success: 1,
                                                                data: {}
                                                            });
                                                        }
                                                        else {
                                                            let userAnswer = countEntries[0].countAnswer;
                                                            // cek apakah jawaban dan pertanyaan berjumlah sama
                                                            if (countQuestions === userAnswer) {
                                                                const query = `SELECT profile_id,periode FROM survey_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                                                db_1.connection.query(query, (err, checkLead) => {
                                                                    if (err) {
                                                                        winston_1.logger.error({
                                                                            message: "error",
                                                                            API: API,
                                                                            err,
                                                                            query: query
                                                                        });
                                                                        res.send({
                                                                            message: "error",
                                                                            status: 400,
                                                                            success: 0,
                                                                            data: {}
                                                                        });
                                                                    }
                                                                    else {
                                                                        if (checkLead.length < 1) {
                                                                            const query = `INSERT INTO survey_leaderboard (profile_id,periode,createdAt) VALUES(${verify.id},${data[0].id},'${moment().format("YYYY-MM-DD")}')`;
                                                                            db_1.connection.query(query, (err, lead) => {
                                                                                if (err) {
                                                                                    winston_1.logger.error({
                                                                                        message: "error",
                                                                                        API: API,
                                                                                        err,
                                                                                        query: query
                                                                                    });
                                                                                    res.send({
                                                                                        message: "error",
                                                                                        status: 400,
                                                                                        success: 0,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    winston_1.logger.info({
                                                                                        message: "Thank you for participating in our survey",
                                                                                        API: API,
                                                                                        query: query
                                                                                    });
                                                                                    res.send({
                                                                                        message: `Thank you for participating in our survey`,
                                                                                        status: 200,
                                                                                        success: 1,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            res.send({
                                                                                message: `Thank you for participating in our survey`,
                                                                                status: 200,
                                                                                success: 1,
                                                                                data: {}
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                            else {
                                                                winston_1.logger.info({
                                                                    message: "Continue answering the survey",
                                                                    API: API,
                                                                    query: query
                                                                });
                                                                res.send({
                                                                    message: `Continue answering the survey`,
                                                                    status: 200,
                                                                    success: 1,
                                                                    data: {}
                                                                });
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                                else {
                                    // jika user belum pernah mengikuti quiz sama sekali, jawaban yang diinputak user akan diinput ke database
                                    const query = `INSERT INTO survey_entries (profile_id,survey_answer,periode) VALUES (${verify.id},${req.body.answerId},${data[0].id})`;
                                    db_1.connection.query(query, (err, rows) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            if (rows.insertId > 0) {
                                                // menghitung jumlah question dalam satu periode berjalan
                                                const query = `SELECT COUNT(*) AS countQuestions FROM survey_questions LEFT JOIN periode ON survey_questions.periode = periode.id WHERE periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}' AND periode.category=5`;
                                                db_1.connection.query(query, (err, count) => {
                                                    if (err) {
                                                        winston_1.logger.error({
                                                            message: "error",
                                                            API: API,
                                                            err,
                                                            query: query
                                                        });
                                                        res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                        });
                                                    }
                                                    else {
                                                        if (count[0] < 1) {
                                                            winston_1.logger.warn({
                                                                message: "data not found",
                                                                API: API,
                                                                query: query
                                                            });
                                                            res.send({
                                                                message: "data not found",
                                                                status: 200,
                                                                success: 1,
                                                                data: {}
                                                            });
                                                        }
                                                        else {
                                                            let countQuestions = count[0].countQuestions;
                                                            // menghitung jumlah jawaban yang diinputkan user
                                                            const query = `SELECT COUNT(*) AS countAnswer FROM survey_entries LEFT JOIN periode ON survey_entries.periode = periode.id WHERE survey_entries.profile_id = ${verify.id} AND (periode.start_date<='${moment().format("YYYY-MM-DD")}' AND periode.end_date>'${moment().format("YYYY-MM-DD")}') AND periode.category=5`;
                                                            db_1.connection.query(query, (err, countEntries) => {
                                                                if (err) {
                                                                    winston_1.logger.error({
                                                                        message: "error",
                                                                        API: API,
                                                                        err,
                                                                        query: query
                                                                    });
                                                                    res.send({
                                                                        message: "error",
                                                                        status: 400,
                                                                        success: 0,
                                                                        data: {}
                                                                    });
                                                                }
                                                                else {
                                                                    if (countEntries[0].countAnswer < 1) {
                                                                        winston_1.logger.warn({
                                                                            message: "data not found",
                                                                            API: API,
                                                                            query: query
                                                                        });
                                                                        res.send({
                                                                            message: "data not found",
                                                                            status: 200,
                                                                            success: 1,
                                                                            data: {}
                                                                        });
                                                                    }
                                                                    else {
                                                                        let userAnswer = countEntries[0].countAnswer;
                                                                        // cek apakah jawaban dan pertanyaan berjumlah sama
                                                                        if (countQuestions === userAnswer) {
                                                                            const query = `SELECT profile_id,periode FROM survey_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                                                            db_1.connection.query(query, (err, checkLead) => {
                                                                                if (err) {
                                                                                    winston_1.logger.error({
                                                                                        message: "error",
                                                                                        API: API,
                                                                                        err,
                                                                                        query: query
                                                                                    });
                                                                                    res.send({
                                                                                        message: "error",
                                                                                        status: 400,
                                                                                        success: 0,
                                                                                        data: {}
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    if (checkLead.length < 1) {
                                                                                        const query = `INSERT INTO survey_leaderboard (profile_id,periode,createdAt) VALUES(${verify.id},${data[0].id},'${moment().format("YYYY-MM-DD")}')`;
                                                                                        db_1.connection.query(query, (err, lead) => {
                                                                                            winston_1.logger.error({
                                                                                                message: "error",
                                                                                                API: API,
                                                                                                err,
                                                                                                query: query
                                                                                            });
                                                                                            if (err) {
                                                                                                res.send({
                                                                                                    message: "error",
                                                                                                    status: 400,
                                                                                                    success: 0,
                                                                                                    data: {}
                                                                                                });
                                                                                            }
                                                                                            else {
                                                                                                winston_1.logger.info({
                                                                                                    message: "Thank you for participating in our survey",
                                                                                                    API: API,
                                                                                                    query: query
                                                                                                });
                                                                                                res.send({
                                                                                                    message: `Thank you for participating in our survey`,
                                                                                                    status: 200,
                                                                                                    success: 1,
                                                                                                    data: {}
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else {
                                                                                        winston_1.logger.info({
                                                                                            message: "Thank you for participating in our survey",
                                                                                            API: API,
                                                                                            query: query
                                                                                        });
                                                                                        res.send({
                                                                                            message: `Thank you for participating in our survey`,
                                                                                            status: 200,
                                                                                            success: 1,
                                                                                            data: {}
                                                                                        });
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            winston_1.logger.info({
                                                                                message: "Continue answering the survey",
                                                                                API: API,
                                                                                query: query
                                                                            });
                                                                            res.send({
                                                                                message: `Continue answering the survey`,
                                                                                status: 200,
                                                                                success: 1,
                                                                                data: {}
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                            else {
                                                winston_1.logger.warn({
                                                    message: "not found script for input",
                                                    API: API,
                                                    query: query
                                                });
                                                res.send({
                                                    message: `not found script for input`,
                                                    status: 404,
                                                    success: 0,
                                                    data: {}
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    });
    // cek apakah ada event quiz atau tidak
};
exports.userOrder = (req, res) => {
    const API = `GET-https://beta-api.undiundi/survey/userOrder`;
    const token = req.header("auth-token");
    const verify = jwt.verify(token, TOKEN_SECRET.default);
    db_1.connection.query(`SELECT language FROM profiles WHERE id=${verify.id}`, (err, lang) => {
        const language = lang[0].language.toLowerCase();
        if (language === "en") {
            const query = `SELECT id FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`;
            db_1.connection.query(query, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "error",
                        API: API,
                        err,
                        query: query
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length >= 1) {
                        const query = `SELECT COUNT(*) AS countLead FROM survey_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                        db_1.connection.query(query, (err, row) => {
                            if (err) {
                                winston_1.logger.error({
                                    message: "error",
                                    API: API,
                                    err,
                                    query: query
                                });
                                res.send({
                                    message: "error",
                                    status: 400,
                                    success: 0,
                                    data: {}
                                });
                            }
                            else {
                                if (row[0].countLead > 0) {
                                    const query = `SELECT prize FROM prizes WHERE periode_id = ${data[0].id}`;
                                    db_1.connection.query(query, (err, prize) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            let totalData = prize.length;
                                            let rows = [];
                                            const path = "https://beta-api.undiundi.id/prizes/";
                                            for (let index = 0; index < totalData; index++) {
                                                let prizes = prize[index].prize;
                                                rows.push(" " + prizes);
                                            }
                                            const prizes = rows.toString();
                                            winston_1.logger.info({
                                                message: `you are the ${row[0].countLead +
                                                    1} participant for that opportunity to get a ${prizes}`,
                                                API: API,
                                                query: query
                                            });
                                            res.send({
                                                message: `you are the ${row[0].countLead +
                                                    1} participant for that opportunity to get a ${prizes}`,
                                                status: 200,
                                                success: 1,
                                                data: {}
                                            });
                                        }
                                    });
                                }
                                else {
                                    const query = `SELECT prize FROM prizes WHERE periode_id = ${data[0].id}`;
                                    db_1.connection.query(query, (err, prize) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            let totalData = prize.length;
                                            let rows = [];
                                            const path = "https://beta-api.undiundi.id/prizes/";
                                            for (let index = 0; index < totalData; index++) {
                                                let prizes = prize[index].prize;
                                                rows.push(" " + prizes);
                                            }
                                            const prizes = rows.toString();
                                            winston_1.logger.info({
                                                message: `you are the 1st participant for that opportunity to get a ${prizes}`,
                                                API: API,
                                                query: query
                                            });
                                            res.send({
                                                message: `you are the 1st participant for that opportunity to get a ${prizes}`,
                                                status: 200,
                                                success: 1,
                                                data: {}
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                    else {
                        winston_1.logger.warn({
                            message: "Sorry the survey event isn't available yet please try another time",
                            API: API,
                            query: query
                        });
                        res.send({
                            message: "Sorry the survey event isn't available yet please try another time",
                            status: 404,
                            success: 1,
                            data: {}
                        });
                    }
                }
            });
        }
        else if (language === "idn") {
            const query = `SELECT id FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`;
            db_1.connection.query(query, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "error",
                        API: API,
                        err,
                        query: query
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length >= 1) {
                        const query = `SELECT COUNT(*) AS countLead FROM survey_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                        db_1.connection.query(query, (err, row) => {
                            if (err) {
                                winston_1.logger.error({
                                    message: "error",
                                    API: API,
                                    err,
                                    query: query
                                });
                                res.send({
                                    message: "error",
                                    status: 400,
                                    success: 0,
                                    data: {}
                                });
                            }
                            else {
                                if (row[0].countLead > 0) {
                                    const query = `SELECT prize FROM prizes WHERE periode_id = ${data[0].id}`;
                                    db_1.connection.query(query, (err, prize) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            let totalData = prize.length;
                                            let rows = [];
                                            const path = "https://beta-api.undiundi.id/prizes/";
                                            for (let index = 0; index < totalData; index++) {
                                                let prizes = prize[index].prize;
                                                rows.push(" " + prizes);
                                            }
                                            const prizes = rows.toString();
                                            winston_1.logger.info({
                                                message: `you are the ${row[0].countLead +
                                                    1} participant for that opportunity to get a ${prizes}`,
                                                API: API,
                                                query: query
                                            });
                                            res.send({
                                                message: `Anda meruoakan peserta survey yang ke-${row[0]
                                                    .countLead +
                                                    1}. Untuk itu berksempatan mendapatkan ${prizes}`,
                                                status: 200,
                                                success: 1,
                                                data: {}
                                            });
                                        }
                                    });
                                }
                                else {
                                    const query = `SELECT prize FROM prizes WHERE periode_id = ${data[0].id}`;
                                    db_1.connection.query(query, (err, prize) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            let totalData = prize.length;
                                            let rows = [];
                                            const path = "https://beta-api.undiundi.id/prizes/";
                                            for (let index = 0; index < totalData; index++) {
                                                let prizes = prize[index].prize;
                                                rows.push(" " + prizes);
                                            }
                                            const prizes = rows.toString();
                                            winston_1.logger.info({
                                                message: `you are the 1st participant for that opportunity to get a ${prizes}`,
                                                API: API,
                                                query: query
                                            });
                                            res.send({
                                                message: `Anda meruoakan peserta survey yang ke-${row[0]
                                                    .countLead +
                                                    1}. Untuk itu berksempatan mendapatkan ${prizes}`,
                                                status: 200,
                                                success: 1,
                                                data: {}
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                    else {
                        winston_1.logger.warn({
                            message: "Sorry the survey event isn't available yet please try another time",
                            API: API,
                            query: query
                        });
                        res.send({
                            message: "Sorry the survey event isn't available yet please try another time",
                            status: 404,
                            success: 1,
                            data: {}
                        });
                    }
                }
            });
        }
        else {
            const query = `SELECT id FROM periode WHERE start_date<='${moment().format("YYYY-MM-DD")}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=5`;
            db_1.connection.query(query, (err, data) => {
                if (err) {
                    winston_1.logger.error({
                        message: "error",
                        API: API,
                        err,
                        query: query
                    });
                    res.send({
                        message: "error",
                        status: 400,
                        success: 0,
                        data: {}
                    });
                }
                else {
                    if (data.length >= 1) {
                        const query = `SELECT COUNT(*) AS countLead FROM survey_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                        db_1.connection.query(query, (err, row) => {
                            if (err) {
                                winston_1.logger.error({
                                    message: "error",
                                    API: API,
                                    err,
                                    query: query
                                });
                                res.send({
                                    message: "error",
                                    status: 400,
                                    success: 0,
                                    data: {}
                                });
                            }
                            else {
                                if (row[0].countLead > 0) {
                                    const query = `SELECT prize FROM prizes WHERE periode_id = ${data[0].id}`;
                                    db_1.connection.query(query, (err, prize) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            let totalData = prize.length;
                                            let rows = [];
                                            const path = "https://beta-api.undiundi.id/prizes/";
                                            for (let index = 0; index < totalData; index++) {
                                                let prizes = prize[index].prize;
                                                rows.push(" " + prizes);
                                            }
                                            const prizes = rows.toString();
                                            winston_1.logger.info({
                                                message: `you are the ${row[0].countLead +
                                                    1} participant for that opportunity to get a ${prizes}`,
                                                API: API,
                                                query: query
                                            });
                                            res.send({
                                                message: `you are the ${row[0].countLead +
                                                    1} participant for that opportunity to get a ${prizes}`,
                                                status: 200,
                                                success: 1,
                                                data: {}
                                            });
                                        }
                                    });
                                }
                                else {
                                    const query = `SELECT prize FROM prizes WHERE periode_id = ${data[0].id}`;
                                    db_1.connection.query(query, (err, prize) => {
                                        if (err) {
                                            winston_1.logger.error({
                                                message: "error",
                                                API: API,
                                                err,
                                                query: query
                                            });
                                            res.send({
                                                message: "error",
                                                status: 400,
                                                success: 0,
                                                data: {}
                                            });
                                        }
                                        else {
                                            let totalData = prize.length;
                                            let rows = [];
                                            const path = "https://beta-api.undiundi.id/prizes/";
                                            for (let index = 0; index < totalData; index++) {
                                                let prizes = prize[index].prize;
                                                rows.push(" " + prizes);
                                            }
                                            const prizes = rows.toString();
                                            winston_1.logger.info({
                                                message: `you are the 1st participant for that opportunity to get a ${prizes}`,
                                                API: API,
                                                query: query
                                            });
                                            res.send({
                                                message: `you are the 1st participant for that opportunity to get a ${prizes}`,
                                                status: 200,
                                                success: 1,
                                                data: {}
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                    else {
                        winston_1.logger.warn({
                            message: "Sorry the survey event isn't available yet please try another time",
                            API: API,
                            query: query
                        });
                        res.send({
                            message: "Sorry the survey event isn't available yet please try another time",
                            status: 404,
                            success: 1,
                            data: {}
                        });
                    }
                }
            });
        }
    });
};
