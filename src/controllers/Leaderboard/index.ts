import * as express from "express";
import * as leaderboard from "./leaderboard";

let router = express.Router();

/**
 * @swagger
 *
 * components:
 *  schemas:
 *      Leaderboard:
 *          type: object
 *          required:
 *              - periodeId
 *          properties:
 *              periodeId:
 *                  type: integer
 *              profileId:
 *                  type: integer
 *              point:
 *                  type: integer
 *              rank:
 *                  type: integer
 *              created_at:
 *                  type: date
 *
 */

/**
 * @swagger
 * /leaderboard/{period_id}:
 *      get:
 *          tags:
 *              - Leaderboard
 *          summary: Get Leaderboard by Period
 *          parameters:
 *              - name: period_id
 *                in: path
 *                required: true
 *                schema:
 *                  type: string
 *          consumes:
 *              - application/json
 *          security:
 *              - ApiKeyAuth: []
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

router.route("/:period_id").get(leaderboard.getLeaderboardByPeriodId);

/**
 * @swagger
 * /leaderboard/search/{period_id}/{params}:
 *      get:
 *          tags:
 *              - Leaderboard
 *          summary: Search from Leaderboard
 *          parameters:
 *              - in: path
 *                name: period_id
 *                schema:
 *                  type: string
 *                required: true
 *              - in: path
 *                name: params
 *                schema:
 *                  type: string
 *                required: true
 *          consumes:
 *              - application/json
 *          security:
 *              - ApiKeyAuth: []
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

router
  .route("/search/:period_id/:params")
  .get(leaderboard.searchLeaderboardByPeriodId);

/**
 * @swagger
 * /leaderboard/period/all:
 *      get:
 *          tags:
 *              - Leaderboard
 *          summary: Get all leaderboard period
 *          consumes:
 *              - application/json
 *          security:
 *              - ApiKeyAuth: []
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
router.route("/period/all").get(leaderboard.getLeaderboardPeriod);

/**
 * @swagger
 * /leaderboard/period/active:
 *      get:
 *          tags:
 *              - Leaderboard
 *          summary: Get active period
 *          consumes:
 *              - application/json
 *          security:
 *              - ApiKeyAuth: []
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
router.route("/period/active").get(leaderboard.getActiveLeaderboardPeriod);

/**
 * @swagger
 * /leaderboard/user/{period_id}:
 *      get:
 *          tags:
 *              - Leaderboard
 *          summary: Get current user (login) rank and point
 *          consumes:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: period_id
 *                schema: 
 *                  type: string
 *                required: true
 *          security:
 *              - ApiKeyAuth: []
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
router.route("/user/:period_id").get(leaderboard.getCurrentUserLeaderboardbyPeriod);

export = router;

