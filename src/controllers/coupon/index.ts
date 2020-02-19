import * as express from "express";
import * as coupon from "./coupon";

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

// /**
//  * @swagger
//  *
//  * definitions:
//  *  create language:
//  *      type: object
//  *      required:
//  *          - language
//  *          - code
//  *      properties:
//  *          language:
//  *              example: german
//  *              type: varchar
//  *          code:
//  *              example: ger
//  *              type: varchar
//  */

// /**
//  * @swagger
//  * /languages/input:
//  *      post:
//  *          tags:
//  *              - language
//  *          summary: input
//  *          produces:
//  *              - application/json
//  *          parameters:
//  *              - name: body
//  *                in: body
//  *                description: input
//  *                required: true
//  *                type: string
//  *                schema:
//  *                  $ref: '#/definitions/create language'
//  *          responses:
//  *             200:
//  *                  description: Succesful
//  *             400:
//  *                  description: Invalid
//  */

export = router;
