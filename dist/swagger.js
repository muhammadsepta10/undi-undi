"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJsDoc = require('swagger-jsdoc');
const options = {
    apis: ['**/*.ts'],
    basePath: '/',
    swaggerDefinition: {
        openapi: "3.0.2",
        info: {
            description: 'UNDI UNDI API',
            swagger: '2.0',
            title: 'Documentation API RedBox',
            version: '1.0.0',
            contact: {
                name: "Developer",
                email: "@missiidea.com"
            },
            license: {
                name: "Apache 2.0",
                url: "https://www.apache.org/licenses/LICENSE-2.0.html"
            }
        },
        // servers: [{
        //     url: 'https://beta-api.undiundi.id',
        //     description: 'The production API server',
        //     variables: {
        //         port: {
        //             enum: [
        //                 "https"
        //             ],
        //             default: "https"
        //         }
        //     }
        //     }],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "auth-token"
                }
            }
        }
    },
};
const specs = swaggerJsDoc(options);
exports.default = specs;
