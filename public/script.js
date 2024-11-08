document.addEventListener('DOMContentLoaded', () => {
  console.log('Script is loaded');

  const searchForm = document.getElementById('search-form');
  const saveButton = document.getElementById('save-weather');
  const viewSavedButton = document.getElementById('view-saved-data');
  const deleteSavedButton = document.getElementById('delete-saved-data');
  const savedDataContainer = document.getElementById('saved-data');
  const currentWeatherDisplay = document.getElementById('current-weather-display');
  const weatherInfoContainer = document.getElementById('weather-info');
  let weatherData = {};

  // Background selection functionality with save to database
  document.querySelectorAll('.bg-button').forEach(button => {
    button.addEventListener('click', async () => {
      document.querySelectorAll('.bg-button').forEach(btn => btn.classList.remove('active-bg'));
      button.classList.add('active-bg');

      // Set background image
      const bgImage = button.dataset.bg;
      document.body.style.backgroundImage = `url('/backgrounds/${bgImage}')`;

      // Save selected background to locations collection
      try {
        const response = await fetch('/api/locations/background', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: bgImage })
        });

        if (!response.ok) {
          throw new Error('Failed to save background in locations');
        }
        console.log('Background saved successfully');
      } catch (error) {
        console.error('Error saving background:', error);
      }
    });
  });

  // Remaining existing functionality
  // Handle search form submission
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.getElementById('search-city').value.trim();

    if (!city) {
      alert("Please enter a valid city name.");
      return;
    }

    loadWeather(city);
  });

  // Fetch weather data from API
  async function loadWeather(city) {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be087367916f9535f470615736361967&units=metric`);
      const data = await response.json();

      if (data.cod !== 200) {
        alert("City not found. Please enter a valid city.");
        return;
      }

      // Save fetched data for display and storage
      weatherData = {
        city: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        conditions: data.weather[0].description
      };

      // Display current weather info on the left
      currentWeatherDisplay.innerHTML = `
        <div class="weather-data">
          <h4 style="color: #007bff;">${weatherData.city}</h4>
          <p><strong>Temperature:</strong> ${Math.round(weatherData.temperature)}°C</p>
          <p><strong>Humidity:</strong> ${weatherData.humidity}%</p>
          <p><strong>Conditions:</strong> ${weatherData.conditions}</p>
        </div>
      `;
      weatherInfoContainer.classList.remove('hidden');
      saveButton.classList.remove('hidden');
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  // Save weather data to database
  saveButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weatherData)
      });

      if (response.ok) {
        alert("Weather data saved successfully!");
        saveButton.classList.add('hidden');
      } else {
        console.error('Failed to save weather data');
      }
    } catch (error) {
      console.error('Error saving weather data:', error);
    }
  });

  // View saved data from database
  viewSavedButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/weather');
      const savedData = await response.json();

      savedDataContainer.classList.remove('hidden');
      savedDataContainer.innerHTML = `<h3>Saved Weather Data</h3>` + savedData.map(entry => `
        <div class="weather-data">
          <h4 style="color: #555;">${entry.city}</h4>
          <p><strong>Temperature:</strong> ${Math.round(entry.temperature)}°C</p>
          <p><strong>Humidity:</strong> ${entry.humidity}%</p>
          <p><strong>Conditions:</strong> ${entry.conditions}</p>
          <p><strong>Saved At:</strong> ${new Date(entry.savedAt).toLocaleString()}</p>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error fetching saved data:', error);
    }
  });

  // Delete saved data from database
  deleteSavedButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/weather', { method: 'DELETE' });
      if (response.ok) {
        savedDataContainer.classList.add('hidden');
        savedDataContainer.innerHTML = '<h3>Saved Weather Data</h3>';
        alert("All saved data deleted successfully!");
      } else {
        console.error('Failed to delete saved data');
      }
    } catch (error) {
      console.error('Error deleting saved data:', error);
    }
  });
});
