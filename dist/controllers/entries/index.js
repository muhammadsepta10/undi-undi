"use strict";
const express = require("express");
const entries = require("./entries");
let router = express.Router();
/**
 * @swagger
 *
 * components:
 *  schemas:
 *      Entries:
 *          type: object
 *          required:
 *              - sender
 *              - media
 *              - coupon
 *              - entry_type
 *          properties:
 *              sender:
 *                  example: 12345678qwert
 *                  type: varchar
 *              media:
 *                  example: APP
 *                  type: varchar
 *              coupon:
 *                  example: 123abcd
 *                  type: varchar
 *              entry_type:
 *                  example: 1
 *                  type: integer
 *              photo:
 *                  example: coupon.jpg
 *                  type: file
 *
 */
/**
 * @swagger
 * /entries:
 *      post:
 *          tags:
 *              - Entries
 *          summary: validasi coupon
 *          security:
 *              - ApiKeyAuth: []
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          properties:
 *                              sender:
 *                                  example: 12345678qwert
 *                                  type: varchar
 *                              media:
 *                                  example: APP
 *                                  type: varchar
 *                              coupon:
 *                                  example: 123abcd
 *                                  type: varchar
 *                              photo:
 *                                  type: string
 *                                  format: base64
 *
 *          responses:
 *             200:
 *                  description: Success Validation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example:
 *                                          "success to validation coupoon thanks"
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
 *                                          "your coupon is alredy to use"
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 */
router.route("").post(entries.postCoupon);
module.exports = router;
