const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      // minlength: [6, "password should atlest 6 char"],
      maxlength: [12, "password should not exced more than 15 char"],
      select: false,
      // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/], //special/number/capital]
    },
  },
  {
    timestamps: true,
  }
);

//  this function will work before the save in studentsignup controller
// & we can make the passward bcrypt using salt and hash

studentModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

// compare the password while we are signin the website

studentModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

studentModel.methods.getjwttocken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRIES,
  });
};

const student = mongoose.model("student", studentModel);

module.exports = student;
