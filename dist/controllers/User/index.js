"use strict";
const express = require("express");
const user = require("./user");
let router = express.Router();
/**
 * @swagger
 *
 * definitions:
 *  User:
 *      type: object
 *      properties:
 *          handphone:
 *              example: 0
 *              type: varchar
 *          accountname:
 *              example: varchar
 *              type: varchar
 */
/**
 * @swagger
 * /user:
 *      get:
 *          tags:
 *              - User
 *          summary: Get all user
 *          consumes:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *                  content:
 *                      - application/json
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              example:
 *                                  Get Data Success
 *                          success:
 *                              example: 1
 *                              type: boolean
 *                          status:
 *                              example: 200
 *                              type: varchar
 *                          data:
 *                              type: object
 *             422:
 *                  description: Invalid
 *                  content:
 *                      - application/json
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              example:
 *                                  Get Data Failed
 *                          success:
 *                              example: 0
 *                              type: boolean
 *                          status:
 *                              example: 422
 *                              type: varchar
 *                          data:
 *                              type: object
 */
router.route("").get(user.getAllUser);
/**
 * @swagger
 * /user/{id}:
 *      get:
 *          tags:
 *              - User
 *          summary: Get user by id
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *          consumes:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *                  content:
 *                      - application/json
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              example:
 *                                  Get Data Success
 *                          success:
 *                              example: 1
 *                              type: boolean
 *                          status:
 *                              example: 200
 *                              type: varchar
 *                          data:
 *                              type: object
 *             422:
 *                  description: Invalid
 *                  content:
 *                      - application/json
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              example:
 *                                  Get Data Failed
 *                          success:
 *                              example: 0
 *                              type: boolean
 *                          status:
 *                              example: 422
 *                              type: varchar
 *                          data:
 *                              type: object
 */
router.route("/:id").get(user.getUserById);
module.exports = router;
