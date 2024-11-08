import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('User creation failed');
    res.status(400).json({ error: 'Failed to create user' });
  }
});

export default router;
