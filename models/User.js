
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [1, 'Username must be at least 1 character'],
    index: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    minlength: [1, 'Location must be at least 1 character'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


userSchema.index({ username: 1 });

export default mongoose.model('User', userSchema);
