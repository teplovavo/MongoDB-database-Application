import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import petRoutes from './routes/petRoutes.js';
import backgroundRoutes from './routes/backgroundRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

app.use(express.json());
app.use(express.static('public'));
app.use('/api', userRoutes);
app.use('/api', petRoutes);
app.use('/api', backgroundRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
