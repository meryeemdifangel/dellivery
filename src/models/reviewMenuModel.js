const mongoose = require("mongoose");

const ReviewMenuSchema = mongoose.Schema({
    menu : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    },
    client : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    review : {
        type : String
    },
    rating : {
        type : Number
    },

 
},{
    timestamps : true
})


const ReviewMenu = mongoose.model("ReviewMenu" , ReviewMenuSchema)
module.exports = ReviewMenu;