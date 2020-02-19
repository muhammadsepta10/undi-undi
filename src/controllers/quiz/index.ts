import * as express from "express";
import * as quiz from "./quiz";

let router = express.Router();

// /**
//  * @swagger
//  * /quiz/quizAvailable:
//  *      get:
//  *          tags:
//  *              - Quiz
//  *          summary: to check availability quiz and user alredy answered
//  *          security:
//  *              - ApiKeyAuth: []
//  *          produces:
//  *              - application/json
//  *          responses:
//  *             200:
//  *                  description: Succesful
//  *                  content:
//  *                      application/json:
//  *                          schema:
//  *                              type: object
//  *                              properties:
//  *                                  message:
//  *                                      example:
//  *                                          Get Data Success
//  *                                  success:
//  *                                      example: 1
//  *                                      type: boolean
//  *                                  status:
//  *                                      example: 200
//  *                                      type: string
//  *                                  data:
//  *                                      type: object
//  *             422:
//  *                  description: Invalid
//  *                  content:
//  *                      application/json:
//  *                          schema:
//  *                              type: object
//  *                              properties:
//  *                                  message:
//  *                                      example:
//  *                                          Get Data Failed
//  *                                  success:
//  *                                      example: 0
//  *                                      type: boolean
//  *                                  status:
//  *                                      example: 422
//  *                                      type: string
//  *                                  data:
//  *                                      type: object
//  */
router.route("/quizAvailable").get(quiz.checkUserAnswered);

/**
 * @swagger
 * /quiz/questions:
 *      get:
 *          tags:
 *              - Quiz
 *          summary: to get quiz questions
 *          security:
 *              - ApiKeyAuth: []
 *          produces:
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
 *                                      type: string
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
 *                                      type: string
 *                                  data:
 *                                      type: object
 */
router.route("/questions").get(quiz.quizQuestions);

/**
 * @swagger
 * /quiz/answer/{questionsId}:
 *      get:
 *          tags:
 *              - Quiz
 *          summary: to get the answer per questions by questions id
 *          security:
 *              - ApiKeyAuth: []
 *          parameters:
 *              - in: path
 *                name: questionsId
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
router.route("/answer/:questionsId").get(quiz.quizAnswer);

/**
 * @swagger
 *
 * components:
 *  schemas:
 *      Quiz:
 *          type: object
 *          required:
 *              - answerId
 *          properties:
 *              asnwerId:
 *                  example: 1
 *                  type: integer
 */

/**
 * @swagger
 * /quiz/entries:
 *      post:
 *          tags:
 *              - Quiz
 *          summary: to inputt the answer and corretion
 *          security:
 *              - ApiKeyAuth: []
 *          requestBody:
 *              content:
 *                 'application/json':
 *                      schema:
 *                          properties:
 *                              answerId:
 *                                  example: 1
 *                                  type: integer
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
router.route("/entries").post(quiz.quizCorrection);

export = router;
