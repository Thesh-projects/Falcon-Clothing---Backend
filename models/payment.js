import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', 
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'], 
    },
    amount: {
      type: Number,
      required: true,
      min: 0, 
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'], 
      default: 'Pending',
    },
    transactionId: {
      type: String, 
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Payment = mongoose.model('Payment', paymentSchema);


export default Payment;