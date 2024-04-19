require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const { genratatedError } = require("./middlewares/error");

// Database connections
require("./models/database").connectDatabse()

// logger
const logger = require("morgan");
app.use(logger("tiny"));


app.use("/", require("./routes/student"));

// Error handling
const ErorrHandler = require("./utlis/ErrorHandler");
app.all("*", (req, res, next)=>{
    next(new ErorrHandler(`Request Url Not Found ${req.url}`, 404))
})

app.use(genratatedError)

app.listen(
  process.env.PORT,
  console.log(`Server Running on Port ${process.env.PORT}`)
);
