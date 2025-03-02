import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';

const cartRouter = express.Router();


cartRouter.get('/cart/:userId', getCart);

cartRouter.post('/cart/add', addToCart);

cartRouter.put('/cart/update', updateCartItem);

cartRouter.delete('/cart/remove', removeFromCart);

cartRouter.delete('/cart/clear', clearCart);


export default cartRouter;