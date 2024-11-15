// /routes/weatherRoutes.js
import express from 'express';
import Weather from '../models/Weather.js';

const router = express.Router();

// Fetch weather data from OpenWeatherMap API (GET)
router.get('/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const apiKey = process.env.API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    if (data.cod !== 200) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Save weather data (POST)
router.post('/', async (req, res) => {
  const { city, temperature, humidity, conditions, timestamp } = req.body;
  if (!city || temperature === undefined || humidity === undefined || !conditions) {
    return res.status(400).json({ error: 'Invalid weather data' });
  }
  try {
    const newWeather = new Weather({
      city,
      temperature,
      humidity,
      conditions,
      timestamp: timestamp || Date.now(),
    });
    await newWeather.save();
    return res.status(201).json({ message: 'Weather data saved', weather: newWeather });
  } catch (error) {
    console.error('Error saving weather data:', error);
    return res.status(500).json({ error: 'Failed to save weather data' });
  }
});

// Retrieve all saved weather data (GET)
router.get('/', async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error retrieving weather data:', error);
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// Delete all saved weather data (DELETE)
router.delete('/', async (req, res) => {
  try {
    await Weather.deleteMany();
    res.status(200).json({ message: 'All weather data deleted' });
  } catch (error) {
    console.error('Error deleting weather data:', error);
    res.status(500).json({ error: 'Failed to delete weather data' });
  }
});

export default router;
