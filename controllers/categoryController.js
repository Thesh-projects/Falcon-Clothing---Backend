import Category from '../models/category.js';

export const addCategory = async (req, res) => {
  try {
    const { name, description, image, parentCategory, isActive } = req.body;

   
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    
    const newCategory = new Category({
      name,
      description,
      image,
      parentCategory,
      isActive,
    });

    
    await newCategory.save();

    
    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parentCategory', 'name'); // Populate parent category name
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id).populate('parentCategory', 'name'); // Populate parent category name
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.name) {
      const existingCategory = await Category.findOne({ name: updateData.name });
      if (existingCategory && existingCategory._id.toString() !== id) {
        return res.status(400).json({ message: 'Category with this name already exists' });
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};