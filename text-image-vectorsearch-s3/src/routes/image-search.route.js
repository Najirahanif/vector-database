const express = require("express");

const router = express.Router();


const {
  imageSearch
} = require("../controllers/image-search.controller.js");
const upload = require("../middleware/multer.js");


router.post(
  "/search/image",
  upload.single("file"),
  imageSearch
);


module.exports = router;