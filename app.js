//Import Libraralies
const express = require("express");
const app = express();
bodyParser = require("body-parser");
require("dotenv").config();

// Import Custem Modules
const auth = require("./routes/auth-route");
const job = require("./routes/job-router");
const connectDB = require("./db/connectDB");
const res = require("express/lib/response");
const { required } = require("nodemon/lib/config");
//const BadRequedt = require("./errors/bad_request.js");
const erorrHandlerMiddleware = require("./middleware/erorrHandler");
const notFound = require('./errors/4O4');
const port = 3000;
let n = Array();

//configure middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Configure Routes
app.use("/api/v1/jobs", job);
app.use("/api/v1/auth", auth);
app.get("/" , (req , res)=>{
  res.send("<href>/api/v1/jobs</href>");
});
app.use(notFound);
app.use(erorrHandlerMiddleware);
const start = async () => {
  try {
    console.log(process.env.DB_URL);
    await connectDB();
    await app.listen(port, () =>
      console.log(`Example app listening~ on port ${port}!`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
