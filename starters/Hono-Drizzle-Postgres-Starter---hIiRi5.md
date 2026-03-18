# Deploy Hono Drizzle Postgres Starter on Railway

A powerful Hono Backend with Drizzle and Postgres for Node.js/Bun

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hIiRi5)

## About

# REST API with DB

A powerful Hono Backend with Drizzle and Postgres for Node.js/Bun

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/hIiRi5?referralCode=CODE)

## Overview

This project demonstrates a robust REST API built with Hono, using Drizzle ORM for database operations with PostgreSQL. It's designed to run on Bun, providing a fast and efficient backend solution. The project structure allows for easy deployment on Railway, making it ideal for rapid development and scaling.

## Key Features

- Fast REST API using Hono framework
- Database integration with Drizzle ORM and PostgreSQL
- Runs on Bun for improved performance
- Easy deployment to Railway
- Health check endpoint for monitoring
- User management API endpoint
- Dockerized for consistent environments

## Setup

To install dependencies:

```bash
bun install
```

Set up your .env file with your database URL:

```bash
DATABASE_URL=your_postgres_url_here
```

## DB

To generate database migrations, use the following command:

```bash
bun run db:generate
```

To apply the generated migrations to the database, run:

```bash
bun run db:push
```

To seed the database with sample data, execute:

```bash
bun run db:seed
```

## Develop

To run the application locally, execute the following command in your terminal:

```bash
bun run dev
```

## Deploy

Initialize your project:

```bash
railway init
```

To deploy the bot on Railway:

```bash
railway up
```

Remember to set the `DATABASE_URL` environment variable in your Railway project settings.

![DATABASE_URL](https://github.com/user-attachments/assets/eab66d70-ebe5-42fa-b1dd-3859cdbc199a)

## Learn More

- [Hono Documentation](https://hono.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Bun Documentation](https://bun.sh/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Repository](https://github.com/aeither/railway-rest-api-with-db)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| hono-drizzle-postgres-railway | [aeither/hono-drizzle-postgres-railway](https://github.com/aeither/hono-drizzle-postgres-railway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/hIiRi5)
