const app = require("./app");
//const cloudinary = require("cloudinary");
const connectDatabase = require("./middleware/config/database");
const dotenv = require('dotenv');
if(!dotenv.config().error)
{
dotenv.config({ path: '../.env' });
console.log(process.env.JWT_SECRET)
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
//if (process.env.NODE_ENV !== "PRODUCTION") {
  console.log('here')
//}

//Connecting to database
connectDatabase();

//cloudinary.config({
 // cloud_name: process.env.CLOUDINARY_NAME,
 // api_key: process.env.CLOUDINARY_API_KEY,
//  api_secret: process.env.CLOUDINARY_API_SECRET,
//});

const server = app.listen(3001, () => {

  console.log(`Server is working on http://localhost:${3001}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
}