"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
// const winston = require("./winston");
const morgan = require("morgan");
const appRoot = require("app-root-path");
// const winston = require('winston')
// create express server
const app = express();
const port = process.env.PORT || 5001;
//logger
// app.use(morgan("combined", { stream: winston.stream }));
// body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
//static
app.use(express.static(`${appRoot}/../public`));
//error log
// app.use(function(err: any, req: any, res: any, next: any) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//   console.log(err.message);
//   winston.error(
//     `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
//       req.method
//     } - ${req.ip}`
//   );
//   res.status(err.status || 500);
//   res.send("error");
// });
// express configuration
app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);
// Make sure server is running
app.listen(port, () => {
    console.log(`Server running at http://192.168.1.62:${port}`);
});
module.exports = app;
