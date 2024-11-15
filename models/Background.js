
import mongoose from 'mongoose';

const backgroundSchema = new mongoose.Schema({
  background: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Background', backgroundSchema);