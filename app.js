require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const { genratatedError } = require("./middlewares/error");

// Database connections
require("./models/database").connectDatabse();

// logger
const logger = require("morgan");
app.use(logger("tiny"));

// body_parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session and cookie
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use(cookieParser());

// Exprees File-uploader

const fileupload = require("express-fileupload");
app.use(fileupload());

app.use("/", require("./routes/student"));

// Error handling
const ErorrHandler = require("./utlis/ErrorHandler");
app.all("*", (req, res, next) => {
  next(new ErorrHandler(`Request Url Not Found ${req.url}`, 404));
});

app.use(genratatedError);

app.listen(
  process.env.PORT,
  console.log(`Server Running on Port ${process.env.PORT}`)
);
