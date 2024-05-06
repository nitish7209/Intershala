const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [2, "First Name Should be Greater Then Two letters"],
      maxlength: [10, "First Name Should NOt Be Greater Then Ten letters"],
    },
    lastname: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [2, "Last Name Should be Greater Then Two letters"],
      maxlength: [10, "Last Name Should NOt Be Greater Then Ten letters"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      maxlength: [10, "Contact Should be 10 Digits"],
      minlength: [10, "Contact Should be 10 Digits"],
    },
    city: {
      type: String,
      required: [true, "City Name is required"],
      minlength: [2, "City Name Should be Greater Then Two letters"],
      maxlength: [10, "City Name Should NOt Be Greater Then Ten letters"],
    },
    gender: {
      type: String,
      emum: ["Male", "Female", "others"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
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
    avatar: {
      type: Object,
      default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1678347096878-01a6000f8562?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
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
