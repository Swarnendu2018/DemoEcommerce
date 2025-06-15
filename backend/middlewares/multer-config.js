const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/'); //folder where image will store
    },
    filename: function(req,file,cb){
        const uniqueSufix = Date.now() + '-' + Math.round(Math.random()*1E9);
        cb(null,uniqueSufix+path.extname(file.originalname)); //eg: 1608241234.png
    }
});

// File Filter to accept image files only

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if(extname && mimetype){
        cb(null, true)
    }else{
        cb(new Error('Only Image files are allowed(jpeg, jpg, png, webp)'));
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize : 5*1024*1024} //limit file size to 5MB
})

module.exports = upload;