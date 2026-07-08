const express = require("express");

const router = express.Router();

const {
  uploadImage
} = require("../controllers/upload.controller");
const upload = require("../middleware/multer");


router.post(
  "/upload",
  upload.single("file"),
  uploadImage
);


module.exports = router;