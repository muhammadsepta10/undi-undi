"use strict";
const express = require("express");
const survey = require("./survey");
let router = express.Router();
// /**
//  * @swagger
//  * /survey/surveyAvailable:
//  *      get:
//  *          tags:
//  *              - Survey
//  *          summary: to check availability survey and user alredy answered
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
router.route("/surveyAvailable").get(survey.checkUserAnswered);
/**
 * @swagger
 * /survey/questions:
 *      get:
 *          tags:
 *              - Survey
 *          summary: to get srvey questions
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
router.route("/questions").get(survey.surveyQuestions);
/**
 * @swagger
 * /survey/answer/{questionsId}:
 *      get:
 *          tags:
 *              - Survey
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
router.route("/answer/:questionsId").get(survey.surveyAnswer);
/**
 * @swagger
 *
 * components:
 *  schemas:
 *      survey:
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
 * /survey/entries:
 *      post:
 *          tags:
 *              - Survey
 *          summary: to input the answer
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
router.route("/entries").post(survey.surveyEntries);
/**
 * @swagger
 *
 * components:
 *  schemas:
 *      Survey:
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
 * /survey/userOrder:
 *      get:
 *          tags:
 *              - Survey
 *          summary: to get sequence of users answering surveys and prizes that will be obtained
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
 *
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
router.route("/userOrder").get(survey.userOrder);
module.exports = router;
