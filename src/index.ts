import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as routes from './routes';
import { stream } from './winston'
const morgan = require('morgan')

// create express server
const app: any = express();
const port = process.env.PORT || 5000;

app.use(morgan('combined', { stream }));

// express configuration
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

// Make sure server is running
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;