
import express from 'express';
import Background from '../models/Background.js';

const router = express.Router();

// Save a background image name (POST)
router.post('/', async (req, res) => {
  const { background } = req.body;
  if (!background) {
    return res.status(400).json({ error: 'No background specified' });
  }
  try {
    const newBackground = new Background({ background });
    await newBackground.save();
    return res.status(201).json({ message: 'Background saved', background: newBackground });
  } catch (error) {
    console.error('Error saving background:', error);
    return res.status(500).json({ error: 'Failed to save background' });
  }
});

// Retrieve all background data (GET)
router.get('/', async (req, res) => {
  try {
    const backgrounds = await Background.find();
    console.log('Sending backgrounds:', backgrounds); 
    res.status(200).json(backgrounds);
  } catch (error) {
    console.error('Error retrieving background data:', error);
    res.status(500).json({ error: 'Failed to retrieve background data' });
  }
});

// Delete all background data (DELETE)
router.delete('/', async (req, res) => {
  try {
    await Background.deleteMany();
    res.status(200).json({ message: 'All background data deleted' });
  } catch (error) {
    console.error('Error deleting background data:', error);
    res.status(500).json({ error: 'Failed to delete background data' });
  }
});

export default router;
