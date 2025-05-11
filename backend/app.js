const express = require('express');

require('dotenv').config();

const app = express();

const port = 3000;

app.listen(port,()=>{
    console.log(`app running on PORT:${port}`);
})