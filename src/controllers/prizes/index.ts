import * as express from "express";
import * as prize from "./prize";

const router = express.Router();

/**
 * @swagger
 *
 * components:
 *  schemas:
 *      Prize_Category:
 *          type: object
 *          properties:
 *              category:
 *                  example: RAFFLE
 *                  type: varchar
 */

/**
 * @swagger
 * /prize/categories:
 *      get:
 *          tags:
 *              - Prize
 *          summary: get prize category
 *          security:
 *              - ApiKeyAuth: []
 *          consumes:
 *              - aplication/json
 *          responses:
 *             200:
 *                  description: Succesful
 *             400:
 *                  description: Invalid
 */
router.route("/categories").get(prize.category);
/**
 * @swagger
 *
 * components:
 *  schemas:
 *      Prize_Category:
 *          type: object
 *          properties:
 *              periode:
 *                  example: RAFFLE
 *                  type: varchar
 */

/**
 * @swagger
 * /prize/periodes/{category}:
 *      get:
 *          tags:
 *              - Prize
 *          summary: get all periode prize per category
 *          security:
 *              - ApiKeyAuth: []
 *          parameters:
 *              - in: path
 *                name: category
 *                schema:
 *                  type: integer
 *                required: true
 *          consumes:
 *              - aplication/json
 *          responses:
 *             200:
 *                  description: Succesful
 *             400:
 *                  description: Invalid
 */
router.route("/periodes/:category").get(prize.periodIndex);

/**
 * @swagger
 *
 * components:
 *  schemas:
 *      Current_period:
 *          type: object
 *          properties:
 *              periode:
 *                  example: RAFFLE
 *                  type: varchar
 */

/**
 * @swagger
 * /prize/periode/active/{category}:
 *      get:
 *          tags:
 *              - Prize
 *          summary: get one current periode per category
 *          security:
 *              - ApiKeyAuth: []
 *          parameters:
 *              - in: path
 *                name: category
 *                schema:
 *                  type: integer
 *                required: true
 *          consumes:
 *              - aplication/json
 *          responses:
 *             200:
 *                  description: Succesful
 *             400:
 *                  description: Invalid
 */
router.route("/periode/active/:category").get(prize.activePeriode);

/**
 * @swagger
 * /prize/{periode_id}:
 *      get:
 *          tags:
 *              - Prize
 *          summary: Get prize where periode and category
 *          security:
 *              - ApiKeyAuth: []
 *          parameters:
 *              - in: path
 *                name: periode_id
 *                schema:
 *                  type: integer
 *                required: true
 *          consumes:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *             400:
 *                  description: Invalid
 */
router.route("/:periode_id").get(prize.prizesIndex);

router.route("/input").post(prize.inputPeriode);

export = router;
