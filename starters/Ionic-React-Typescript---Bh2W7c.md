# Deploy Ionic React Typescript on Railway

An Ionic React Starter in Typescript, comes already configured with railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Bh2W7c)

## About

# <img src="https://present-react.ionicframework.com/assets/img/ionic-react-icon.png" alt="Ionic Icon" width="200"> Ionic React Starter

This is a starter project for building mobile and web applications using Ionic React. It is configured to be deployed on [Railway](https://railway.app).

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deploying to Railway](#deploying-to-railway)
- [License](#license)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (&gt;= 12.x)
- [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/))
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)
- [Railway CLI](https://docs.railway.app/cli/)

### Installation

1. Clone the repository:

    ```bash
    https://github.com/francis-Paul-code/ionic-react-railway-starter.git
    cd ionic-react-starter
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Running the App

To start the development server:

```bash
ionic serve
```
## Project Structure
```
ionic-react-starter/
├── public/                     # Static files
├── src/
│   ├── components/             # Reusable components
│   ├── pages/                  # Application pages
│   ├── App.tsx                 # Root component
│   ├── index.tsx               # Entry point
│   └── theme/                  # Application theme
├── ionic.config.json           # Ionic configuration
├── package.json                # NPM dependencies and scripts
└── README.md                   # Project documentation
```
## Deploying to Railway
1. Login to Railway CLI:
   ```
   railway login
   ```
2. Initialize a new Railway project:
   ```
   railway init
   ```
3. Deploy the project:
   ```
   railway up
   ```
   For more detailed instructions, refer to the Railway documentation.
## License
  This project is licensed under the MIT License. See the LICENSE file for more details.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ionic-react-railway-starter | [francis-Paul-code/ionic-react-railway-starter](https://github.com/francis-Paul-code/ionic-react-railway-starter) | Worker |

**Category:** Starters · **Languages:** TypeScript, HTML, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/Bh2W7c)
