const express = require("express");
const {
  homepages,
  studentsignup,
  studentsignIn,
  studentsignOut,
  currentStudent,
} = require("../controllers/student");
const { isAuthenticated } = require("../middlewares/Auth");
const router = express.Router();

// Get /
router.get("/", homepages);

// Post/ loginUser dets
router.post("/student", isAuthenticated, currentStudent);

// Post/ student/signup
router.post("/student/signup", studentsignup);

//  Post /student/signIn
router.post("/student/signIn", studentsignIn);

//  Get /student/signOut

router.get("/student/signOut", isAuthenticated, studentsignOut);

module.exports = router;
