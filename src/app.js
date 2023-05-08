const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");
// Route Imports
const routes = require("./routes");
// Config
 // require("dotenv").config({ path: "../config.env" });
//}
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", routes);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
