import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  location: { type: String, required: true }
});

export default mongoose.model('User', userSchema);
