const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor de Desarrollo'
            }
        ]
    },
    apis: ['./src/routes/*.js'] // Asegúrate de que esta ruta sea correcta
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

function setup(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

module.exports = { setup };
