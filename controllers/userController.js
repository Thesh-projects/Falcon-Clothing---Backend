import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, profilePicture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 12);


    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      type: 'user', 
      profilePicture,
    });

    
    await newUser.save();

    
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

   
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, profilePicture } = req.body;

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 12);

    
    const newAdmin = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      type: 'admin', 
      profilePicture,
    });

    
    await newAdmin.save();

    
    const token = jwt.sign({ id: newAdmin._id, role: newAdmin.type }, 'your-secret-key', { expiresIn: '1h' });

    
    res.status(201).json({ message: 'Admin registered successfully', token, admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const admin = await User.findOne({ email, type: 'admin' });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

   
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

   
    const token = jwt.sign({ id: admin._id, role: admin.type }, 'your-secret-key', { expiresIn: '1h' });

   
    res.status(200).json({ message: 'Admin login successful', token, admin });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const adminDashboard = async (req, res) => {
  try {
    const { id } = req.user; 

    
    const admin = await User.findById(id);
    if (!admin || admin.type !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

   
    res.status(200).json({ message: 'Welcome to the admin dashboard', admin });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    await User.findOneAndDelete({ email });

   
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};