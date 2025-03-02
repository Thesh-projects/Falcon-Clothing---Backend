import express from 'express';
import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} from '../controllers/couponController.js';

const couponRouter = express.Router();


couponRouter.post('/coupons', createCoupon);

couponRouter.get('/coupons', getCoupons);

couponRouter.get('/coupons/:id', getCouponById);

couponRouter.put('/coupons/:id', updateCoupon);

couponRouter.delete('/coupons/:id', deleteCoupon);

couponRouter.post('/coupons/apply', applyCoupon);


export default couponRouter;