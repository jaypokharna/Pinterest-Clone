const multer = require("multer");
const {v4:uuidv4} = require("uuid");
const path = require("path");

// Multer for storing post images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')//destination folder for uploads
    },
    filename: function (req, file, cb) {

      const uniqueFileName = uuidv4();// generating a unique filename using UUID
      cb(null, uniqueFileName+path.extname(file.originalname));// use the unique filename for the uploaded file
    }
  })
  
  const upload = multer({ storage: storage });

//   taken from multer js npm website , disk storage part

// Multer for storing profile images

module.exports= upload;