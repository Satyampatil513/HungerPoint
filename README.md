# Hunger Point

Hunger Point is a food ordering application built with Vue 3 and Vite. It allows users to browse, order, and rate food items. The application features a user-friendly interface and integrates with a backend API for data management.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- Browse and search for food items
- View detailed information about food items
- Order food items
- Rate and review food items
- Interactive map view to locate food items
- Responsive design

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/Satyampatil513/HungerPoint.git
    cd HungerPoint
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the necessary environment variables:

    ```env
    VITE_API_BASE_URL=https://navobackend.onrender.com/api
    ```

## Usage

### Development

To start the development server, run:

```sh
npm run dev
```

This will start the application at http://localhost:5173.

### Build

To build the project for production, run:

```sh
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Preview

To preview the production build locally, run:

```sh
npm run preview
```

## Project Structure

```
HungerPoint/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Project assets (images, fonts, etc.)
│   ├── components/         # Vue components
│   ├── pages/              # Vue pages
│   ├── store/              # Vuex store
│   ├── App.vue             # Main App component
│   ├── main.js             # Entry point for the application
│   └── router.js           # Vue Router configuration
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── index.html              # Main HTML file
├── package.json            # NPM package configuration
├── README.md               # Project README file
└── vite.config.js          # Vite configuration
```

## API Endpoints

The application interacts with the following API endpoints:

- `GET /api/showfood/:id` - Fetch food items for a specific user
- `GET /api/showallfood` - Fetch all food items
- `GET /api/showallorder/:id` - Fetch all orders for a specific user
- `PUT /api/addrating/:id/:rating` - Add a rating for a specific order
- `POST /api/register` - Register a new user
- `GET /api/bookfood/:foodId/:servings/:consumerId` - Book food for a user

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.