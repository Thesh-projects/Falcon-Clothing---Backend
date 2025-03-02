import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
    },
    discountType: {
      type: String,
      required: true,
      enum: ['percentage', 'fixed'], 
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    usageLimit: {
      type: Number,
      required: true,
      min: 1, 
    },
    usedCount: {
      type: Number,
      default: 0, 
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;