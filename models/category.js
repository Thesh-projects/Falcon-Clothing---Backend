import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/164/164579.png',
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', 
      default: null, 
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

const Category = mongoose.model('Category', categorySchema);

export default Category;