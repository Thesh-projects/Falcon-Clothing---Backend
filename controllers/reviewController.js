import Review from '../models/review.js';

export const createReview = async (req, res) => {
  try {
    const { user, product, rating, comment } = req.body;

    const existingReview = await Review.findOne({ user, product });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const newReview = new Review({
      user,
      product,
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId }).populate('user', 'firstName lastName'); // Populate user details
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id).populate('user', 'firstName lastName'); // Populate user details
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedReview = await Review.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};