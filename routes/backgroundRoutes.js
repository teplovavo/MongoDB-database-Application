import express from 'express';
import WeatherBackground from '../models/WeatherBackground.js';

const router = express.Router();

router.get('/backgrounds/:condition', async (req, res) => {
  try {
    const background = await WeatherBackground.findOne({ condition: req.params.condition });
    if (!background) return res.status(404).send({ message: 'Background not found' });
    res.send(background);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
