import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: { type: String, default: 'Pet' },
  health: { type: Number, default: 100 },
  hunger: { type: Number, default: 50 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastFed: { type: Date, default: Date.now }
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet;
