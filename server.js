import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Middleware
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
  type: { type: String, default: 'general' } // Optional field to specify if this is a background
});

const Location = mongoose.model('Location', locationSchema);

// Weather routes - save and manage weather-specific data
app.post('/api/weather', async (req, res) => {
  try {
    const { city, temperature, humidity, conditions } = req.body;

    const newWeather = new Weather({ city, temperature, humidity, conditions });
    await newWeather.save();

    res.status(200).send('Weather data saved successfully!');
  } catch (error) {
    console.error('Error saving weather data:', error);
    res.status(500).send('Error saving weather data.');
  }
});

app.get('/api/weather', async (req, res) => {
  try {
    const savedData = await Weather.find();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).send('Error fetching weather data:', error);
  }
});

app.delete('/api/weather', async (req, res) => {
  try {
    await Weather.deleteMany({});
    res.status(200).send('All weather data deleted successfully!');
  } catch (error) {
    res.status(500).send('Error deleting weather data:', error);
  }
});

// User routes - save and manage user-specific data
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('User creation failed:', error);
    res.status(400).json({ error: error.message });
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

// Update user data (PATCH route for users)
app.patch('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ error: error.message });
  }
});

// Location routes - save and manage location-specific data
app.post('/api/locations', async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// New route to save background choice to locations
app.post('/api/locations/background', async (req, res) => {
  try {
    const { name } = req.body;

    const newBackgroundLocation = new Location({ name, country: 'Background', type: 'background' });
    await newBackgroundLocation.save();

    res.status(201).send('Background saved successfully in locations!');
  } catch (error) {
    console.error('Error saving background in locations:', error);
    res.status(500).send('Error saving background in locations.');
  }
});

// Serve the frontend HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'views', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
