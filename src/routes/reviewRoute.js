import { createReview, getProductReviews } 
from '../controllers/reviewController.js';
import verifyUserJWT from '../middlewares/verifyUserJWT.js';
import express from 'express';

const reviewRouter = express.Router();

reviewRouter.post('/reviews', verifyUserJWT, createReview);
reviewRouter.get('/reviews/:productId', getProductReviews);

export default reviewRouter;
