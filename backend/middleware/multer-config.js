const multer = require("multer");

//Supported file types for sauce images
const MIME_TYPES = {
   "image/jpg": "jpg",
   "image/jpeg": "jpg",
   "image/png": "png",
};

//Multer configuration
const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, "images");
   },
   filename: (req, file, callback) => {
      const name = file.originalname.split(" ").join("_");
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + "." + extension);
   },
});

//Exporting the Module
module.exports = multer({ storage: storage }).single("image");
