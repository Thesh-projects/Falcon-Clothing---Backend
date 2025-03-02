import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true, 
    },

    productName: {
      type: String,
      required: true,
      trim: true, 
    },

    altNames: {
      type: [String],
      default: [],
    },

    Price: {
      type: Number,
      required: true,
      min: 0, 
    },

    lastPrice: {
      type: Number,
      min: 0, 
    },

    stock: {
      type: Number,
      required: true,
      min: 0, 
    },

    required: {
      type: Boolean,
      default: false, 
    },

    description: {
      type: String,
      trim: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;