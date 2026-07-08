const express = require("express");

const router = express.Router();


const {
    textSearch
} = require("../controllers/search.controller.js");


router.post(
    "/search/text",
    textSearch
);


module.exports = router;