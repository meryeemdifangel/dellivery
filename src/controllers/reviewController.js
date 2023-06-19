
const Review = require('../models/reviewModel');
const Restaurant = require('../models/restaurantModel');


 const getAllReviewOfRestaurant = async ( req , res) => {
    try {
        const review  = await Review.find({restaurant : req.params.id});
        res.status(200).send(review)
    } catch (error) {
        console.log(error)
        res.status(400).send(null)
    }
}

 const addReviewOfRestaurant = async ( req , res ) => {
    try {
       
        let review = await Review.findOne({restaurant : req.body.restaurant,client : req.body.user});
        if (review) {
            review.rating = req.body.rating;
            review.review = req.body.review;
            await review.save()
            const reviewsOfRest =  await Review.find({restaurant : req.body.restaurant});
            let rat = 0;
            for (let i =  0 ; i < reviewsOfRest.length ; i++){
                rat += reviewsOfRest[i].rating;
            }
            const rest = await Restaurant.findById(req.body.restaurant);
            rest.avg = ( rat /reviewsOfRest.length ).toString() 
            await rest.save();
        }else {
            review  = await Review.create(req.body)
            const reviewsOfRest =  await Review.find({restaurant : req.body.restaurant});
            let rat = 0;
            for (let i =  0 ; i < reviewsOfRest.length ; i++){
                rat += reviewsOfRest[i].rating;
            }
            const rest = await Restaurant.findById(req.body.restaurant);
            rest.avg = ( rat /reviewsOfRest.length ).toString() 
            rest.review = (parseInt(rest.review) + 1 ).toString();
            await rest.save();
        }
        
        res.status(200).send(review);
    } catch (error) {
        console.log(error);
        res.status(400).send("err")
    }
}

module.exports = {getAllReviewOfRestaurant, addReviewOfRestaurant}