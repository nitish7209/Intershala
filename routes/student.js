const express = require("express");
const { homepages, studentsignup, studentsignIn } = require("../controllers/student");
const router = express.Router();


// Get /
router.get("/", homepages);

// Post/ student/signup
router.post("/student/signup", studentsignup);

//  Post /student/signIn
router.post("/student/signIn", studentsignIn);


//  Post /student/signOut
// router.get("/student/signOut", studentsignOut);

module.exports = router