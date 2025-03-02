import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from '../controllers/wishlistController.js';

const wishlistRouter = express.Router();


wishlistRouter.get('/wishlist/:userId', getWishlist);

wishlistRouter.post('/wishlist/add', addToWishlist);

wishlistRouter.delete('/wishlist/remove', removeFromWishlist);

wishlistRouter.delete('/wishlist/clear', clearWishlist);


export default wishlistRouter;