const express = require('express');
const cors = require('cors');

require('dotenv').config();

require('./config/dbconfig');

const swaggerSetup = require('./swagger');

const app = express();

const authRoute = require('./routes/auth-routes');
const productRoute = require('./routes/product-roures');

app.use(cors());
app.use(express.json());

app.use('/uploads',express.static('uploads'));
app.use('/auth',authRoute);
app.use('/product',productRoute);

swaggerSetup(app);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`app running on PORT:${port}`);
    console.log(`Api Doc available at http://localhost:${port}/api-docs`);
});