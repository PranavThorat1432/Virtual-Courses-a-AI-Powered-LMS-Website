import express from 'express';
import { createReview, getReviews } from '../Controllers/reviewController.js';
import isAuth from '../Middlewares/isAuth.js';


const reviewRouter = express.Router();

reviewRouter.post('/create-review', isAuth, createReview);
reviewRouter.get('/get-reviews', getReviews);

export default reviewRouter;