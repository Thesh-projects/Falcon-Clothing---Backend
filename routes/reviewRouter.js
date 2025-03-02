import express from 'express';
import {
  createReview,
  getReviewsByProduct,
  getReviewById,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';

const reviewRouter = express.Router();


reviewRouter.post('/reviews', createReview);

reviewRouter.get('/reviews/product/:productId', getReviewsByProduct);

reviewRouter.get('/reviews/:id', getReviewById);

reviewRouter.put('/reviews/:id', updateReview);

reviewRouter.delete('/reviews/:id', deleteReview);


export default reviewRouter;