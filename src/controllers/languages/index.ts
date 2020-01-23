import * as express from "express";
import * as language from "./language";

let router = express.Router();

/** 
 * @swagger
 * 
 * definitions:
 *  Language:
 *      type: object
 *      required:
 *          - id
 *          - name
 *      properties:
 *          name:
 *              type: string
 *              example: Bahasa Indonesia
 *              
*/

/**
 * @swagger
 * /languages:
 *      get:
 *          tags:
 *              - Languages
 *          summary: Get all language
 *          consumes:
 *              - application/json
 *          responses:
 *              200:
 *                  description: Receive data language
 */

router.route('').get(language.getAllLanguage);

/**
 * @swagger
 * /languages/{id}:
 *      get:
 *          tags:
 *              - Languages
 *          summary: Get language by id
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
 *                  description: Receive data language
 */
router.route('/:id').get(language.getLanguageById);

/**
 * @swagger
 * /languages:
 *      post:
 *          tags:
 *              - Languages
 *          summary: Create a new language
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: body
 *                in: body
 *                description: Insert a new language
 *                required: true
 *                type: string
 *                schema:
 *                  $ref: '#/definitions/Language'
 *          responses:
 *             201:
 *                  description: Created
 */
router.route('').post(language.postLanguage);


/**
 * @swagger
 * /languages/update/{id}:
 *      put:
 *          tags:
 *              - Languages
 *          summary: Update a language
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: body
 *                in: body
 *                description: Insert a new language
 *                required: true
 *                type: string
 *                schema:
 *                  $ref: '#/definitions/Language'
 *          responses:
 *             201:
 *                  description: Updated
 */
router.route('/update/:id').put(language.updateLanguage);


/**
 * @swagger
 * /languages/delete/{id}:
 *      delete:
 *          tags:
 *              - Languages
 *          summary: Delete a language
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: body
 *                in: body
 *                description: Insert a new language
 *                required: true
 *                type: string
 *                schema:
 *                  $ref: '#/definitions/Language'
 *          responses:
 *             201:
 *                  description: Deleted
 */
router.route('/delete/:id').delete(language.deleteLanguage);

export = router;
