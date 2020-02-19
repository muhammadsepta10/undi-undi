import * as express from "express";
import * as register from "./register";

let router = express.Router();

/** 
 * @swagger
 * 
 * components:
 *  schemas:
 *      Registration:
 *          type: object
 *          required:
 *              - id
 *              - email
 *              - handphone
 *              - identity
 *          properties:
 *              email: 
 *                  example: varchar
 *                  type: varchar
 *              handphone: 
 *                  example: "0"
 *                  type: varchar 
 *              identity: 
 *                  example: "0"
 *                  type: varchar
 *              accountname: 
 *                  example: varchar
 *                  type: varchar
 *              fullname: 
 *                  example: string
 *                  type: varchar
 *              password: 
 *                  example: varchar
 *                  type: varchar
 *              address: 
 *                  example: varchar
 *                  type: varchar
 *              city: 
 *                  example: string
 *                  type: varchar     
 *              language:
 *                  example: en
 *                  type: string    
 *              
*/

/**
 * @swagger
 * /registration:
 *      post:
 *          tags:
 *              - Auth
 *          summary: Create a new profile
 *          produces:
 *              - application/json
 *          requestBody:
 *              description: Insert a new profile
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Registration'
 *          responses:
 *             201:
 *                  description: Register Succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      example: varchar
 *                                      type: varchar
 *                                  message:
 *                                      example: "Registration Success"
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
 *                                      example: "Registration Failed"
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: varchar 
 *                                  data: 
 *                                      type: object
 */
router.route('').post(register.postRegistration);

export = router;
