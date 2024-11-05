import mongoose from 'mongoose';

const backgroundSchema = new mongoose.Schema({
  condition: { type: String, required: true },
  imagePath: { type: String, required: true }
});

const WeatherBackground = mongoose.model('WeatherBackground', backgroundSchema);
export default WeatherBackground;
