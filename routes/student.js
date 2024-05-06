const express = require("express");
const {
  homepages,
  studentsignup,
  studentsignIn,
  studentsignOut,
  currentStudent,
  studentsendmail,
  studentUpdate,
  studentAvatar,
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

//  Post /student/update

router.post("/student/update/:id", isAuthenticated, studentUpdate);

//  Post /student/avatar

router.post("/student/avatar/:id", isAuthenticated, studentAvatar);

//  Get /student/signOut

router.get("/student/signOut", isAuthenticated, studentsignOut);

//  Get /student/send-mail

router.post("/student/send-mail", studentsendmail);

module.exports = router;
