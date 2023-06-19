
const ReviewMenu = require('../models/reviewMenuModel');
const Menu = require('../models/menuModel');


 const getAllReviewOfMenu = async ( req , res) => {
    try {
        const review  = await ReviewMenu.find({restaurant : req.params.id});
        res.status(200).send(review)
    } catch (error) {
        console.log(error)
        res.status(400).send(null)
    }
}

 const addReviewOfMenu = async ( req , res ) => {
    try {
       
        let review = await ReviewMenu.findOne({menu : req.body.menu,client : req.body.user});
        if (review) {
            review.rating = req.body.rating;
            review.review = req.body.review;
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
            review  = await Review.create(req.body)
            const reviewsOfRest =  await Review.find({menu : req.body.menu});
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