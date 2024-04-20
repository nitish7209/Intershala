const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const ErorrHandler = require("../utlis/ErrorHandler");
const { sendToken } = require("../utlis/sendToken");

exports.homepages = catchAsyncError(async (req, res, next) => {
  res.json({ message: "Secure HomePage" });
});


exports.currentStudent = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec()
  res.json({ student});
});

exports.studentsignup = catchAsyncError(async (req, res, next) => {
  const student = await new studentModel(req.body).save();
  sendToken(student, 201, res)
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

  sendToken(student, 200, res)
});


exports.studentsignOut = catchAsyncError(async (req, res, next) => {
    res.clearCookie("token");
    res.json({message: 'Successfully SignOut!'})
});
