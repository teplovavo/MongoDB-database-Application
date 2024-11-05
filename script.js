document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const location = document.getElementById('location').value;

  const response = await fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, location })
  });

  if (response.ok) {
    const user = await response.json();
    localStorage.setItem('userId', user._id);
    localStorage.setItem('location', location);
    window.location.href = '/pet.html';
  }
});
