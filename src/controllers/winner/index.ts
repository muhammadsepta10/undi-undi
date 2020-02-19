import * as express from "express";
import * as winner from "./winner";
import { prizePicture } from "./winner";

let router = express.Router();

/**
 * @swagger
 *
 * components:
 *  schemas:
 *      Prize_Category:
 *          type: object
 *          properties:
 *              periode_id:
 *                  example: 1
 *                  type: integer
 */

/**
 * @swagger
 * /winner/all/{periode_id}/{prize}:
 *      get:
 *          tags:
 *              - Winner
 *          summary: Get winner where periode and prize id
 *          parameters:
 *              - in: path
 *                name: periode_id
 *                schema:
 *                  type: integer
 *                required: true
 *              - in: path
 *                name: prize
 *                schema:
 *                  type: integer
 *                required: true
 *          consumes:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *             400:
 *                  description: Invalid
 */
router.route("/all/:period_id/:prize").get(winner.winnerIndex);

/**
 * @swagger
 * /winner/search/{period_id}/{search}:
 *      get:
 *          tags:
 *              - Winner
 *          summary: Search from winner by periode and handphone/accountname/fullname/email
 *          parameters:
 *              - in: path
 *                name: period_id
 *                schema:
 *                  type: integer
 *                required: true
 *              - in: path
 *                name: search
 *                schema:
 *                  type: string
 *                required: true
 *          consumes:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example:
 *                                          Get Data Success
 *                                  success:
 *                                      example: 1
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 *             422:
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example:
 *                                          Get Data Failed
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 */

router.route("/search/:period_id/:search").get(winner.searchWinnerByPeriodId);

/**
 * @swagger
 * /winner/period/{category}:
 *      get:
 *          tags:
 *              - Winner
 *          summary: Get all winner period per category
 *          parameters:
 *              - in: path
 *                name: category
 *                schema:
 *                  type: integer
 *                required: true
 *          consumes:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: Get Data Success
 *                                  success:
 *                                      example: 1
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 *             404:
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: Data Not Found
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 404
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 *             422:
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: Failed Get Data
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 *
 */
router.route("/period/:category").get(winner.getWinnerPeriod);

/**
 * @swagger
 * /winner/period/active/{category}:
 *      get:
 *          tags:
 *              - Winner
 *          summary: Get active period
 *          parameters:
 *              - in: path
 *                name: category
 *                schema:
 *                  type: integer
 *                required: true
 *          consumes:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: Get Data Success
 *                                  success:
 *                                      example: 1
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 *             404:
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: Data Not Found
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 404
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 *             422:
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: Failed Get Data
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 *
 */
router.route("/period/active/:category").get(winner.getActiveWinnerPeriod);

/**
 * @swagger
 * /winner/prize_picture/{periode}:
 *      get:
 *          tags:
 *              - Winner
 *          summary: Get prize per periode
 *          parameters:
 *              - in: path
 *                name: periode
 *                schema:
 *                  type: integer
 *                required: true
 *          consumes:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: Get Data Success
 *                                  success:
 *                                      example: 1
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 *             404:
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: Data Not Found
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 404
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 *             422:
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: Failed Get Data
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 *
 */
router.route("/prize_picture/:periode").get(winner.prizePicture);

export = router;
