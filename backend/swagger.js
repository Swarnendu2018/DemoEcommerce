const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



//swagger Defination

const swaggerDefinition = {
    openapi: '3.0.0',
    info:{
        title: 'Nodejs Rest Api with Mongodb',
        version: '1.0.0',
        description: 'This is a rest api application made with Express and Mongodb, Document with Swagger'
    },
    servers:[{
        url: 'http://localhost:3000'
    }]
};

//options for swagger Docs

const options = {
    swaggerDefinition,
    apis:['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
    app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
}