const express = require("express");
const { homepages, studentsignup } = require("../controllers/student");
const router = express.Router();


// Get /
router.get("/", homepages);

// Post/ student/signup
router.post("/student/signup", studentsignup);

module.exports = router