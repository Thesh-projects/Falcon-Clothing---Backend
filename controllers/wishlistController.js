import Wishlist from '../models/wishlist.js';
import Product from '../models/product.js';

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId }).populate('items.product', 'name price image');

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }

    const itemIndex = wishlist.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    wishlist.items.push({ product: productId });

    await wishlist.save();

    res.status(200).json({ message: 'Item added to wishlist successfully', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.items = wishlist.items.filter((item) => item.product.toString() !== productId);

    await wishlist.save();

    res.status(200).json({ message: 'Item removed from wishlist successfully', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const clearWishlist = async (req, res) => {
  try {
    const { userId } = req.body;

    const wishlist = await Wishlist.findOneAndDelete({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json({ message: 'Wishlist cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};