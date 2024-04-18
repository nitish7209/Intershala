require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();


// logger
const logger = require("morgan");
app.use(logger("tiny"));


app.use("/", require("./routes/student"));

// Error handling
app.all("*", (req, res, next)=>{
  
})


app.listen(
  process.env.PORT,
  console.log(`Server Running on Port ${process.env.PORT}`)
);
