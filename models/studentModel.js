const mongoose = require(mongoose);

const studentModel = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      minlength: [6, "password should atlest 6 char"],
      maxlength: [12, "password should not exced more than 15 char"],
      select: false,
      match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/], //special/number/capital]
    },
  },
  {
    timestamps: true,
  }
);

const student = mongoose.model("student", studentModel)

module.exports = student
