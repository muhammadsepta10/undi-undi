import * as express from "express";
import * as tukarpoint from "./prize_claim";

let router = express.Router();

/**
 * @swagger
 *
 * definitions:
 *  tukarpopint:
 *      type: object
 *      required:
 *          - entries_id
 *          - profile_id
 *          - claim_date
 *          - status
 *          - prizes_id
 *
 *      properties:
 *          entries_id:
 *              example: 0
 *              type: integer
 *          profile_id:
 *              example: 0
 *              type: integer
 *          claim_date:
 *              example: date
 *              type: date
 *          status:
 *              example: 0
 *              type: integer
 *          prizes_id:
 *              example: 0
 *              type: integer
 *
 */


/**
 * @swagger
 * /prizes_list/{id}:
 *      get:
 *          tags:
 *              - Prizes_claim
 *          summary: List Prizes Tukar Point
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *          consumes:
 *              - application/json
 *          responses:
 *              200:
 *                  description: Receive data Prizes
 */
router.route("/:id").get(tukarpoint.getAllPrize);


export = router;
