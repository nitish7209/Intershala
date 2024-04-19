const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const student = require("../models/studentModel");

exports.homepages = catchAsyncError(async (req, res, next) => {
  res.json({ message: "Homepage" });
});

exports.studentsignup = catchAsyncError(async (req, res, next) => {
  const newstudent = await new student(req.body).save();
  res.status(201).json(newstudent);
});
