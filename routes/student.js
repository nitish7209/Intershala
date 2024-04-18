const express = require("express");
const { homepages } = require("../controllers/student");
const router = express.Router();


// Get /
router.get("/", homepages);

module.exports = router