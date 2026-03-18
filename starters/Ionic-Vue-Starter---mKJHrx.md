# Deploy Ionic Vue Starter on Railway

An Ionic Vue Starter in Typescript, comes already configured with railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mKJHrx)

## About

# <img width="200" alt="Ionic Icon" src="https://ionicframework.com/img/vue/logo@2x.png"> Ionic Vue Starter with TypeScript

This is a starter project for building mobile and web applications using Ionic Vue with TypeScript. It is configured to be deployed on [Railway](https://railway.app).

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
    https://github.com/francis-Paul-code/ionic-vue-starter.git
    cd ionic-vue-starter
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
ionic-vue-starter/
├── public/                     # Static files
├── src/
│   ├── components/             # Reusable components
│   ├── pages/                  # Application pages
│   ├── App.vue                 # Root component
│   ├── main.ts                 # Entry point
│   ├── router/                 # Vue Router configuration
│   └── store/                  # Vuex store configuration
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
| ionic-vue-starter | [francis-Paul-code/ionic-vue-starter](https://github.com/francis-Paul-code/ionic-vue-starter) | Worker |

**Category:** Starters · **Languages:** TypeScript, Vue, HTML, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/mKJHrx)
