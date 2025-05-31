const express = require('express');

require('dotenv').config();

require('./config/dbconfig');

const app = express();

const port = process.env.PORT;

const authRoute = require('./routes/auth-routes');

app.use(express.json());

app.use('/auth',authRoute);

app.listen(port,()=>{
    console.log(`app running on PORT:${port}`);
})