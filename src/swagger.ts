const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    apis: ['**/*.ts'],
    basePath: '/',
    swaggerDefinition: {
        info: {
            description: 'UNDI UNDI API',
            swagger: '2.0',
            title: 'Documentation API',
            version: '1.0.0'
        }
    }
};

const specs = swaggerJsDoc(options);
export default specs;