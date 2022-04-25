// Setup multer
const multer = require("multer");

// Types of storage
const picStorage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}${file.originalname}`
    );
  },
});

const productStorage = multer.diskStorage({
  destination: "public/product_uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}${file.originalname}`
    );
  },
});

// Export upload
module.exports = {
  picUpload: multer({ storage: picStorage }),
  productUpload: multer({ storage: productStorage }),
};
