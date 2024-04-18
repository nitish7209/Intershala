const { catchAsyncError } = require("../middlewares/catchAsyncErrors");

exports.homepages = catchAsyncError(async (req, res, next) => {
  res.json({ message: "Homepage" });
});
