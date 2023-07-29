require('dotenv').config()
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: process.env.PATH_FILES,
  filename: (req, file, cb) => {
    // cb(null, `bill${path.extname(file.originalname)}`);
    cb(null, `${file.originalname}`);
  },
})

const upload = multer({storage: storage})

module.exports = upload;
