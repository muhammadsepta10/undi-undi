import * as express from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as routes from './routes';

// create express server
const app: any = express();
const port = process.env.PORT || 5000;

// express configuration
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use('/', routes);

// Make sure server is running
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;