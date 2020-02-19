import * as express from "express";
import * as version from "./version";

let router = express.Router();

/**
 * @swagger
 * /versions:
 *      get:
 *          tags:
 *              - version
 *          summary: get all data versions
 *          produces:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example:
 *                                          Get Data Success
 *                                  success:
 *                                      example: 1
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: string
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
 *                                      example:
 *                                          Get Data Failed
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: string
 *                                  data:
 *                                      type: object
 */
router.route("").get(version.indexVersion);

/**
 * @swagger
 * /versions/{platform}:
 *      get:
 *          tags:
 *              - version
 *          summary: get version by platform up to date
 *          parameters:
 *              - in: path
 *                name: platform
 *                schema:
 *                  type: string
 *                required: true
 *          consumes:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example:
 *                                          Get Data Success
 *                                  success:
 *                                      example: 1
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: string
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
 *                                      example:
 *                                          Get Data Failed
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: string
 *                                  data:
 *                                      type: object
 */
router.route("/:platform").get(version.showVersion);

/**
 * @swagger
 * /versions/update/{platform}/{version}:
 *      get:
 *          tags:
 *              - version
 *          summary: check update version by platform
 *          parameters:
 *              - in: path
 *                name: platform
 *                schema:
 *                  type: string
 *                required: true
 *              - in: path
 *                name: version
 *                schema:
 *                  type: string
 *                required: true
 *          consumes:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example:
 *                                          Get Data Success
 *                                  success:
 *                                      example: 1
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: string
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
 *                                      example:
 *                                          Get Data Failed
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: string
 *                                  data:
 *                                      type: object
 */
router.route("/update/:platform/:version").get(version.showUpdateVersion);

/**
 * @swagger
 *
 * components:
 *  schemas:
 *      input version:
 *          type: object
 *          required:
 *              - platform
 *              - version
 *              - changes
 *          properties:
 *              platform:
 *                  example: android
 *                  type: string
 *              version:
 *                  example: 2.13
 *                  type: string
 *              changes:
 *                  example: fixed bug
 *                  type: string
 */

/**
 * @swagger
 * /versions/input:
 *      post:
 *          tags:
 *              - version
 *          summary: input new version
 *          requestBody:
 *              content:
 *                 'application/json':
 *                      schema:
 *                          properties:
 *                              platform:
 *                                  example: android
 *                                  type: string
 *                              version:
 *                                  example: 2.13
 *                                  type: string
 *                              changes:
 *                                  example: fixed bug
 *                                  type: string
 *
 *          responses:
 *             200:
 *                  description: Succesful
 *             400:
 *                  description: Invalid
 */
router.route("/input").post(version.postVersion);

/**
 * @swagger
 * /versions/byId/{id}:
 *      get:
 *          tags:
 *              - version
 *          summary: get version by id
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                required: true
 *          consumes:
 *              - application/json
 *          responses:
 *             200:
 *                  description: Succesful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example:
 *                                          Get Data Success
 *                                  success:
 *                                      example: 1
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: string
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
 *                                      example:
 *                                          Get Data Failed
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 422
 *                                      type: string
 *                                  data:
 *                                      type: object
 */
router.route("/byId/:id").get(version.showVersionById);

//tidak terpakai
router.route("/edit/:id").put(version.putVersion);

router.route("/destroy/:id").delete(version.deleteVersion);

router.route("/platform/:platform").get(version.showVersionByPlatform);
export = router;
