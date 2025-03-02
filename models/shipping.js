import mongoose from 'mongoose';

const shippingSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      unique: true, 
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    shippingMethod: {
      type: String,
      required: true,
      enum: ['Standard', 'Express', 'Next Day'],
    },
    trackingNumber: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Shipping = mongoose.model('Shipping', shippingSchema);


export default Shipping;