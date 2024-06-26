const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Reto Técnico Coordinadora: Plataforma de Gestión de Eventos API',
            version: '0.0.1',
            description: 'Una API para crear, promocionar y gestionar eventos',
            contact: {
                name: 'Fabian Callejas',
                email: 'fabiancallejas@gmail.com'
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor de Desarrollo'
            }
        ],
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8'));

function setup(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = { setup };
