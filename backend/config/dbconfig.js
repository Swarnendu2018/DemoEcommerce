const mongoose = require('mongoose');

mongoose.connect(process.env.mongodbStringUrl).then(()=>{
    console.log('Mongodb Connected');
}).catch(err=>{
    console.log(err);
});

module.exports = mongoose;