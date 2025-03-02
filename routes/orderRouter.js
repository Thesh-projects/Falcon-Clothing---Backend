import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';

const orderRouter = express.Router();


orderRouter.post('/orders', createOrder);

orderRouter.get('/orders', getOrders);

orderRouter.get('/orders/:id', getOrderById);

orderRouter.put('/orders/:id', updateOrder);

orderRouter.delete('/orders/:id', deleteOrder);


export default orderRouter;