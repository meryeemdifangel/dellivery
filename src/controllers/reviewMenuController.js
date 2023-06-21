
const ReviewMenu = require('../models/reviewMenuModel');
const Menu = require('../models/menuModel');
const Review = require('../models/reviewModel');


 const getAllReviewOfMenu = async ( req , res) => {
    try {
        const review  = await ReviewMenu.find({menu : req.params.id});
        res.status(200).send(review)
    } catch (error) {
        console.log(error)
        res.status(400).send(null)
    }
}

 const addReviewOfMenu = async ( req , res ) => {
    try {
       
        let review = await ReviewMenu.findOne({menu : req.body.menu , client : req.body.client});
        console.log(review)
        if (review) {
            console.log(req.body)
            review.rating = req.body.rating?req.body.rating:review.rating;
            review.review = req.body.review?req.body.review:review.review;
            await review.save()
            const reviewsOfRest =  await ReviewMenu.find({menu : req.body.menu});
            let rat = 0;
            for (let i =  0 ; i < reviewsOfRest.length ; i++){
                rat += reviewsOfRest[i].rating;
            }
            const rest = await Menu.findById(req.body.menu);
            rest.avg = ( rat /reviewsOfRest.length ).toString() 
            await rest.save();
        }else {
            review  = await ReviewMenu.create(req.body)
            const reviewsOfRest =  await ReviewMenu.find({menu : req.body.menu});
            let rat = 0;
            for (let i =  0 ; i < reviewsOfRest.length ; i++){
                rat += reviewsOfRest[i].rating;
            }
            const rest = await Menu.findById(req.body.menu);
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



module.exports = {getAllReviewOfMenu, addReviewOfMenu}