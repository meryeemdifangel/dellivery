const connectDatabase = require("./middleware/config/database");
const dotenv = require('dotenv');
const cors = require("cors");
const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");
// Route Imports
const routes = require("./routes/index");
// Config
 // require("dotenv").config({ path: "../config.env" });
//}

if(!dotenv.config().error)
{
dotenv.config({ path: '../.env' });
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});



//Connecting to database
connectDatabase();


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", routes);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Middleware for Errors
app.use(errorMiddleware);

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
}