import express from 'express';
import {
  createShipping,
  getShippings,
  getShippingById,
  updateShipping,
  deleteShipping,
} from '../controllers/shippingController.js';

const shippingRouter = express.Router();


shippingRouter.post('/shippings', createShipping);

shippingRouter.get('/shippings', getShippings);

shippingRouter.get('/shippings/:id', getShippingById);

shippingRouter.put('/shippings/:id', updateShipping);

shippingRouter.delete('/shippings/:id', deleteShipping);


export default shippingRouter;