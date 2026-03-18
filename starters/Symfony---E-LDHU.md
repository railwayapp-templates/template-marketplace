# Deploy Symfony  on Railway

Simple starter for a Symfony application, fully configured for deployment 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/E-LDHU)

## About

# <img width="200" alt="Ionic Icon" src="https://symfony.com/logos/symfony_black_03.png">

# Symfony Starter Project

Welcome to the Symfony Starter Project! This repository provides a boilerplate for a Symfony application, fully configured for deployment on [Railway](https://railway.app).

## Features

- **Symfony 6.x**: The latest version of the Symfony framework.
- **Dockerized Setup**: Pre-configured Docker support for local development.
- **Railway Deployment**: Ready to be deployed on Railway with minimal configuration.
- **Environment Configuration**: Seamless integration with environment variables for production readiness.

## Prerequisites

- **Docker**: Ensure you have Docker installed on your machine for local development.
- **Railway CLI**: Install the Railway CLI for deploying your project to Railway.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/francis-Paul-code/railway-symfony-webapp-starter.git
cd railway-symfony-webapp-starter
```

### 2. Set Up Environment Variables

Create a `.env` file in the root of your project or copy the existing `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials and other necessary configurations.

### 3. Build and Run the Project

Use Docker to build and run the project locally:

```bash
docker-compose up --build
```

Your Symfony application should now be running on [http://localhost:8000](http://localhost:8000).

### 4. Deploy to Railway

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
| railway-symfony-webapp-starter | [francis-Paul-code/railway-symfony-webapp-starter](https://github.com/francis-Paul-code/railway-symfony-webapp-starter) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | railway-symfony-webapp-starter | prod | - |
| `APP_SECRET` | railway-symfony-webapp-starter | (secret) | - |
| `MESSENGER_TRANSPORT_DSN` | railway-symfony-webapp-starter | doctrine://default?auto_setup=0 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** PHP, JavaScript, Twig, CSS

[View on Railway →](https://railway.com/template/E-LDHU)
