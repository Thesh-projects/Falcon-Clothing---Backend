import express from 'express';
import {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

const categoryRouter = express.Router();


categoryRouter.post('/categories', addCategory);

categoryRouter.get('/categories', getCategories);

categoryRouter.get('/categories/:id', getCategoryById);

categoryRouter.put('/categories/:id', updateCategory);

categoryRouter.delete('/categories/:id', deleteCategory);



export default categoryRouter;