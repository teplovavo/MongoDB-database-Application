
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// all user data (GET)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'Failed to retrieve user data' });
  }
});

// new user data (POST)
router.post('/', async (req, res) => {
  console.log('Received user data:', req.body); // Отладочный лог
  const { username, location } = req.body;
  if (!username || !location) {
    return res.status(400).json({ error: 'Invalid user data' });
  }
  try {
    const newUser = new User({ username, location });
    await newUser.save();
    return res.status(201).json({ message: 'User data saved', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to save user data' });
  }
});

// refresh user data (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, location } = req.body;

  if (!username || !location) {
    return res.status(400).json({ error: 'Invalid user data' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, location },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'User data updated', user: updatedUser });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Failed to update user data' });
  }
});

// delete all users (DELETE)
router.delete('/', async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ message: 'All user data deleted' });
  } catch (error) {
    console.error('Error deleting user data:', error);
    res.status(500).json({ error: 'Failed to delete user data' });
  }
});

// delete user by ID (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'User deleted', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
