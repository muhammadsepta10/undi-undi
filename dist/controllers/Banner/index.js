"use strict";
const express = require("express");
const Banner = require("./Banner");
let router = express.Router();
/**
 * @swagger
 *
 * components:
 *  schemas:
 *      Banner:
 *          type: object
 *          required:
 *              - id
 *              - date
 *              - picture
 *          properties:
 *              id:
 *                  example: 0
 *                  type: integer
 *              date:
 *                  example: 29 january 2020
 *                  type: date
 *              picture:
 *                  example: "url:"
 *                  type: varchar
 *
 */
/**
 * @swagger
 * /Banner:
 *      get:
 *          tags:
 *              - Banner
 *          summary: get banner program
 *          security:
 *              - ApiKeyAuth: []
 *          produces:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *             400:
 *                  description: Invalid
 */
router.route("").get(Banner.getBanner);
module.exports = router;
