import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as routes from './routes';
const winston = require('./winston');
const morgan = require('morgan');

// create express server
const app: any = express();
const port = process.env.PORT || 5001;

//logger
app.use(morgan('combined', {stream: winston.stream }));

//error log
app.use(function(err: any, req: any, res: any, next: any) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(err.status || 500);
  res.send('error')
});

// express configuration
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

// Make sure server is running
app.listen(port, () => {
    console.log(`Server running at http://192.168.1.62:${port}`);
});

module.exports = app;