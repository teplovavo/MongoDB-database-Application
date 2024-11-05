import express from 'express';
import Pet from '../models/Pet.js'; 

const router = express.Router();

router.patch('/pets/:id/feed', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).send({ message: 'Pet not found' });

    pet.hunger = Math.max(pet.hunger - 10, 0);
    pet.health = Math.min(pet.health + 5, 100);
    pet.lastFed = new Date();

    await pet.save();
    res.send(pet);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
