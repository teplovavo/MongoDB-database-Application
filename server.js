// server.js
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

app.use(express.json());
app.use(express.static('public'));

// Weather schema with validation and indexing
const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true, index: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  conditions: { type: String, required: true },
  savedAt: { type: Date, default: Date.now, index: true }
});

const Weather = mongoose.model('Weather', weatherSchema);

app.post('/api/weather', async (req, res) => {
  try {
    const newWeather = new Weather(req.body);
    await newWeather.save();
    res.status(200).send('Weather data saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving weather data:', error);
  }
});

app.get('/api/weather', async (req, res) => {
  try {
    const savedData = await Weather.find();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).send('Error fetching saved data:', error);
  }
});

// Delete all data
app.delete('/api/weather', async (req, res) => {
  try {
    await Weather.deleteMany({});
    res.status(200).send('All saved data deleted successfully!');
  } catch (error) {
    res.status(500).send('Error deleting data:', error);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
