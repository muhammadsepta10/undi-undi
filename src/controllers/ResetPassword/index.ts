import * as express from "express";
import * as reset from "./resetPassword";
import { auth } from "../../verifyToken";

let router = express.Router();

/** 
 * @swagger
 * 
 * components:
 *  schemas:
 *      Validate Email:
 *          type: object
 *          required:
 *              - email
 *          properties:
 *              email: 
 *                  example: varchar
 *                  type: varchar
 * 
 *      Reset Password Email:
 *          type: object
 *          required:
 *              - email
 *              - newPassword
 *              - confirmPassword
 *          properties:
 *              email: 
 *                  example: varchar
 *                  type: varchar
 *              password: 
 *                  example : varchar
 *                  type: varchar              
 *              
 *      Reset Password Profiles:
 *          type: object
 *          required:
 *              - email
 *              - oldPassword
 *              - newPassword
 *          properties:
 *              email: 
 *                  example: varchar
 *                  type: varchar
 *              oldPassword: 
 *                  example : varchar
 *                  type: varchar
 *              newPassword: 
 *                  example : varchar
 *                  type: varchar              
 *              
*/

/**
 * @swagger
 * /reset/validateEmail:
 *      post:
 *          tags:
 *              - Reset Password
 *          summary: Validate Email
 *          produces:
 *              - application/json
 *          requestBody:
 *              description: Validate Email
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Validate Email'
 *          responses:
 *             200:
 *                  description: Email Registered
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: "E-mail Valid"
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
 *                                      example: "E-mail is not registered"
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: varchar 
 *                                  data: 
 *                                      type: object
 */
router.route('/validateEmail').post(reset.validateEmail);

/**
 * @swagger
 * /reset/password/email:
 *      post:
 *          tags:
 *              - Reset Password
 *          summary: Reset Password
 *          produces:
 *              - application/json
 *          requestBody:
 *              description: Reset Password
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reset Password Email'
 *          responses:
 *             200:
 *                  description: Update Password Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: "Update Password Success"
 *                                  success:
 *                                      example: 1
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: varchar 
 *                                  data: 
 *                                      type: object
 *             400: 
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message: 
 *                                      example: "Update Password Failed"
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 400
 *                                      type: varchar 
 *                                  data: 
 *                                      type: object
 *             422: 
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message: 
 *                                      example: "Email is not registered"
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: varchar 
 *                                  data: 
 *                                      type: object
 */
router.route('/password/email').post(reset.resetPasswordEmail);

/**
 * @swagger
 * /reset/password/profiles:
 *      post:
 *          tags:
 *              - Reset Password
 *          summary: Reset Password
 *          produces:
 *              - application/json
 *          security:
 *              - ApiKeyAuth: []
 *          requestBody:
 *              description: Change Password
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reset Password Profiles'
 *          responses:
 *             200:
 *                  description: Update Password Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example: "Update Password Success"
 *                                  success:
 *                                      example: 1
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: varchar 
 *                                  data: 
 *                                      type: object
 *             400: 
 *                  description: Invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message: 
 *                                      example: "Update Password Failed"
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 400
 *                                      type: varchar 
 *                                  data: 
 *                                      type: object
 *             422: 
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message: 
 *                                      example: "Email is not registered"
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: varchar 
 *                                  data: 
 *                                      type: object
 */
router.route('/password/profiles').post(auth, reset.resetPasswordProfiles);

export = router;