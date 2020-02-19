"use strict";
const express = require("express");
const user = require("./profiles");
let router = express.Router();
/**
 * @swagger
 *
 * components:
 *  schemas:
 *      Profiles:
 *          type: object
 *          properties:
 *              handphone:
 *                  example: 0
 *                  type: varchar
 *              accountname:
 *                  example: varchar
 *                  type: varchar
 */
/**
 * @swagger
 * /profiles/id:
 *      get:
 *          tags:
 *              - Profiles
 *          summary: Get user by id
 *          security:
 *              - ApiKeyAuth: []
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
router.route("/id").get(user.getUserById);
/**
 * @swagger
 * /profiles/update/{params}:
 *      put:
 *          tags:
 *              - Profiles
 *          summary: Update Profiles
 *          security:
 *              - ApiKeyAuth: []
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: params
 *                schema:
 *                  type: string
 *                required: true
 *                description: list params (important) = fullname, email, handphone, password, identity,
 *                             address, city, zipcode, province, language
 *          requestBody:
 *              description: Update Profile
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              value:
 *                                  example: kimad@mail.com
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
 *                                          Update Success
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
 *                                          Update Failed
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 */
router.route("/update/:params").put(user.updateProfiles);
module.exports = router;
