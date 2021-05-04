//import multer to upload files (need to be install before --> npm install --save multer)
const multer = require("multer");

//dictionnary wich is object with 3 differents possibility
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
//create configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //need to name file (if not --> twoo can get the same name)
  filename: (req, file, callback) => {
    //generate name from original name + split to remove spaces an join with underscore instead
    const name = file.originalname.split(" ").join("_");
    //need to apply extension with mimetype (see const MIME_TYPE up)
    const extension = MIME_TYPES[file.mimetype];
    //
    callback(null, name + Date.now() + "." + extension);
  },
});
//export ethod multer file with unique image (method single)
module.exports = multer({ storage: storage }).single("image");
