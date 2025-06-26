

&#x20;&#x20;

# FoodieFetch

**Author:** Muhammad Hassan Saggaf

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Demo](#demo)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API](#api)
7. [Technologies](#technologies)
8. [License](#license)

---

## Project Overview

**FoodieFetch** is a single-page web application that provides users with an intuitive interface to search, explore, and interact with a diverse collection of delicious food recipes. Built with HTML5, CSS3, and JavaScript (ES6+), the app delivers a smooth SPA experience—no page reloads or redirects. It communicates asynchronously with a custom JSON API, ensuring lightweight and scalable data exchange. The interface is designed for both desktop and mobile, offering an engaging experience for every user.

## Features

- **Responsive Design**: Adapts to any screen size.
- **Single-Page App**: All content loads dynamically with no redirects.
- **Real-Time Search**: Instant filtering of recipes by name.
- **Recipe Cards**: Show recipe names and ingredients at a glance.
- **Detailed View**: Click a card to reveal full instructions and ingredients.
- **Dark Mode**: Toggleable theme, preference saved in Local Storage.
- **Form Validation**: Ensures valid inputs and clears fields post-submit.
- **Sidebar Navigation**: Access saved or recent recipes (future feature).
- **Modular Code**: Clean, DRY JavaScript and organized CSS.

## Demo

Try **FoodieFetch** live on GitHub Pages:

[https://.github.io/foodiefetch/](https://.github.io/foodiefetch/](https://muhammadhassansaggaf.github.io/Foodie-Fetch/)

> **Note:** Start the local API server before using the app.

## Installation

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone https://github.com/<your-github-username>/foodiefetch.git
cd foodiefetch

# Install json-server
npm install -g json-server

# Start the mock API\json-server --watch db.json --port 3000

# Launch the frontend
either open index.html or run:
npx live-server .
```

## Usage

1. Type a recipe name in the search box and press Enter or click the search icon.
2. Browse the displayed recipe cards.
3. Click a card to view full details (ingredients and instructions).
4. Click the moon/sun icon in the header to toggle dark mode.
5. Use the sidebar in the future to manage favorites.

## API

The app uses a local JSON API powered by `json-server`:

- **Endpoint**: `GET http://localhost:3000/foods?name=<searchTerm>`
- **Response**: JSON array of objects:

```json
{
  "id": 1,
  "name": "Spaghetti Bolognese",
  "ingredients": ["spaghetti", "beef", "tomato sauce"],
  "instructions": "Cook pasta. Brown beef. Mix with sauce. Serve."
}
```

Edit `db.json` to add or modify recipes.

## Technologies

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (ES6+)
- json-server (mock REST API)
- Font Awesome icons
- Live Server (for local dev)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

