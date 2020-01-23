import * as express from 'express';
const swaggerUi = require('swagger-ui-express');
import * as specs from './swagger';

//import sub-routers
import * as languageRouter from './controllers/languages';

let router = express.Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs.default));

router.get('/', (req, res) => res.send('Welcome to API UNDI-UNDI'));

//Router Language
router.use('/languages', languageRouter);

module.exports = router;