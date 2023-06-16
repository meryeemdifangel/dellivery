const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
    restaurant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
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


const Review = mongoose.model("Review" , ReviewSchema)
module.exports = Review;