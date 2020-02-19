"use strict";
const express = require("express");
const coupon = require("./coupon");
let router = express.Router();
// /**
//  * @swagger
//  * /languages:
//  *      get:
//  *          tags:
//  *              - language
//  *          summary: index
//  *          produces:
//  *              - application/json
//  *          responses:
//  *             200:
//  *                  description: Succesful
//  *             400:
//  *                  description: Invalid
//  */
router.route("/bulkInsert").post(coupon.bulkInsert);
module.exports = router;
