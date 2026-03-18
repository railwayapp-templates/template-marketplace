# Deploy Meteor on Railway

A simple starter project for a Meteor full-stack Javascript Framework

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/NGEqSA)

## About

# <img src="https://dmtgy0px4zdqn.cloudfront.net/images/brand/meteor-white-text-logo-orange.png" alt="Ionic Icon" width="200">

# Meteor Starter Project

Welcome to the Meteor.js Starter Project! This repository provides a boilerplate for a Meteor.js application, fully configured for deployment on [Railway](https://railway.app).

## Features

- **Meteor.js**: A full-stack JavaScript platform for building modern web and mobile applications.
- **Dockerized Setup**: Pre-configured Docker support for local development.
- **Railway Deployment**: Ready to be deployed on Railway with minimal configuration.
- **Environment Configuration**: Easy management of environment variables for production readiness.

## Prerequisites

- **Node.js**: Ensure you have Node.js and npm installed.
- **Docker**: Ensure you have Docker installed on your machine for local development.
- **Railway CLI**: Install the Railway CLI for deploying your project to Railway.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/francis-Paul-code/meteor-starter
cd meteor-starter
```

### 2. Install Dependencies

Use npm to install the project dependencies:

```bash
meteor npm install
```

### 3. Run the Project Locally

You can start the Meteor.js application locally with:

```bash
meteor
```

Your Meteor.js application should now be running on [http://localhost:3000](http://localhost:3000).

### 4. Set Up Environment Variables

If your application relies on environment variables, create a `.env` file in the root of your project or copy the existing `.env.example`:

```bash
cp .env.example .env
```

### 5. Build the Project for Production

If you want to build the project for production:

```bash
meteor build ../output --directory
```

This command will generate the production-ready files in the `output` directory.

### 6. Build and Run with Docker

Use Docker to build and run the project locally:

```bash
docker-compose up --build
```

### 7. Deploy to Railway

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
| meteor-starter | [francis-Paul-code/meteor-starter](https://github.com/francis-Paul-code/meteor-starter) | Worker |

**Category:** Starters · **Languages:** JavaScript, HTML, CSS

[View on Railway →](https://railway.com/deploy/NGEqSA)
