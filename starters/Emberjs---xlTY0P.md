# Deploy Ember.js on Railway

An Ember.js starter in Javascript, comes already configured with railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xlTY0P)

## About

# <img src="https://emberjs.com/images/brand/ember-4c.svg" alt="Ionic Icon" width="300">

# Ember.js Starter Project

Welcome to the Ember.js Starter Project! This repository provides a boilerplate for an Ember.js application, fully configured for deployment on [Railway](https://railway.app).

## Features

- **Ember.js**: A productive and battle-tested JavaScript framework for building modern web applications.
- **Dockerized Setup**: Pre-configured Docker support for local development.
- **Railway Deployment**: Ready to be deployed on Railway with minimal configuration.
- **Environment Configuration**: Easy management of environment variables for production readiness.

## Prerequisites

- **Node.js**: Ensure you have Node.js and npm (or yarn) installed.
- **Docker**: Ensure you have Docker installed on your machine for local development.
- **Railway CLI**: Install the Railway CLI for deploying your project to Railway.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/francis-Paul-code/ember-railway-starter
cd ember-starter
```

### 2. Install Dependencies

Use npm or yarn to install the project dependencies:

```bash
npm install
# or
yarn install
```

### 3. Build the Project

Build the Ember.js project for production:

```bash
ember build --environment production
```

This command will generate the `dist` directory containing the production-ready static files.

### 4. Set Up Environment Variables

If your application relies on environment variables, create a `.env` file in the root of your project or copy the existing `.env.example`:

```bash
cp .env.example .env
```

### 5. Build and Run Locally with Docker

Use Docker to build and run the project locally:

```bash
docker-compose up --build
```

Your Ember.js application should now be running on [http://localhost:4200](http://localhost:4200).

### 6. Deploy to Railway

To deploy the project to Railway, follow these steps:

1. Initialize a new Railway project:

```bash
railway init
```

2. Deploy your project:

```bash
railway up
```

Railway will automatically detect your environment variables and configuration. Your application will be deployed and accessible at a generated Railway URL.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. We welcome all improvements!

## License

This project is licensed under the MIT License.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ember.js | [francis-Paul-code/ember-railway-starter](https://github.com/francis-Paul-code/ember-railway-starter) | Worker |

**Category:** Starters · **Languages:** JavaScript, HTML, Handlebars, CSS

[View on Railway →](https://railway.com/deploy/xlTY0P)
