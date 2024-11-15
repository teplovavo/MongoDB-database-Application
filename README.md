Weather and Background Fun App 
Hey there! Welcome to my super cool Weather and Background Fun App! This little project is all about mixing up the weather vibes with awesome backgrounds and user info. Let's dive in!

What's This All About? 
So, I whipped up this neat web app using Node.js, Express, and MongoDB. It does a bunch of fun stuff:

Backgrounds: Choose from a set of backgrounds (Sunny, Cloudy, Rain, Thunder) and save your favorite ones. You can view your saved backgrounds and even delete them if you're feeling like a fresh start.

Weather: Search for the current weather in any city! Get the temperature, humidity, and conditions. If you like, you can save this data, view it later, or delete it when you're done.

User Info: Enter and save your user information (like your name and location). You can view and edit this info anytime, or delete it if you want to disappear into the shadows.



How to Get This Running 
Clone the Repo.

Install Dependencies: Let's get those Node modules in place.

bash

cd your-repo-name
npm install
Set Up Environment Variables: You'll need a .env file. Create one in the root directory and add your MongoDB connection string and OpenWeatherMap API key:

makefile

MONGODB_URI=your_mongodb_connection_string
WEATHER_API_KEY=your_openweathermap_api_key
Run the App: Fire it up!

bash

npm run dev
Enjoy! Open your browser and go to http://localhost:3000 to start playing around.

Tech Stuff 🛠️
Backend: Built with Node.js and Express. Mongoose is handling all the MongoDB database interactions.

Frontend: Plain ol' HTML, CSS, and JavaScript. Keeping it simple and sweet.

APIs Used:

OpenWeatherMap API: For fetching real-time weather data.
Features 
Backgrounds
Select Background: Click on any of the background buttons to change the look of the app.

Save Background: Liked a background? Save it!

View Saved Backgrounds: Check out all the backgrounds you've saved in a nifty modal.

Delete Saved Backgrounds: Need a cleanup? Delete all your saved backgrounds.

Weather
Search Weather: Enter a city name to get the current weather.

Save Weather Data: Found some interesting weather info? Save it for later!

View Saved Weather Data: Review all the weather data you've saved.

Delete Saved Weather Data: Clear out your saved weather info when you're done.

User Info
Save User Data: Input your name and location to personalize the app.

View and Edit User Data: See your saved info and make changes whenever you like.

Delete User Data: Remove your user info from the app.

MongoDB Collections 
We've got three collections in the database:

users: Stores user information like username and location.

weather: Keeps the weather data you've saved.

backgrounds: Holds the backgrounds you've decided to keep.

A Little Note on Indexes and Validation 
Indexes: For quicker searches, there's an index on the username field in the users collection.

Validation: The app uses Mongoose validation to make sure the data you're saving makes sense (like not saving empty usernames).

Wrapping Up 
That's about it! It's a simple app, but it was a blast to build, and I hope you have fun tinkering with it. Feel free to fork it, play around, and make it your own.

If you run into any issues or have ideas to make it better, I'd love to hear from you!

