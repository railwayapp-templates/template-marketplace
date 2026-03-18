# Deploy Ionic Angular with Standalone on Railway

An Ionic Angular Starter in Typescript with Standalone Components

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/V7xS0V)

## About

# <img width="150" alt="Ionic Icon" src="https://ionicframework.com/img/angular/logo@2x.png"> Ionic Angular Starter

This is a starter project for building mobile and web applications using Ionic Angular with standalone components. It is configured to be deployed on [Railway](https://railway.app).

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
    git clone https://github.com/francis-Paul-code/ionic-angular-standalone-starter.git
    cd ionic-angular-starter
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
ionic-angular-starter/
├── src/
│   ├── app/
│   │   ├── components/         # Reusable standalone components
│   │   ├── pages/              # Application pages as standalone components
│   │   ├── app.component.ts    # Root component
│   │   ├── app.module.ts       # Root module
│   │   └── main.ts             # Main entry point
│   ├── assets/                 # Static assets
│   ├── theme/                  # Application theme
│   ├── index.html              # HTML entry point
│   ├── styles.css              # Global styles
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
| ionic-angular-standalone-starter | [francis-Paul-code/ionic-angular-standalone-starter](https://github.com/francis-Paul-code/ionic-angular-standalone-starter) | Worker |

**Category:** Starters · **Languages:** TypeScript, SCSS, JavaScript, HTML

[View on Railway →](https://railway.com/template/V7xS0V)
