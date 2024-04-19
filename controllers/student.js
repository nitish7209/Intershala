const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const ErorrHandler = require("../utlis/ErrorHandler");

exports.homepages = catchAsyncError(async (req, res, next) => {
  res.json({ message: "Homepage" });
});

exports.studentsignup = catchAsyncError(async (req, res, next) => {
  const newstudent = await new studentModel(req.body).save();
  res.status(201).json(newstudent);
});

exports.studentsignIn = catchAsyncError(async (req, res, next) => {
  const student = await studentModel
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!student)
    return next(new ErorrHandler("User Not Found With This Email Address!"));

  const isMatchPasswaord = student.comparepassword(req.body.password);

  if (!isMatchPasswaord) return next(new ErorrHandler("Worng Password"), 500);

  res.json(student);
});
