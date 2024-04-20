const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utlis/ErrorHandler");
const { catchAsyncError } = require("./catchAsyncErrors");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login To Excess The Page!"), 401);
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  req.id = id
   next()
});