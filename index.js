import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import orderRouter from './routes/orderRouter.js';
import reviewRouter from './routes/reviewRouter.js';
import cartRouter from './routes/cartRouter.js';
import wishlistRouter from './routes/wishlistRouter.js';
import couponRouter from './routes/couponRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import shippingRouter from './routes/shippingRouter.js';


dotenv.config();


const app = express();


app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev')); 


const mongoUrl = process.env.MONGO_URL || 'http://localhost:5173/';

mongoose
  .connect(mongoUrl, {})
  .then(() => console.log('Database Connected'))
  .catch((err) => console.error('Database Connection Error:', err));


app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/coupons', couponRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/shipping', shippingRouter);


app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});


app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});