# Weather Dashboard Application

## Overview
This application provides a weather dashboard where users can search for city weather, save the data, and view previously saved records. The backend uses Express and Mongoose to interact with MongoDB, storing weather data across three collections: `users`, `locations`, and `weathers`. The application features full CRUD functionality for each collection, including data validation and indexing for efficient querying.

## Features
- Search for weather by city and save data.
- View and delete saved weather data.
- Background image selection based on weather type.
  
## Requirements and Implementation

1. **Three Collections**: `users`, `locations`, and `weathers` collections are used in MongoDB.
2. **Data Modeling**: Each collection has a dedicated schema (`User`, `Location`, `Weather`) with appropriate fields and types.
3. **GET Routes**: Provides `GET` routes to retrieve data from each collection (`/api/users`, `/api/locations`, `/api/weather`).
4. **POST Routes**: `POST` routes for each collection allow data creation (`/api/users`, `/api/locations`, `/api/weather`).
5. **PATCH Route**: A `PATCH` route (`/api/users/:id`) allows updating user data with validation applied.
6. **DELETE Routes**: Each collection has a `DELETE` route to remove all entries (`/api/users`, `/api/locations`, `/api/weather`).
7. **Indexes**: Fields frequently queried, such as `city` and `savedAt` in `Weather`, are indexed for performance.
8. **Data Validation**: Validation rules are enforced in Mongoose schemas, e.g., `required` fields.
9. **Sample Data**: Populate collections with at least 10-20 documents for testing.
10. **Organized Code**: Routes are logically organized by HTTP methods and collection type.
11. **No Errors**: The application runs without errors; all code is fully tested.
12. **Mongoose Integration**: Mongoose is used for schema definitions and MongoDB interactions.

## Getting Started
1. **Install Dependencies**: `npm install`
2. **Run the Server**: `npm start`
3. **Environment Variables**: Ensure `.env` contains `ATLAS_URI` for MongoDB connection.

