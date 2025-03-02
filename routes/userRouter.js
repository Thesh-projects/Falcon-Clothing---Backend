import express from 'express';
import {
  registerUser,
  loginUser,
  registerAdmin,
  loginAdmin,
  adminDashboard,
  deleteUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const userRouter = express.Router();


userRouter.post('/register', registerUser); 

userRouter.post('/login', loginUser); 

userRouter.post('/register-admin', registerAdmin); 

userRouter.post('/login-admin', loginAdmin); 

userRouter.get('/admin-dashboard', verifyToken, adminDashboard); 

userRouter.delete('/delete-user', verifyToken, deleteUser); 


export default userRouter;