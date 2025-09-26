const express = require('express');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yaml");

require('dotenv').config();

require('./config/dbconfig');

// const swaggerSetup = require('./swagger');

const app = express();

const authRoute = require('./routes/auth-routes');
const productRoute = require('./routes/product-routes');
const addressRoute = require('./routes/address-routes');

app.use(cors());
app.use(express.json());

// app.use('/',(req,res)=>{
//     res.json({message:"Server running"});
// });

app.use('/health',(req,res)=>{
    res.json({message:"Everything running perfectly "});
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/uploads',express.static('uploads'));
app.use('/auth',authRoute);
app.use('/product',productRoute);
app.use('/address',addressRoute);

// swaggerSetup(app);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`app running on PORT:${port}`);
    console.log(`Api Doc available at http://localhost:${port}/api-docs`);
});