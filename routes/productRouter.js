import express from 'express';
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const productRouter = express.Router();


productRouter.post('/products', addProduct);

productRouter.get('/products', getProducts);

productRouter.get('/products/:id', getProductById);

productRouter.put('/products/:id', updateProduct);

productRouter.delete('/products/:id', deleteProduct);


export default productRouter;