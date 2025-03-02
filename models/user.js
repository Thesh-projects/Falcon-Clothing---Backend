import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  
email: {
        type: String,
        required: true,
        unique: true,
      },
      
firstName: {
    type: String,
    required: true,
  },

lastName: {
    type: String,
    required: true,
  },
 
password: {
    type: String,
    required: true,
  },

isBlocked: {
    type: Boolean,
    default: false,
  },

type: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
  },
  
profilePicture: {
    type: String,
    default: 'https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg', 
  },
  
createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export default User;