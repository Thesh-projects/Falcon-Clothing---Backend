import express from 'express';
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
  deletePayment,
} from '../controllers/paymentController.js';

const paymentRouter = express.Router();


paymentRouter.post('/payments', createPayment);

paymentRouter.get('/payments', getPayments);

paymentRouter.get('/payments/:id', getPaymentById);

paymentRouter.put('/payments/:id', updatePaymentStatus);

paymentRouter.delete('/payments/:id', deletePayment);


export default paymentRouter;