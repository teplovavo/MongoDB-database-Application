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

// User schema with validation
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  location: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Location schema with validation
const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  population: { type: Number }
});

const Location = mongoose.model('Location', locationSchema);

// Weather routes
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

app.delete('/api/weather', async (req, res) => {
  try {
    await Weather.deleteMany({});
    res.status(200).send('All saved data deleted successfully!');
  } catch (error) {
    res.status(500).send('Error deleting data:', error);
  }
});

// User routes
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error fetching users:', error);
  }
});

app.delete('/api/users', async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).send('All users deleted successfully!');
  } catch (error) {
    res.status(500).send('Error deleting users:', error);
  }
});

// Location routes
app.post('/api/locations', async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create location' });
  }
});

app.get('/api/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).send('Error fetching locations:', error);
  }
});

app.delete('/api/locations', async (req, res) => {
  try {
    await Location.deleteMany({});
    res.status(200).send('All locations deleted successfully!');
  } catch (error) {
    res.status(500).send('Error deleting locations:', error);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
