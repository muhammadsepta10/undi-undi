import * as express from "express";
import * as register from "./register";

let router = express.Router();

/** 
 * @swagger
 * 
 * definitions:
 *  Registration:
 *      type: object
 *      required:
 *          - id
 *          - email
 *          - handphone
 *          - identity
 *      properties:
 *          id: 
 *              example: 0
 *              type: integer
 *          email: 
 *              example: email@email.com
 *              type: varchar
 *          handphone: 
 *              example: 02134049
 *              type: varchar 
 *          identity: 
 *              example: 317103843729
 *              type: varchar
 *          accountname: 
 *              example: string
 *              type: varchar
 *          fullname: 
 *              example: string
 *              type: varchar
 *          password: 
 *              example: user1234
 *              type: varchar
 *          address: 
 *              example: Jln. Mesjid 4, Pejompongan, Jakarta Pusat
 *              type: varchar
 *          city: 
 *              example: Jakarta
 *              type: varchar
 *              
*/

/**
 * @swagger
 * /registration:
 *      post:
 *          tags:
 *              - Registration
 *          summary: Create a new profile
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: body
 *                in: body
 *                description: Insert a new profile
 *                required: true
 *                type: string
 *                schema:
 *                  $ref: '#/definitions/Registration'
 *          responses:
 *             200:
 *                  description: Succesful
 *             400: 
 *                  description: Invalid
 */
router.route('').post(register.postRegistration);

export = router;
