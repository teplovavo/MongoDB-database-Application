
document.addEventListener('DOMContentLoaded', () => {
  // ********* BACKGROUND FUNCTIONALITY *********
  const bgButtons = document.querySelectorAll('.bg-button');
  const saveBackgroundButton = document.getElementById('save-background');
  const viewSavedBackgroundsButton = document.getElementById('view-saved-backgrounds');
  const deleteSavedBackgroundsButton = document.getElementById('delete-saved-backgrounds');
  const savedBackgroundsModal = document.getElementById('saved-backgrounds-modal'); // modal window
  const modalBackgroundsContent = document.getElementById('modal-backgrounds-content');
  const closeSavedBackgroundsModal = document.getElementById('close-saved-backgrounds-modal');

  let currentBackground = 'sunny.jpeg'; // default background 

  // set initial background 
  document.body.style.backgroundImage = `url('/backgrounds/${currentBackground}')`;
  bgButtons.forEach((btn) => {
    if (btn.dataset.bg === currentBackground) {
      btn.classList.add('active-bg');
    }
  });

  // change background
  bgButtons.forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.bg-button').forEach((btn) => btn.classList.remove('active-bg'));
      button.classList.add('active-bg');
      currentBackground = button.dataset.bg;
      document.body.style.backgroundImage = `url('/backgrounds/${currentBackground}')`;
    });
  });

  // save background  
  saveBackgroundButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/backgrounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ background: currentBackground }),
      });
      if (response.ok) {
        alert('Background saved successfully!');
      } else {
        console.error('Failed to save background');
        alert('Failed to save background');
      }
    } catch (error) {
      console.error('Error saving background:', error);
      alert('Error saving background');
    }
  });

  // view saved backgrounds
  viewSavedBackgroundsButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/backgrounds');
      if (!response.ok) {
        throw new Error('Failed to fetch saved backgrounds');
      }
      const savedBackgrounds = await response.json();
      console.log('Received saved backgrounds:', savedBackgrounds); // error checking

      if (savedBackgrounds.length === 0) {
        modalBackgroundsContent.innerHTML = `<p>No saved backgrounds found.</p>`;
      } else {
        modalBackgroundsContent.innerHTML = savedBackgrounds
          .map(
            (bg) => `
          <div class="data-item">
            <p>Background: ${bg.background}</p>
            <p>Saved At: ${new Date(bg.timestamp).toLocaleString()}</p>
          </div>
        `
          )
          .join('');
      }
      savedBackgroundsModal.classList.remove('hidden'); // modal window
    } catch (error) {
      console.error('Error fetching saved backgrounds:', error);
      alert('Error fetching saved backgrounds');
    }
  });

  // close modal
  closeSavedBackgroundsModal.addEventListener('click', () => {
    savedBackgroundsModal.classList.add('hidden');
  });

  // delete saved backgrounds
  deleteSavedBackgroundsButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/backgrounds', { method: 'DELETE' });
      if (response.ok) {
        alert('All saved backgrounds deleted successfully!');
      } else {
        console.error('Failed to delete saved backgrounds');
        alert('Failed to delete saved backgrounds');
      }
    } catch (error) {
      console.error('Error deleting saved backgrounds:', error);
      alert('Error deleting saved backgrounds');
    }
  });

  // ********* WEATHER FUNCTIONALITY *********
  const searchForm = document.getElementById('search-form');
  const saveWeatherButton = document.getElementById('save-weather');
  const viewSavedWeatherButton = document.getElementById('view-saved-weather');
  const deleteSavedWeatherButton = document.getElementById('delete-saved-weather');
  const weatherInfoContainer = document.getElementById('weather-info');
  const currentWeatherDisplay = document.getElementById('current-weather-display');
  const savedWeatherDataContainer = document.getElementById('saved-weather-data');
  let weatherData = {};

  // search weather functionality, fetch weather data
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('search-city').value.trim();
    if (!city) {
      alert('Please enter a valid city name.');
      return;
    }

    try {
      const response = await fetch(`/api/weather/${city}`);
      const data = await response.json();
      if (data.cod && data.cod !== 200) {
        alert('City not found. Please enter a valid city.');
        return;
      }
      weatherData = {
        city: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        conditions: data.weather[0].description,
        timestamp: new Date(),
      };
      currentWeatherDisplay.innerHTML = `
        <div class="data-item">
          <h4>${weatherData.city}</h4>
          <p><strong>Temperature:</strong> ${Math.round(weatherData.temperature)}°C</p>
          <p><strong>Humidity:</strong> ${weatherData.humidity}%</p>
          <p><strong>Conditions:</strong> ${weatherData.conditions}</p>
        </div>`;
      weatherInfoContainer.classList.remove('hidden');
      saveWeatherButton.classList.remove('hidden');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data');
    }
  });

  // save data on server
  saveWeatherButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weatherData),
      });
      if (response.ok) {
        alert('Weather data saved successfully!');
        saveWeatherButton.classList.add('hidden');
      } else {
        console.error('Failed to save weather data');
        alert('Failed to save weather data');
      }
    } catch (error) {
      console.error('Error saving weather data:', error);
      alert('Error saving weather data');
    }
  });

  // view saved weather data
  viewSavedWeatherButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/weather');
      const savedData = await response.json();
      if (savedData.length === 0) {
        savedWeatherDataContainer.querySelector('.data-content').innerHTML = `<p>No saved weather data found.</p>`;
      } else {
        savedWeatherDataContainer.querySelector('.data-content').innerHTML = savedData
          .map(
            (entry) => `
          <div class="data-item">
            <h4>${entry.city}</h4>
            <p><strong>Temperature:</strong> ${Math.round(entry.temperature)}°C</p>
            <p><strong>Humidity:</strong> ${entry.humidity}%</p>
            <p><strong>Conditions:</strong> ${entry.conditions}</p>
            <p><strong>Saved At:</strong> ${new Date(entry.timestamp).toLocaleString()}</p>
          </div>
        `
          )
          .join('');
      }
      savedWeatherDataContainer.classList.remove('hidden');
    } catch (error) {
      console.error('Error fetching saved weather data:', error);
      alert('Error fetching saved weather data');
    }
  });

  // delete all saved weather data
  deleteSavedWeatherButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/weather', { method: 'DELETE' });
      if (response.ok) {
        savedWeatherDataContainer.classList.add('hidden');
        savedWeatherDataContainer.querySelector('.data-content').innerHTML = '';
        alert('All saved weather data deleted successfully!');
      } else {
        console.error('Failed to delete saved weather data');
        alert('Failed to delete saved weather data');
      }
    } catch (error) {
      console.error('Error deleting weather data:', error);
      alert('Error deleting weather data');
    }
  });

  // ********* USER DATA FUNCTIONALITY *********
  const userForm = document.getElementById('user-form');
  const viewUserDataButton = document.getElementById('view-user-data');
  const deleteUserDataButton = document.getElementById('delete-user-data');
  const userDataContainer = document.getElementById('user-data');

  // save user data
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const userLocation = document.getElementById('user-location').value.trim();
    if (!username || !userLocation) {
      alert('Please enter valid user data.');
      return;
    }
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, location: userLocation }),
      });
      if (response.ok) {
        alert('User data saved successfully!');
        userForm.reset();
      } else {
        const errorData = await response.json();
        console.error('Failed to save user data:', errorData);
        alert('Failed to save user data: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Error saving user data');
    }
  });

  // view user data
  viewUserDataButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/users');
      const userData = await response.json();
      if (userData.length === 0) {
        userDataContainer.querySelector('.data-content').innerHTML = `<p>No saved user data found.</p>`;
      } else {
        userDataContainer.querySelector('.data-content').innerHTML = userData
          .map(
            (user) => `
          <div class="data-item" data-user-id="${user._id}">
            <h4>Name: ${user.username}</h4>
            <p>Location: ${user.location}</p>
            <p>Saved At: ${new Date(user.timestamp).toLocaleString()}</p>
            <button class="edit-user-button">Edit</button>
            <button class="delete-user-button">Delete</button>
          </div>
        `
          )
          .join('');
      }
      userDataContainer.classList.remove('hidden');

      // add event listeners to "Edit" и "Delete"
      const editButtons = userDataContainer.querySelectorAll('.edit-user-button');
      editButtons.forEach((button) => {
        button.addEventListener('click', handleEditUser);
      });

      const deleteButtons = userDataContainer.querySelectorAll('.delete-user-button');
      deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDeleteUser);
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Error fetching user data');
    }
  });

  // function to edit user data
  async function handleEditUser(event) {
    const userItem = event.target.closest('.data-item');
    const userId = userItem.getAttribute('data-user-id');
    const currentUsername = userItem.querySelector('h4').textContent.replace('Name: ', '');
    const currentLocation = userItem.querySelector('p').textContent.replace('Location: ', '');

    const newUsername = prompt('Enter the new username:', currentUsername);
    const newUserLocation = prompt('Enter the new location:', currentLocation);

    if (!newUsername || !newUserLocation) {
      alert('All fields are required.');
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername, location: newUserLocation }),
      });

      if (response.ok) {
        alert('User data updated successfully!');
        // reload the data
        viewUserDataButton.click();
      } else {
        const errorData = await response.json();
        console.error('Failed to update user data:', errorData);
        alert('Failed to update user data: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Error updating user data');
    }
  }

  // delete user data function
  async function handleDeleteUser(event) {
    const userItem = event.target.closest('.data-item');
    const userId = userItem.getAttribute('data-user-id');

    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('User data deleted successfully!');
        // reload the data
        viewUserDataButton.click();
      } else {
        const errorData = await response.json();
        console.error('Failed to delete user data:', errorData);
        alert('Failed to delete user data: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error deleting user data:', error);
      alert('Error deleting user data');
    }
  }

  // delete user data
  deleteUserDataButton.addEventListener('click', async () => {
    if (!confirm('Are you sure you want to delete all user data?')) {
      return;
    }
    try {
      const response = await fetch('/api/users', { method: 'DELETE' });
      if (response.ok) {
        userDataContainer.classList.add('hidden');
        userDataContainer.querySelector('.data-content').innerHTML = '';
        alert('All user data deleted successfully!');
      } else {
        console.error('Failed to delete user data');
        alert('Failed to delete user data');
      }
    } catch (error) {
      console.error('Error deleting user data:', error);
      alert('Error deleting user data');
    }
  });
});
