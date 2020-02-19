import * as express from "express";
import * as languages from "./languages";

let router = express.Router();

/**
 * @swagger
 * /languages:
 *      get:
 *          tags:
 *              - language
 *          summary: get all data languages
 *          produces:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *             400:
 *                  description: Invalid
 */
router.route("").get(languages.indexLanguages);

router.route("/:id").get(languages.showLanguages);

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
//  *          summary: input new languages
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
//  *                  description: Succesfull
//  *             400:
//  *                  description: Invalid
//  */
router.route("/input").post(languages.postLanguages);

router.route("/edit/:id").put(languages.putLanguages);

router.route("/destroy/:id").delete(languages.deleteLanguages);

export = router;
