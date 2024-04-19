exports.genratatedError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (
    (err.name =
      "MongoServerError" && err.message.includes("E11000 duplicate key"))
  ) {
    err.message = "Students With This Email Address Is Already Exits"
  }

  res.status(statusCode).json({
    message: err.message,
    errName: err.name,
    // stack: err.stack
  });
};
