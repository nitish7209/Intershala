exports.sendToken = (student, statuscode, res) => {
  const token = student.getjwttocken();
  const options = {
    expries: new Date(
      Date.now() + process.env.COOKIE_EXPRIES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(statuscode)
    .cookie("token", token, options)
    .json({ success: true, id: student._id, token });
};
