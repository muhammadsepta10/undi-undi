import * as express from "express";
import * as entries from "./entries";
import * as multer from "multer";
import * as path from "path";
import * as TOKEN_SECRET from "../../middleware";
import { request } from "http";
const jwt = require("jsonwebtoken");

//set storage engine
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "../public/coupon");
  },
  filename: function(req: any, file: any, cb: any) {
    const files: string = file.originalname;
    cb(null, "coupon" + Date.now() + file.originalname);
  }
});

//check file type
function checkFileType(file: any, cb: any) {
  const filetypes = /jpg|jpeg|png|gif|bmp/; //alowed ext

  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  //check mime
  const mimetype = filetypes.test(file.mimetype);

  //check if ext is true
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("error : Images Only");
  }
}

//init upload
const upload: any = multer({
  storage: storage, //get from variable name at storage engine
  limits: { fileSize: 20 * 1024 * 1024 }, //ex : limit 20MB
  fileFilter: function(req: any, file: any, cb: any) {
    checkFileType(file, cb);
  }
});

let router = express.Router();

/**
 * @swagger
 *
 * components:
 *  schemas:
 *      Entries:
 *          type: object
 *          required:
 *              - sender
 *              - media
 *              - coupon
 *              - entry_type
 *          properties:
 *              sender:
 *                  example: 12345678qwert
 *                  type: varchar
 *              media:
 *                  example: APP
 *                  type: varchar
 *              coupon:
 *                  example: 123abcd
 *                  type: varchar
 *              entry_type:
 *                  example: 1
 *                  type: integer
 *              photo:
 *                  example: coupon.jpg
 *                  type: file
 *
 */

/**
 * @swagger
 * /entries:
 *      post:
 *          tags:
 *              - Entries
 *          summary: validasi coupon (photo menggunakan form type file)
 *          security:
 *              - ApiKeyAuth: []
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          properties:
 *                              sender:
 *                                  type: string
 *                              media:
 *                                  type: string
 *                              coupon:
 *                                  type: string
 *                              photo:
 *                                  type: string
 *                                  format: binary
 *
 *          responses:
 *             200:
 *                  description: Success Validation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      example:
 *                                          "success to validation coupoon thanks"
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
 *                                      example:
 *                                          "your coupon is alredy to use"
 *                                  success:
 *                                      example: 0
 *                                      type: boolean
 *                                  status:
 *                                      example: 200
 *                                      type: varchar
 *                                  data:
 *                                      type: object
 */
router.route("").post(upload.single("photo"), entries.postCoupon);

export = router;
