const mongoose = require("mongoose");
const dotenv = require('dotenv');

const connectDatabase = () => {

 if(!dotenv.config().error)
{
  mongoose.connect("mongodb+srv://jmdif:meryemdif@cluster0.vnstzge.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology:  true,
  }) 
    .then((data) => { 
      console.log(`Mongodb connected with server: `);
    }).catch((err)=>{
      console.log(err)
    });}
};

module.exports = connectDatabase;
