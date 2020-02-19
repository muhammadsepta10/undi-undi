import { connection } from "../../db";
import * as multer from "multer";
import * as moment from "moment";
import { Request, Response } from "express";
const appRoot = require("app-root-path");
import * as TOKEN_SECRET from "../../middleware";
const jwt = require("jsonwebtoken");
import { logger } from "./../../winston";

export const checkUserAnswered = (req: Request, res: Response) => {
  const API = "GET-https://beta-api.undiundi/quiz/quizAvailable";
  const token = req.header("auth-token");
  const verify = jwt.verify(token, TOKEN_SECRET.default);
  connection.query(
    `SELECT language FROM profiles WHERE id=${verify.id}`,
    (err: any, lang: any) => {
      const language = lang[0].language.toLowerCase();
      // jika bahasa inggris
      if (language === "en") {
        const query = `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
          "YYYY-MM-DD"
        )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=4`;
        connection.query(query, (err: any, data: any) => {
          if (err) {
            logger.error({
              message: "failed to get data periode",
              API: API,
              err,
              query: query
            });
            res.send({
              message: "error",
              status: 400,
              success: 0,
              data: [err]
            });
          } else {
            if (data.length < 1) {
              logger.warn({
                message:
                  "the quiz event isn't available yet please try another time",
                API: query
              });
              res.send({
                message:
                  "Sorry the quiz event isn't available yet please try another time",
                status: 200,
                success: 1,
                data: data
              });
            } else {
              const query = `SELECT quiz_entries.id quiz_entries_id,quiz_entries.profile_id,quiz_entries.periode,periode.id,periode.start_date,periode.end_date FROM quiz_entries LEFT JOIN periode ON quiz_entries.periode = periode.id WHERE quiz_entries.profile_id = ${
                verify.id
              } AND start_date<='${moment().format(
                "YYYY-MM-DD"
              )}' AND periode.end_date>'${moment().format(
                "YYYY-MM-DD"
              )}' AND periode.category=4`;
              connection.query(query, (err: any, data: any) => {
                if (err) {
                  logger.error({
                    message: "failed to get data periode",
                    API: API,
                    err,
                    query: query
                  });
                  res.send({
                    message: "error",
                    status: 400,
                    success: 0,
                    data: [err]
                  });
                } else {
                  if (data.length < 1) {
                    logger.info({
                      message: "you can take this quiz",
                      API: query
                    });
                    res.send({
                      message: "you can take this quiz",
                      status: 200,
                      success: 1,
                      data: {}
                    });
                  } else {
                    logger.warn({
                      message:
                        "sorry you have taken this quiz try another time",
                      API: query
                    });
                    res.send({
                      message:
                        "sorry you have taken this quiz try another time ",
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
      } else if (language === "idn") {
      } else {
      }
    }
  );
};

export const quizQuestions = (req: Request, res: Response) => {
  const API = "GET-https://beta-api.undiundi/quiz/questions";
  const token = req.header("auth-token");
  const verify = jwt.verify(token, TOKEN_SECRET.default);
  connection.query(
    `SELECT language FROM profiles WHERE id=${verify.id}`,
    (err: any, lang: any) => {
      const language = lang[0].language.toLowerCase();
      // jika bahasa inggris
      if (language === "en") {
        const query = `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
          "YYYY-MM-DD"
        )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=4`;
        connection.query(query, (err: any, data: any) => {
          if (err) {
            logger.error({
              message: "failed to get data periode",
              API: API,
              err,
              query: query
            });
            res.send({
              message: "error",
              status: 400,
              success: 0,
              data: [err]
            });
          } else {
            if (data.length < 1) {
              logger.warn({
                message:
                  "the quiz event isn't available yet please try another time",
                API: query
              });
              res.send({
                message:
                  "Sorry the quiz event isn't available yet please try another time",
                status: 200,
                success: 1,
                data: data
              });
            } else {
              const query = `SELECT quiz_entries.id quiz_entries_id,quiz_entries.profile_id,quiz_entries.periode,periode.id,periode.start_date,periode.end_date FROM quiz_entries LEFT JOIN periode ON quiz_entries.periode = periode.id WHERE quiz_entries.profile_id = ${
                verify.id
              } AND start_date<='${moment().format(
                "YYYY-MM-DD"
              )}' AND periode.end_date>'${moment().format(
                "YYYY-MM-DD"
              )}' AND periode.category=4`;
              connection.query(query, (err: any, data: any) => {
                if (err) {
                  logger.error({
                    message: "failed to get data periode",
                    API: API,
                    err,
                    query: query
                  });
                  res.send({
                    message: "error",
                    status: 400,
                    success: 0,
                    data: [err]
                  });
                } else {
                  if (data.length < 1) {
                    const query = `SELECT COUNT(*) as total FROM quiz_questions JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.end_date>'${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.category=4`;
                    connection.query(query, (err: any, total: any) => {
                      if (err) {
                        logger.error({
                          message: "failed to get data",
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
                      } else {
                        if (total[0].length < 1) {
                          logger.warn({
                            message: "Can't find data",
                            API: API,
                            query: query
                          });
                          res.send({
                            message: "Can't find data",
                            status: 404,
                            success: 1,
                            data: total
                          });
                        } else {
                          const page = req.query.page;
                          const totalData = total[0].total;
                          const dataPerPage = 1;
                          const totalPage = Math.ceil(totalData / dataPerPage);
                          const currentPage = parseInt(
                            page !== undefined ? page : 1
                          );
                          const firstData =
                            dataPerPage * currentPage - dataPerPage;
                          const nextPage =
                            currentPage === totalPage
                              ? null
                              : "https://beta-api.undiundi.id/quiz/questions" +
                                "?page=" +
                                (currentPage + 1);
                          const prevPage =
                            currentPage === 1
                              ? null
                              : "https://beta-api.undiundi.id/quiz/questions" +
                                "?page=" +
                                (currentPage - 1);
                          const query = `SELECT quiz_questions.id as quisQuestionsId,question FROM quiz_questions JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.end_date>'${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.category=4 ORDER BY quiz_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`;
                          connection.query(query, (err: any, data: any) => {
                            if (err) {
                              logger.error({
                                message: "error",
                                API: API,
                                query: query,
                                err
                              });
                              res.send({
                                message: "error",
                                status: 400,
                                success: 0,
                                data: [err]
                              });
                            } else {
                              if (data.length < 1) {
                                logger.warn({
                                  message: "can't find data",
                                  API: API,
                                  query: query
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
                              } else {
                                logger.info({
                                  message: "success get data questions",
                                  API: API,
                                  query: query
                                });
                                res.send({
                                  message: "success get data questions",
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
                  } else {
                    logger.warn({
                      message:
                        "sorry you have taken this quiz try another time",
                      API: query
                    });
                    res.send({
                      message:
                        "sorry you have taken this quiz try another time ",
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
      } else if (language === "idn") {
        const query = `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
          "YYYY-MM-DD"
        )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=4`;
        connection.query(query, (err: any, data: any) => {
          if (err) {
            logger.error({
              message: "failed to get data periode",
              API: API,
              err,
              query: query
            });
            res.send({
              message: "error",
              status: 400,
              success: 0,
              data: [err]
            });
          } else {
            if (data.length < 1) {
              logger.warn({
                message:
                  "the quiz event isn't available yet please try another time",
                API: query
              });
              res.send({
                message: "Maaf event kuis belum tersedia, coba dilain waktu",
                status: 200,
                success: 1,
                data: data
              });
            } else {
              const query = `SELECT quiz_entries.id quiz_entries_id,quiz_entries.profile_id,quiz_entries.periode,periode.id,periode.start_date,periode.end_date FROM quiz_entries LEFT JOIN periode ON quiz_entries.periode = periode.id WHERE quiz_entries.profile_id = ${
                verify.id
              } AND start_date<='${moment().format(
                "YYYY-MM-DD"
              )}' AND periode.end_date>'${moment().format(
                "YYYY-MM-DD"
              )}' AND periode.category=4`;
              connection.query(query, (err: any, data: any) => {
                if (err) {
                  logger.error({
                    message: "failed to get data periode",
                    API: API,
                    err,
                    query: query
                  });
                  res.send({
                    message: "error",
                    status: 400,
                    success: 0,
                    data: [err]
                  });
                } else {
                  if (data.length < 1) {
                    const query = `SELECT COUNT(*) as total FROM quiz_questions JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.end_date>'${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.category=4`;
                    connection.query(query, (err: any, total: any) => {
                      if (err) {
                        logger.error({
                          message: "failed to get data",
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
                      } else {
                        if (total[0].length < 1) {
                          logger.warn({
                            message: "Can't find data",
                            API: API,
                            query: query
                          });
                          res.send({
                            message:
                              "tidak menemukan data pertanyaan untuk quiz,, mohon coba dilain waktu",
                            status: 404,
                            success: 1,
                            data: total
                          });
                        } else {
                          const page = req.query.page;
                          const totalData = total[0].total;
                          const dataPerPage = 1;
                          const totalPage = Math.ceil(totalData / dataPerPage);
                          const currentPage = parseInt(
                            page !== undefined ? page : 1
                          );
                          const firstData =
                            dataPerPage * currentPage - dataPerPage;
                          const nextPage =
                            currentPage === totalPage
                              ? null
                              : "https://beta-api.undiundi.id/quiz/questions" +
                                "?page=" +
                                (currentPage + 1);
                          const prevPage =
                            currentPage === 1
                              ? null
                              : "https://beta-api.undiundi.id/quiz/questions" +
                                "?page=" +
                                (currentPage - 1);
                          const query = `SELECT quiz_questions.id as quisQuestionsId,question FROM quiz_questions JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.end_date>'${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.category=4 ORDER BY quiz_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`;
                          connection.query(query, (err: any, data: any) => {
                            if (err) {
                              logger.error({
                                message: "error",
                                API: API,
                                query: query,
                                err
                              });
                              res.send({
                                message: "error",
                                status: 400,
                                success: 0,
                                data: [err]
                              });
                            } else {
                              if (data.length < 1) {
                                logger.warn({
                                  message: "can't find data",
                                  API: API,
                                  query: query
                                });
                                res.send({
                                  message:
                                    "tidak dapat menemukan data pertanyaan untuk quiz,, mohon coba dilain waktu",
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
                              } else {
                                logger.info({
                                  message: "success get data questions",
                                  API: API,
                                  query: query
                                });
                                res.send({
                                  message:
                                    "data questions kuis berhasil di load,, selamat mengerjakan",
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
                  } else {
                    logger.warn({
                      message:
                        "sorry you have taken this quiz try another time",
                      API: query
                    });
                    res.send({
                      message:
                        "maaf anda sudah pernah mengisi kuis ini, coba lagi dilain waktu",
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
      } else {
        const query = `SELECT start_date,end_date FROM periode WHERE start_date<='${moment().format(
          "YYYY-MM-DD"
        )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=4`;
        connection.query(query, (err: any, data: any) => {
          if (err) {
            logger.error({
              message: "failed to get data periode",
              API: API,
              err,
              query: query
            });
            res.send({
              message: "error",
              status: 400,
              success: 0,
              data: [err]
            });
          } else {
            if (data.length < 1) {
              logger.warn({
                message:
                  "the quiz event isn't available yet please try another time",
                API: query
              });
              res.send({
                message:
                  "Sorry the quiz event isn't available yet please try another time",
                status: 200,
                success: 1,
                data: data
              });
            } else {
              const query = `SELECT quiz_entries.id quiz_entries_id,quiz_entries.profile_id,quiz_entries.periode,periode.id,periode.start_date,periode.end_date FROM quiz_entries LEFT JOIN periode ON quiz_entries.periode = periode.id WHERE quiz_entries.profile_id = ${
                verify.id
              } AND start_date<='${moment().format(
                "YYYY-MM-DD"
              )}' AND periode.end_date>'${moment().format(
                "YYYY-MM-DD"
              )}' AND periode.category=4`;
              connection.query(query, (err: any, data: any) => {
                if (err) {
                  logger.error({
                    message: "failed to get data periode",
                    API: API,
                    err,
                    query: query
                  });
                  res.send({
                    message: "error",
                    status: 400,
                    success: 0,
                    data: [err]
                  });
                } else {
                  if (data.length < 1) {
                    const query = `SELECT COUNT(*) as total FROM quiz_questions JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.end_date>'${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.category=4`;
                    connection.query(query, (err: any, total: any) => {
                      if (err) {
                        logger.error({
                          message: "failed to get data",
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
                      } else {
                        if (total[0].length < 1) {
                          logger.warn({
                            message: "Can't find data",
                            API: API,
                            query: query
                          });
                          res.send({
                            message: "Can't find data",
                            status: 404,
                            success: 1,
                            data: total
                          });
                        } else {
                          const page = req.query.page;
                          const totalData = total[0].total;
                          const dataPerPage = 1;
                          const totalPage = Math.ceil(totalData / dataPerPage);
                          const currentPage = parseInt(
                            page !== undefined ? page : 1
                          );
                          const firstData =
                            dataPerPage * currentPage - dataPerPage;
                          const nextPage =
                            currentPage === totalPage
                              ? null
                              : "https://beta-api.undiundi.id/quiz/questions" +
                                "?page=" +
                                (currentPage + 1);
                          const prevPage =
                            currentPage === 1
                              ? null
                              : "https://beta-api.undiundi.id/quiz/questions" +
                                "?page=" +
                                (currentPage - 1);
                          const query = `SELECT quiz_questions.id as quisQuestionsId,question FROM quiz_questions JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.end_date>'${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.category=4 ORDER BY quiz_questions.id ASC LIMIT ${firstData}, ${dataPerPage}`;
                          connection.query(query, (err: any, data: any) => {
                            if (err) {
                              logger.error({
                                message: "error",
                                API: API,
                                query: query,
                                err
                              });
                              res.send({
                                message: "error",
                                status: 400,
                                success: 0,
                                data: [err]
                              });
                            } else {
                              if (data.length < 1) {
                                logger.warn({
                                  message: "can't find data",
                                  API: API,
                                  query: query
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
                              } else {
                                logger.info({
                                  message: "success get data questions",
                                  API: API,
                                  query: query
                                });
                                res.send({
                                  message: "success get data questions",
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
                  } else {
                    logger.warn({
                      message:
                        "sorry you have taken this quiz try another time",
                      API: API
                    });
                    res.send({
                      message:
                        "sorry you have taken this quiz try another time ",
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
    }
  );
};

export const quizAnswer = (req: Request, res: Response) => {
  const API = `GET-https://beta-api.undiundi/quiz/answer/${req.params.questionsId}`;
  const token = req.header("auth-token");
  const verify = jwt.verify(token, TOKEN_SECRET.default);
  connection.query(
    `SELECT language FROM profiles WHERE id=${verify.id}`,
    (err: any, lang: any) => {
      const language = lang[0].language.toLowerCase();
      // jika bahasa inggris

      if (language === "en") {
        const query = `SELECT id,code,answer FROM quiz_answers WHERE quiz_question_id=${req.params.questionsId}`;
        connection.query(query, (err: any, data: any) => {
          if (err) {
            logger.error({
              message: "error to get data from quiiz anwer",
              API: API,
              query: query,
              err
            });
            res.send({
              message: "error",
              status: 400,
              success: 0,
              data: {}
            });
          } else {
            if (data.length < 1) {
              logger.warn({
                message: "data aswer not found",
                API: API,
                query: query
              });
              res.send({
                message: "data not found",
                status: 200,
                success: 1,
                data: {}
              });
            } else {
              logger.info({
                message: "success to gate data answer",
                API: API,
                query: query
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
      } else if (language === "idn") {
        const query = `SELECT id,code,answer FROM quiz_answers WHERE quiz_question_id=${req.params.questionsId}`;
        connection.query(query, (err: any, data: any) => {
          if (err) {
            logger.error({
              message: "error to get data from quiiz anwer",
              API: API,
              query: query,
              err
            });
            res.send({
              message: "error",
              status: 400,
              success: 0,
              data: {}
            });
          } else {
            if (data.length < 1) {
              logger.warn({
                message: "data aswer not found",
                API: API,
                query: query
              });
              res.send({
                message: "data aswer tidak ditemukan",
                status: 200,
                success: 1,
                data: {}
              });
            } else {
              logger.info({
                message: "success to gate data answer",
                API: API,
                query: query
              });
              res.send({
                message: "berhasil mendapatkan data answer",
                status: 200,
                success: 1,
                data: data
              });
            }
          }
        });
      } else {
        const query = `SELECT id,code,answer FROM quiz_answers WHERE quiz_question_id=${req.params.questionsId}`;
        connection.query(query, (err: any, data: any) => {
          if (err) {
            logger.error({
              message: "error to get data from quiiz anwer",
              API: API,
              query: query,
              err
            });
            res.send({
              message: "error",
              status: 400,
              success: 0,
              data: {}
            });
          } else {
            if (data.length < 1) {
              logger.warn({
                message: "data aswer not found",
                API: API,
                query: query
              });
              res.send({
                message: "data not found",
                status: 200,
                success: 1,
                data: {}
              });
            } else {
              logger.info({
                message: "success to gate data answer",
                API: API,
                query: query
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
    }
  );
};

export const quizCorrection = (req: Request, res: Response) => {
  const API = "POST-https://beta-api.undiundi/quiz/entries";
  const token = req.header("auth-token");
  const verify = jwt.verify(token, TOKEN_SECRET.default);
  connection.query(
    `SELECT language FROM profiles WHERE id=${verify.id}`,
    (err: any, lang: any) => {
      const language = lang[0].language.toLowerCase();
      // jika bahasa inggris
      if (language === "en") {
        // cek apakah ada event quiz atau tidak
        const query = `SELECT id FROM periode WHERE start_date<='${moment().format(
          "YYYY-MM-DD"
        )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=4`;
        connection.query(query, (err: any, data: any) => {
          if (err) {
            logger.error({
              message: "error select periode",
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
          } else {
            // response yang dikirim jika tidak ditemukan quiz setting yang sedang berjalan
            if (data.length < 1) {
              logger.warning({
                message: "Time Ups, try again later",
                API: API,
                query: query
              });
              res.send({
                message: "Time Ups, try again later",
                status: 200,
                success: 1,
                data: {}
              });
            } else {
              const token = req.header("auth-token");
              const verify = jwt.verify(token, TOKEN_SECRET.default);
              // cek jawaban duplicate dari user
              const query = `SELECT profile_id,quiz_answer,periode FROM quiz_entries WHERE profile_id =${verify.id} AND quiz_answer = ${req.body.answerId} AND periode = ${data[0].id} `;
              connection.query(query, (err: any, duplicateEntries: any) => {
                if (err) {
                  logger.error({
                    message: "error to select data from quiz entries",
                    API: API,
                    query: query
                  });
                  res.send({
                    message: "error",
                    status: 400,
                    success: 0,
                    data: {}
                  });
                } else {
                  // perintah jika user sudah pernah mengisi jawaban sebelumnya (jawaban yang dipilih tidak diinputkan kembali ke database)
                  if (duplicateEntries.length >= 1) {
                    // menghitung jumlah question dalam satu periode berjalan
                    const query = `SELECT COUNT(*) AS countQuestions FROM quiz_questions LEFT JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.end_date>'${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.category=4`;
                    connection.query(query, (err: any, count: any) => {
                      if (err) {
                        logger.error({
                          message: "error to select data from quiz_questions",
                          API: API,
                          query: query
                        });
                        res.send({
                          message: "error",
                          status: 400,
                          success: 0,
                          data: {}
                        });
                      } else {
                        if (count[0] < 1) {
                          logger.warn({
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
                        } else {
                          let countQuestions = count[0].countQuestions;
                          // menghitung jumlah jawaban yang diinputkan user
                          const query = `SELECT COUNT(*) AS countAnswer FROM quiz_entries LEFT JOIN periode ON quiz_entries.periode = periode.id WHERE quiz_entries.profile_id = ${
                            verify.id
                          } AND (periode.start_date<='${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.end_date>'${moment().format(
                            "YYYY-MM-DD"
                          )}') AND periode.category=4`;
                          connection.query(
                            query,
                            (err: any, countEntries: any) => {
                              if (err) {
                                logger.error({
                                  message:
                                    "error to count data from quiz_entries",
                                  API: API,
                                  query: query
                                });
                                res.send({
                                  message: "error",
                                  status: 400,
                                  success: 0,
                                  data: {}
                                });
                              } else {
                                if (countEntries[0].countAnswer < 1) {
                                  logger.warn({
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
                                } else {
                                  let userAnswer = countEntries[0].countAnswer;
                                  // cek apakah jawaban dan pertanyaan berjumlah sama
                                  if (countQuestions === userAnswer) {
                                    const query = `SELECT COUNT(*) AS rightCount FROM quiz_entries LEFT JOIN quiz_answers ON quiz_entries.quiz_answer = quiz_answers.id LEFT JOIN quiz_correct_answer ON quiz_answers.quiz_question_id = quiz_correct_answer.quiz_question WHERE quiz_entries.quiz_answer = quiz_correct_answer.quiz_answer`;
                                    connection.query(
                                      query,
                                      (err: any, finalCount: any) => {
                                        if (err) {
                                          logger.error({
                                            message:
                                              "error to count data from quiz_entries",
                                            API: API,
                                            query: query,
                                            err
                                          });
                                          res.send({
                                            message: "error",
                                            status: 400,
                                            success: 0,
                                            data: {}
                                          });
                                        } else {
                                          if (finalCount[0].rightCount < 1) {
                                            logger.warn({
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
                                          } else {
                                            const query = `SELECT profile_id,periode FROM quiz_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                            connection.query(
                                              query,
                                              (err: any, lead: any) => {
                                                if (err) {
                                                  logger.error({
                                                    message: "error",
                                                    API: API,
                                                    query: query,
                                                    err
                                                  });
                                                  res.send({
                                                    message: "error",
                                                    status: 400,
                                                    success: 0,
                                                    data: {}
                                                  });
                                                } else {
                                                  if (lead[0] < 1) {
                                                    const point = Math.round(
                                                      (finalCount[0]
                                                        .rightCount /
                                                        countQuestions) *
                                                        100
                                                    );
                                                    const query = `INSERT INTO quiz_leaderboard (profile_id,periode,score,createdAt) VALUES(${
                                                      verify.id
                                                    },${
                                                      data[0].id
                                                    },${point},'${moment().format(
                                                      "YYYY-MM-DD"
                                                    )}')`;
                                                    connection.query(
                                                      query,
                                                      (
                                                        err: any,
                                                        quizLeader: any
                                                      ) => {
                                                        if (err) {
                                                          logger.error({
                                                            message: "error",
                                                            API: API,
                                                            query: query,
                                                            err
                                                          });
                                                          res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                          });
                                                        } else {
                                                          logger.info({
                                                            mesage: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                            API: API,
                                                            query: query
                                                          });
                                                          res.send({
                                                            message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                            status: 200,
                                                            success: 1,
                                                            data: {}
                                                          });
                                                        }
                                                      }
                                                    );
                                                  } else {
                                                    logger.info({
                                                      mesage: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                      API: API,
                                                      query: query
                                                    });
                                                    res.send({
                                                      message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                      status: 200,
                                                      success: 1,
                                                      data: {}
                                                    });
                                                  }
                                                }
                                              }
                                            );
                                          }
                                        }
                                      }
                                    );
                                  } else {
                                    logger.info({
                                      mesage: `Continue answering the quiz`,
                                      API: API,
                                      query: query
                                    });
                                    res.send({
                                      message: `Continue answering the quiz`,
                                      status: 200,
                                      success: 1,
                                      data: {}
                                    });
                                  }
                                }
                              }
                            }
                          );
                        }
                      }
                    });
                  } else {
                    // jika user belum pernah mengikuti quiz sama sekali, jawaban yang diinputak user akan diinput ke database
                    const query = `INSERT INTO quiz_entries (profile_id,quiz_answer,periode) VALUES (${verify.id},${req.body.answerId},${data[0].id})`;
                    connection.query(query, (err: any, rows: any) => {
                      if (err) {
                        logger.error({
                          message: "error",
                          API: API,
                          query: query,
                          err
                        });
                        res.send({
                          message: "error",
                          status: 400,
                          success: 0,
                          data: {}
                        });
                      } else {
                        if (rows.insertId > 0) {
                          // menghitung jumlah question dalam satu periode berjalan
                          const query = `SELECT COUNT(*) AS countQuestions FROM quiz_questions LEFT JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.end_date>'${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.category=4`;
                          connection.query(query, (err: any, count: any) => {
                            if (err) {
                              logger.error({
                                message: "error",
                                API: API,
                                query: query,
                                err
                              });
                              res.send({
                                message: "error",
                                status: 400,
                                success: 0,
                                data: {}
                              });
                            } else {
                              if (count[0] < 1) {
                                logger.warn({
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
                              } else {
                                let countQuestions = count[0].countQuestions;
                                // menghitung jumlah jawaban yang diinputkan user
                                const query = `SELECT COUNT(*) AS countAnswer FROM quiz_entries LEFT JOIN periode ON quiz_entries.periode = periode.id WHERE quiz_entries.profile_id = ${
                                  verify.id
                                } AND (periode.start_date<='${moment().format(
                                  "YYYY-MM-DD"
                                )}' AND periode.end_date>'${moment().format(
                                  "YYYY-MM-DD"
                                )}') AND periode.category=4`;
                                connection.query(
                                  query,
                                  (err: any, countEntries: any) => {
                                    if (err) {
                                      logger.error({
                                        message: "error",
                                        API: API,
                                        query: query,
                                        err
                                      });
                                      res.send({
                                        message: "error",
                                        status: 400,
                                        success: 0,
                                        data: {}
                                      });
                                    } else {
                                      if (countEntries[0].countAnswer < 1) {
                                        logger.warn({
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
                                      } else {
                                        let userAnswer =
                                          countEntries[0].countAnswer;
                                        // cek apakah jawaban dan pertanyaan berjumlah sama
                                        if (countQuestions === userAnswer) {
                                          const query = `SELECT COUNT(*) AS rightCount FROM quiz_entries LEFT JOIN quiz_answers ON quiz_entries.quiz_answer = quiz_answers.id LEFT JOIN quiz_correct_answer ON quiz_answers.quiz_question_id = quiz_correct_answer.quiz_question WHERE quiz_entries.quiz_answer = quiz_correct_answer.quiz_answer`;
                                          connection.query(
                                            query,
                                            (err: any, finalCount: any) => {
                                              if (err) {
                                                logger.error({
                                                  message: "err",
                                                  API: API,
                                                  query: query,
                                                  err
                                                });
                                                res.send({
                                                  message: "error",
                                                  status: 400,
                                                  success: 0,
                                                  data: {}
                                                });
                                              } else {
                                                if (
                                                  finalCount[0].rightCount < 1
                                                ) {
                                                  logger.warn({
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
                                                } else {
                                                  const query = `SELECT profile_id,periode FROM quiz_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                                  connection.query(
                                                    query,
                                                    (err: any, lead: any) => {
                                                      if (err) {
                                                        logger.error({
                                                          message: "err",
                                                          API: API,
                                                          query: query,
                                                          err
                                                        });
                                                        res.send({
                                                          message: "error",
                                                          status: 400,
                                                          success: 0,
                                                          data: {}
                                                        });
                                                      } else {
                                                        if (lead[0] < 1) {
                                                          const point = Math.round(
                                                            (finalCount[0]
                                                              .rightCount /
                                                              countQuestions) *
                                                              100
                                                          );
                                                          const query = `INSERT INTO quiz_leaderboard (profile_id,periode,score,createdAt) VALUES(${
                                                            verify.id
                                                          },${
                                                            data[0].id
                                                          },${point},'${moment().format(
                                                            "YYYY-MM-DD"
                                                          )}')`;
                                                          connection.query(
                                                            query,
                                                            (
                                                              err: any,
                                                              quizLeader: any
                                                            ) => {
                                                              if (err) {
                                                                logger.error({
                                                                  message:
                                                                    "error",
                                                                  API: API,
                                                                  query: query,
                                                                  err
                                                                });
                                                                res.send({
                                                                  message:
                                                                    "error",
                                                                  status: 400,
                                                                  success: 0,
                                                                  data: {}
                                                                });
                                                              } else {
                                                                logger.info({
                                                                  message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                                  API: API,
                                                                  query: query
                                                                });
                                                                res.send({
                                                                  message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                                  status: 200,
                                                                  success: 1,
                                                                  data: {}
                                                                });
                                                              }
                                                            }
                                                          );
                                                        } else {
                                                          logger.info({
                                                            message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                            API: API,
                                                            query: query
                                                          });
                                                          res.send({
                                                            message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                            status: 200,
                                                            success: 1,
                                                            data: {}
                                                          });
                                                        }
                                                      }
                                                    }
                                                  );
                                                }
                                              }
                                            }
                                          );
                                        } else {
                                          logger.info({
                                            message: `Continue answering the quiz`,
                                            API: API,
                                            query: query
                                          });
                                          res.send({
                                            message: `Continue answering the quiz`,
                                            status: 200,
                                            success: 1,
                                            data: {}
                                          });
                                        }
                                      }
                                    }
                                  }
                                );
                              }
                            }
                          });
                        } else {
                          logger.query({
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
      } else if (language === "idn") {
        // cek apakah ada event quiz atau tidak
        const query = `SELECT id FROM periode WHERE start_date<='${moment().format(
          "YYYY-MM-DD"
        )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=4`;
        connection.query(query, (err: any, data: any) => {
          if (err) {
            logger.error({
              message: "error select periode",
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
          } else {
            // response yang dikirim jika tidak ditemukan quiz setting yang sedang berjalan
            if (data.length < 1) {
              logger.warning({
                message: "Time Ups, try again later",
                API: API,
                query: query
              });
              res.send({
                message: "Waktu habis, try again later",
                status: 200,
                success: 1,
                data: {}
              });
            } else {
              const token = req.header("auth-token");
              const verify = jwt.verify(token, TOKEN_SECRET.default);
              // cek jawaban duplicate dari user
              const query = `SELECT profile_id,quiz_answer,periode FROM quiz_entries WHERE profile_id =${verify.id} AND quiz_answer = ${req.body.answerId} AND periode = ${data[0].id} `;
              connection.query(query, (err: any, duplicateEntries: any) => {
                if (err) {
                  logger.error({
                    message: "error to select data from quiz entries",
                    API: API,
                    query: query
                  });
                  res.send({
                    message: "error",
                    status: 400,
                    success: 0,
                    data: {}
                  });
                } else {
                  // perintah jika user sudah pernah mengisi jawaban sebelumnya (jawaban yang dipilih tidak diinputkan kembali ke database)
                  if (duplicateEntries.length >= 1) {
                    // menghitung jumlah question dalam satu periode berjalan
                    const query = `SELECT COUNT(*) AS countQuestions FROM quiz_questions LEFT JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.end_date>'${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.category=4`;
                    connection.query(query, (err: any, count: any) => {
                      if (err) {
                        logger.error({
                          message: "error to select data from quiz_questions",
                          API: API,
                          query: query
                        });
                        res.send({
                          message: "error",
                          status: 400,
                          success: 0,
                          data: {}
                        });
                      } else {
                        if (count[0] < 1) {
                          logger.warn({
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
                        } else {
                          let countQuestions = count[0].countQuestions;
                          // menghitung jumlah jawaban yang diinputkan user
                          const query = `SELECT COUNT(*) AS countAnswer FROM quiz_entries LEFT JOIN periode ON quiz_entries.periode = periode.id WHERE quiz_entries.profile_id = ${
                            verify.id
                          } AND (periode.start_date<='${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.end_date>'${moment().format(
                            "YYYY-MM-DD"
                          )}') AND periode.category=4`;
                          connection.query(
                            query,
                            (err: any, countEntries: any) => {
                              if (err) {
                                logger.error({
                                  message:
                                    "error to count data from quiz_entries",
                                  API: API,
                                  query: query
                                });
                                res.send({
                                  message: "error",
                                  status: 400,
                                  success: 0,
                                  data: {}
                                });
                              } else {
                                if (countEntries[0].countAnswer < 1) {
                                  logger.warn({
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
                                } else {
                                  let userAnswer = countEntries[0].countAnswer;
                                  // cek apakah jawaban dan pertanyaan berjumlah sama
                                  if (countQuestions === userAnswer) {
                                    const query = `SELECT COUNT(*) AS rightCount FROM quiz_entries LEFT JOIN quiz_answers ON quiz_entries.quiz_answer = quiz_answers.id LEFT JOIN quiz_correct_answer ON quiz_answers.quiz_question_id = quiz_correct_answer.quiz_question WHERE quiz_entries.quiz_answer = quiz_correct_answer.quiz_answer`;
                                    connection.query(
                                      query,
                                      (err: any, finalCount: any) => {
                                        if (err) {
                                          logger.error({
                                            message:
                                              "error to count data from quiz_entries",
                                            API: API,
                                            query: query,
                                            err
                                          });
                                          res.send({
                                            message: "error",
                                            status: 400,
                                            success: 0,
                                            data: {}
                                          });
                                        } else {
                                          if (finalCount[0].rightCount < 1) {
                                            logger.warn({
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
                                          } else {
                                            const query = `SELECT profile_id,periode FROM quiz_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                            connection.query(
                                              query,
                                              (err: any, lead: any) => {
                                                if (err) {
                                                  logger.error({
                                                    message: "error",
                                                    API: API,
                                                    query: query,
                                                    err
                                                  });
                                                  res.send({
                                                    message: "error",
                                                    status: 400,
                                                    success: 0,
                                                    data: {}
                                                  });
                                                } else {
                                                  if (lead[0] < 1) {
                                                    const point = Math.round(
                                                      (finalCount[0]
                                                        .rightCount /
                                                        countQuestions) *
                                                        100
                                                    );
                                                    const query = `INSERT INTO quiz_leaderboard (profile_id,periode,score,createdAt) VALUES(${
                                                      verify.id
                                                    },${
                                                      data[0].id
                                                    },${point},'${moment().format(
                                                      "YYYY-MM-DD"
                                                    )}')`;
                                                    connection.query(
                                                      query,
                                                      (
                                                        err: any,
                                                        quizLeader: any
                                                      ) => {
                                                        if (err) {
                                                          logger.error({
                                                            message: "error",
                                                            API: API,
                                                            query: query,
                                                            err
                                                          });
                                                          res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                          });
                                                        } else {
                                                          logger.info({
                                                            mesage: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                            API: API,
                                                            query: query
                                                          });
                                                          res.send({
                                                            message: `Anda berhasil menjawab ${finalCount[0].rightCount} pertanyaan dengan benar`,
                                                            status: 200,
                                                            success: 1,
                                                            data: {}
                                                          });
                                                        }
                                                      }
                                                    );
                                                  } else {
                                                    logger.info({
                                                      mesage: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                      API: API,
                                                      query: query
                                                    });
                                                    res.send({
                                                      message: `Anda berhasil menjawab ${finalCount[0].rightCount} pertanyaan dengan benar`,
                                                      status: 200,
                                                      success: 1,
                                                      data: {}
                                                    });
                                                  }
                                                }
                                              }
                                            );
                                          }
                                        }
                                      }
                                    );
                                  } else {
                                    logger.info({
                                      mesage: `Continue answering the quiz`,
                                      API: API,
                                      query: query
                                    });
                                    res.send({
                                      message: `Lanjut jawab quiz`,
                                      status: 200,
                                      success: 1,
                                      data: {}
                                    });
                                  }
                                }
                              }
                            }
                          );
                        }
                      }
                    });
                  } else {
                    // jika user belum pernah mengikuti quiz sama sekali, jawaban yang diinputak user akan diinput ke database
                    const query = `INSERT INTO quiz_entries (profile_id,quiz_answer,periode) VALUES (${verify.id},${req.body.answerId},${data[0].id})`;
                    connection.query(query, (err: any, rows: any) => {
                      if (err) {
                        logger.error({
                          message: "error",
                          API: API,
                          query: query,
                          err
                        });
                        res.send({
                          message: "error",
                          status: 400,
                          success: 0,
                          data: {}
                        });
                      } else {
                        if (rows.insertId > 0) {
                          // menghitung jumlah question dalam satu periode berjalan
                          const query = `SELECT COUNT(*) AS countQuestions FROM quiz_questions LEFT JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.end_date>'${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.category=4`;
                          connection.query(query, (err: any, count: any) => {
                            if (err) {
                              logger.error({
                                message: "error",
                                API: API,
                                query: query,
                                err
                              });
                              res.send({
                                message: "error",
                                status: 400,
                                success: 0,
                                data: {}
                              });
                            } else {
                              if (count[0] < 1) {
                                logger.warn({
                                  message: "data not found",
                                  API: API,
                                  query: query
                                });
                                res.send({
                                  message: "data tidak dtemukan",
                                  status: 200,
                                  success: 1,
                                  data: {}
                                });
                              } else {
                                let countQuestions = count[0].countQuestions;
                                // menghitung jumlah jawaban yang diinputkan user
                                const query = `SELECT COUNT(*) AS countAnswer FROM quiz_entries LEFT JOIN periode ON quiz_entries.periode = periode.id WHERE quiz_entries.profile_id = ${
                                  verify.id
                                } AND (periode.start_date<='${moment().format(
                                  "YYYY-MM-DD"
                                )}' AND periode.end_date>'${moment().format(
                                  "YYYY-MM-DD"
                                )}') AND periode.category=4`;
                                connection.query(
                                  query,
                                  (err: any, countEntries: any) => {
                                    if (err) {
                                      logger.error({
                                        message: "error",
                                        API: API,
                                        query: query,
                                        err
                                      });
                                      res.send({
                                        message: "error",
                                        status: 400,
                                        success: 0,
                                        data: {}
                                      });
                                    } else {
                                      if (countEntries[0].countAnswer < 1) {
                                        logger.warn({
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
                                      } else {
                                        let userAnswer =
                                          countEntries[0].countAnswer;
                                        // cek apakah jawaban dan pertanyaan berjumlah sama
                                        if (countQuestions === userAnswer) {
                                          const query = `SELECT COUNT(*) AS rightCount FROM quiz_entries LEFT JOIN quiz_answers ON quiz_entries.quiz_answer = quiz_answers.id LEFT JOIN quiz_correct_answer ON quiz_answers.quiz_question_id = quiz_correct_answer.quiz_question WHERE quiz_entries.quiz_answer = quiz_correct_answer.quiz_answer`;
                                          connection.query(
                                            query,
                                            (err: any, finalCount: any) => {
                                              if (err) {
                                                logger.error({
                                                  message: "err",
                                                  API: API,
                                                  query: query,
                                                  err
                                                });
                                                res.send({
                                                  message: "error",
                                                  status: 400,
                                                  success: 0,
                                                  data: {}
                                                });
                                              } else {
                                                if (
                                                  finalCount[0].rightCount < 1
                                                ) {
                                                  logger.warn({
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
                                                } else {
                                                  const query = `SELECT profile_id,periode FROM quiz_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                                  connection.query(
                                                    query,
                                                    (err: any, lead: any) => {
                                                      if (err) {
                                                        logger.error({
                                                          message: "err",
                                                          API: API,
                                                          query: query,
                                                          err
                                                        });
                                                        res.send({
                                                          message: "error",
                                                          status: 400,
                                                          success: 0,
                                                          data: {}
                                                        });
                                                      } else {
                                                        if (lead[0] < 1) {
                                                          const point = Math.round(
                                                            (finalCount[0]
                                                              .rightCount /
                                                              countQuestions) *
                                                              100
                                                          );
                                                          const query = `INSERT INTO quiz_leaderboard (profile_id,periode,score,createdAt) VALUES(${
                                                            verify.id
                                                          },${
                                                            data[0].id
                                                          },${point},'${moment().format(
                                                            "YYYY-MM-DD"
                                                          )}')`;
                                                          connection.query(
                                                            query,
                                                            (
                                                              err: any,
                                                              quizLeader: any
                                                            ) => {
                                                              if (err) {
                                                                logger.error({
                                                                  message:
                                                                    "error",
                                                                  API: API,
                                                                  query: query,
                                                                  err
                                                                });
                                                                res.send({
                                                                  message:
                                                                    "error",
                                                                  status: 400,
                                                                  success: 0,
                                                                  data: {}
                                                                });
                                                              } else {
                                                                logger.info({
                                                                  message: `anda berhasil menjawab ${finalCount[0].rightCount} pertanyaan dengan benar`,
                                                                  API: API,
                                                                  query: query
                                                                });
                                                                res.send({
                                                                  message: `Anda berhasil menjawab ${finalCount[0].rightCount} pertanyaan dengan benar`,
                                                                  status: 200,
                                                                  success: 1,
                                                                  data: {}
                                                                });
                                                              }
                                                            }
                                                          );
                                                        } else {
                                                          logger.info({
                                                            message: `You have successfully answered ${finalCount[0].rightCount} pertanyaan dengan benar`,
                                                            API: API,
                                                            query: query
                                                          });
                                                          res.send({
                                                            message: `Anda berhasil menjawab ${finalCount[0].rightCount} pertanyaan dengan benar`,
                                                            status: 200,
                                                            success: 1,
                                                            data: {}
                                                          });
                                                        }
                                                      }
                                                    }
                                                  );
                                                }
                                              }
                                            }
                                          );
                                        } else {
                                          logger.info({
                                            message: `Continue answering the quiz`,
                                            API: API,
                                            query: query
                                          });
                                          res.send({
                                            message: `Lanjutkan menjawab pertanyaan`,
                                            status: 200,
                                            success: 1,
                                            data: {}
                                          });
                                        }
                                      }
                                    }
                                  }
                                );
                              }
                            }
                          });
                        } else {
                          logger.query({
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
      } else {
        // cek apakah ada event quiz atau tidak
        const query = `SELECT id FROM periode WHERE start_date<='${moment().format(
          "YYYY-MM-DD"
        )}' AND end_date>'${moment().format("YYYY-MM-DD")}' AND category=4`;
        connection.query(query, (err: any, data: any) => {
          if (err) {
            logger.error({
              message: "error select periode",
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
          } else {
            // response yang dikirim jika tidak ditemukan quiz setting yang sedang berjalan
            if (data.length < 1) {
              logger.warning({
                message: "Time Ups, try again later",
                API: API,
                query: query
              });
              res.send({
                message: "Time Ups, try again later",
                status: 200,
                success: 1,
                data: {}
              });
            } else {
              const token = req.header("auth-token");
              const verify = jwt.verify(token, TOKEN_SECRET.default);
              // cek jawaban duplicate dari user
              const query = `SELECT profile_id,quiz_answer,periode FROM quiz_entries WHERE profile_id =${verify.id} AND quiz_answer = ${req.body.answerId} AND periode = ${data[0].id} `;
              connection.query(query, (err: any, duplicateEntries: any) => {
                if (err) {
                  logger.error({
                    message: "error to select data from quiz entries",
                    API: API,
                    query: query
                  });
                  res.send({
                    message: "error",
                    status: 400,
                    success: 0,
                    data: {}
                  });
                } else {
                  // perintah jika user sudah pernah mengisi jawaban sebelumnya (jawaban yang dipilih tidak diinputkan kembali ke database)
                  if (duplicateEntries.length >= 1) {
                    // menghitung jumlah question dalam satu periode berjalan
                    const query = `SELECT COUNT(*) AS countQuestions FROM quiz_questions LEFT JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.end_date>'${moment().format(
                      "YYYY-MM-DD"
                    )}' AND periode.category=4`;
                    connection.query(query, (err: any, count: any) => {
                      if (err) {
                        logger.error({
                          message: "error to select data from quiz_questions",
                          API: API,
                          query: query
                        });
                        res.send({
                          message: "error",
                          status: 400,
                          success: 0,
                          data: {}
                        });
                      } else {
                        if (count[0] < 1) {
                          logger.warn({
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
                        } else {
                          let countQuestions = count[0].countQuestions;
                          // menghitung jumlah jawaban yang diinputkan user
                          const query = `SELECT COUNT(*) AS countAnswer FROM quiz_entries LEFT JOIN periode ON quiz_entries.periode = periode.id WHERE quiz_entries.profile_id = ${
                            verify.id
                          } AND (periode.start_date<='${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.end_date>'${moment().format(
                            "YYYY-MM-DD"
                          )}') AND periode.category=4`;
                          connection.query(
                            query,
                            (err: any, countEntries: any) => {
                              if (err) {
                                logger.error({
                                  message:
                                    "error to count data from quiz_entries",
                                  API: API,
                                  query: query
                                });
                                res.send({
                                  message: "error",
                                  status: 400,
                                  success: 0,
                                  data: {}
                                });
                              } else {
                                if (countEntries[0].countAnswer < 1) {
                                  logger.warn({
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
                                } else {
                                  let userAnswer = countEntries[0].countAnswer;
                                  // cek apakah jawaban dan pertanyaan berjumlah sama
                                  if (countQuestions === userAnswer) {
                                    const query = `SELECT COUNT(*) AS rightCount FROM quiz_entries LEFT JOIN quiz_answers ON quiz_entries.quiz_answer = quiz_answers.id LEFT JOIN quiz_correct_answer ON quiz_answers.quiz_question_id = quiz_correct_answer.quiz_question WHERE quiz_entries.quiz_answer = quiz_correct_answer.quiz_answer`;
                                    connection.query(
                                      query,
                                      (err: any, finalCount: any) => {
                                        if (err) {
                                          logger.error({
                                            message:
                                              "error to count data from quiz_entries",
                                            API: API,
                                            query: query,
                                            err
                                          });
                                          res.send({
                                            message: "error",
                                            status: 400,
                                            success: 0,
                                            data: {}
                                          });
                                        } else {
                                          if (finalCount[0].rightCount < 1) {
                                            logger.warn({
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
                                          } else {
                                            const query = `SELECT profile_id,periode FROM quiz_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                            connection.query(
                                              query,
                                              (err: any, lead: any) => {
                                                if (err) {
                                                  logger.error({
                                                    message: "error",
                                                    API: API,
                                                    query: query,
                                                    err
                                                  });
                                                  res.send({
                                                    message: "error",
                                                    status: 400,
                                                    success: 0,
                                                    data: {}
                                                  });
                                                } else {
                                                  if (lead[0] < 1) {
                                                    const point = Math.round(
                                                      (finalCount[0]
                                                        .rightCount /
                                                        countQuestions) *
                                                        100
                                                    );
                                                    const query = `INSERT INTO quiz_leaderboard (profile_id,periode,score,createdAt) VALUES(${
                                                      verify.id
                                                    },${
                                                      data[0].id
                                                    },${point},'${moment().format(
                                                      "YYYY-MM-DD"
                                                    )}')`;
                                                    connection.query(
                                                      query,
                                                      (
                                                        err: any,
                                                        quizLeader: any
                                                      ) => {
                                                        if (err) {
                                                          logger.error({
                                                            message: "error",
                                                            API: API,
                                                            query: query,
                                                            err
                                                          });
                                                          res.send({
                                                            message: "error",
                                                            status: 400,
                                                            success: 0,
                                                            data: {}
                                                          });
                                                        } else {
                                                          logger.info({
                                                            mesage: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                            API: API,
                                                            query: query
                                                          });
                                                          res.send({
                                                            message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                            status: 200,
                                                            success: 1,
                                                            data: {}
                                                          });
                                                        }
                                                      }
                                                    );
                                                  } else {
                                                    logger.info({
                                                      mesage: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                      API: API,
                                                      query: query
                                                    });
                                                    res.send({
                                                      message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                      status: 200,
                                                      success: 1,
                                                      data: {}
                                                    });
                                                  }
                                                }
                                              }
                                            );
                                          }
                                        }
                                      }
                                    );
                                  } else {
                                    logger.info({
                                      mesage: `Continue answering the quiz`,
                                      API: API,
                                      query: query
                                    });
                                    res.send({
                                      message: `Continue answering the quiz`,
                                      status: 200,
                                      success: 1,
                                      data: {}
                                    });
                                  }
                                }
                              }
                            }
                          );
                        }
                      }
                    });
                  } else {
                    // jika user belum pernah mengikuti quiz sama sekali, jawaban yang diinputak user akan diinput ke database
                    const query = `INSERT INTO quiz_entries (profile_id,quiz_answer,periode) VALUES (${verify.id},${req.body.answerId},${data[0].id})`;
                    connection.query(query, (err: any, rows: any) => {
                      if (err) {
                        logger.error({
                          message: "error",
                          API: API,
                          query: query,
                          err
                        });
                        res.send({
                          message: "error",
                          status: 400,
                          success: 0,
                          data: {}
                        });
                      } else {
                        if (rows.insertId > 0) {
                          // menghitung jumlah question dalam satu periode berjalan
                          const query = `SELECT COUNT(*) AS countQuestions FROM quiz_questions LEFT JOIN periode ON quiz_questions.periode = periode.id WHERE periode.start_date<='${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.end_date>'${moment().format(
                            "YYYY-MM-DD"
                          )}' AND periode.category=4`;
                          connection.query(query, (err: any, count: any) => {
                            if (err) {
                              logger.error({
                                message: "error",
                                API: API,
                                query: query,
                                err
                              });
                              res.send({
                                message: "error",
                                status: 400,
                                success: 0,
                                data: {}
                              });
                            } else {
                              if (count[0] < 1) {
                                logger.warn({
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
                              } else {
                                let countQuestions = count[0].countQuestions;
                                // menghitung jumlah jawaban yang diinputkan user
                                const query = `SELECT COUNT(*) AS countAnswer FROM quiz_entries LEFT JOIN periode ON quiz_entries.periode = periode.id WHERE quiz_entries.profile_id = ${
                                  verify.id
                                } AND (periode.start_date<='${moment().format(
                                  "YYYY-MM-DD"
                                )}' AND periode.end_date>'${moment().format(
                                  "YYYY-MM-DD"
                                )}') AND periode.category=4`;
                                connection.query(
                                  query,
                                  (err: any, countEntries: any) => {
                                    if (err) {
                                      logger.error({
                                        message: "error",
                                        API: API,
                                        query: query,
                                        err
                                      });
                                      res.send({
                                        message: "error",
                                        status: 400,
                                        success: 0,
                                        data: {}
                                      });
                                    } else {
                                      if (countEntries[0].countAnswer < 1) {
                                        logger.warn({
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
                                      } else {
                                        let userAnswer =
                                          countEntries[0].countAnswer;
                                        // cek apakah jawaban dan pertanyaan berjumlah sama
                                        if (countQuestions === userAnswer) {
                                          const query = `SELECT COUNT(*) AS rightCount FROM quiz_entries LEFT JOIN quiz_answers ON quiz_entries.quiz_answer = quiz_answers.id LEFT JOIN quiz_correct_answer ON quiz_answers.quiz_question_id = quiz_correct_answer.quiz_question WHERE quiz_entries.quiz_answer = quiz_correct_answer.quiz_answer`;
                                          connection.query(
                                            query,
                                            (err: any, finalCount: any) => {
                                              if (err) {
                                                logger.error({
                                                  message: "err",
                                                  API: API,
                                                  query: query,
                                                  err
                                                });
                                                res.send({
                                                  message: "error",
                                                  status: 400,
                                                  success: 0,
                                                  data: {}
                                                });
                                              } else {
                                                if (
                                                  finalCount[0].rightCount < 1
                                                ) {
                                                  logger.warn({
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
                                                } else {
                                                  const query = `SELECT profile_id,periode FROM quiz_leaderboard WHERE profile_id=${verify.id} AND periode=${data[0].id}`;
                                                  connection.query(
                                                    query,
                                                    (err: any, lead: any) => {
                                                      if (err) {
                                                        logger.error({
                                                          message: "err",
                                                          API: API,
                                                          query: query,
                                                          err
                                                        });
                                                        res.send({
                                                          message: "error",
                                                          status: 400,
                                                          success: 0,
                                                          data: {}
                                                        });
                                                      } else {
                                                        if (lead[0] < 1) {
                                                          const point = Math.round(
                                                            (finalCount[0]
                                                              .rightCount /
                                                              countQuestions) *
                                                              100
                                                          );
                                                          const query = `INSERT INTO quiz_leaderboard (profile_id,periode,score,createdAt) VALUES(${
                                                            verify.id
                                                          },${
                                                            data[0].id
                                                          },${point},'${moment().format(
                                                            "YYYY-MM-DD"
                                                          )}')`;
                                                          connection.query(
                                                            query,
                                                            (
                                                              err: any,
                                                              quizLeader: any
                                                            ) => {
                                                              if (err) {
                                                                logger.error({
                                                                  message:
                                                                    "error",
                                                                  API: API,
                                                                  query: query,
                                                                  err
                                                                });
                                                                res.send({
                                                                  message:
                                                                    "error",
                                                                  status: 400,
                                                                  success: 0,
                                                                  data: {}
                                                                });
                                                              } else {
                                                                logger.info({
                                                                  message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                                  API: API,
                                                                  query: query
                                                                });
                                                                res.send({
                                                                  message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                                  status: 200,
                                                                  success: 1,
                                                                  data: {}
                                                                });
                                                              }
                                                            }
                                                          );
                                                        } else {
                                                          logger.info({
                                                            message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                            API: API,
                                                            query: query
                                                          });
                                                          res.send({
                                                            message: `You have successfully answered ${finalCount[0].rightCount} questions correctly`,
                                                            status: 200,
                                                            success: 1,
                                                            data: {}
                                                          });
                                                        }
                                                      }
                                                    }
                                                  );
                                                }
                                              }
                                            }
                                          );
                                        } else {
                                          logger.info({
                                            message: `Continue answering the quiz`,
                                            API: API,
                                            query: query
                                          });
                                          res.send({
                                            message: `Continue answering the quiz`,
                                            status: 200,
                                            success: 1,
                                            data: {}
                                          });
                                        }
                                      }
                                    }
                                  }
                                );
                              }
                            }
                          });
                        } else {
                          logger.query({
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
    }
  );
};
