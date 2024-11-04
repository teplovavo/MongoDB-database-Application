import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  class_id: Number,
  learner_id: Number,
  scores: Array
}, { collection: 'grades' }); // name of collection

export default mongoose.model('Grade', gradeSchema);
