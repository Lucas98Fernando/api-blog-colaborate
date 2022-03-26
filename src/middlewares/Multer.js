const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (request, file, cb) => cb(null, "uploads"),
  filename: (request, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (request, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) return cb(null, true);
    cb("Informe uma imagem com a extensão .jpeg, .jpg ou .png");
  },
}).single("image");

module.exports = { upload };
