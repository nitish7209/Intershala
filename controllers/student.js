const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const ErorrHandler = require("../utlis/ErrorHandler");
const { sendToken } = require("../utlis/sendToken");
const path = require("path");
const imagekit = require("../utlis/imagekit").initImageKit();

exports.homepages = catchAsyncError(async (req, res, next) => {
  res.json({ message: "Secure HomePage" });
});

exports.currentStudent = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
  res.json({ student });
});

exports.studentsignup = catchAsyncError(async (req, res, next) => {
  const student = await new studentModel(req.body).save();
  sendToken(student, 201, res);
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

  sendToken(student, 200, res);
});

exports.studentsignOut = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully SignOut!" });
});

exports.studentUpdate = catchAsyncError(async (req, res, next) => {
  const student = await studentModel
    .findByIdAndUpdate(req.params.id, req.body)
    .exec();
  if (!student) {
    return next(new ErorrHandler("User Not Found With This Id"));
  }
  res.status(200).json({
    success: true,
    message: "Student Upadted !",
  });
});

exports.studentAvatar = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifiledfilename = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;
  if(student.avatar.fileId !== ""){
    await imagekit.deleteFile(student.avatar.fileId)
  }
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiledfilename,
  });
  student.avatar = { fileId, url };
  await student.save();
  res.status(200).json({
      success:true,
      message:"Student Avatar Uploaded Done!"
  })
});

exports.studentsendmail = catchAsyncError(async (req, res, next) => {
  const studentEmail = await studentModel
    .findOne({ email: req.body.email })
    .exec();

  if (!studentEmail)
    return next(
      new ErorrHandler("Student with this email address is not found", 404)
    );

  res.json(studentEmail);
});
