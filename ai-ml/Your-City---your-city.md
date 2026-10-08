# Deploy Your City on Railway

Your own AI city: it sorts your Gmail, answers customers, writes posts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/your-city)

## About

Your City is your own AI team, drawn as a 3D city. Each building is a department you name: it sorts your Gmail, drafts replies to new customers, writes your posts and more. A simulated audience tests the work first, and nothing is sent without your OK.

This template runs the Your City app (Node.js) with a PostgreSQL database that keeps your settings, cards and history. Choose a password when you deploy: it is how you open your city. Once it is live, open your city's address and follow the Guide: connect your AI (one click with OpenRouter), tell it about your business, and build your first departments. The Guide also walks you through letting it read your Gmail. Your AI provider bills your usage, with a daily limit you set in the app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| your-city | [blake632/your-city](https://github.com/blake632/your-city) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | your-city | 8080 | The port the app listens on. Leave it at 8080. |
| `DATABASE_URL` | your-city | - | Connects the app to its Postgres database. Filled in for you. |
| `CITY_PASSWORD` | your-city | (secret) | The password you will use to open your city. At least 8 characters. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, HTML

[View on Railway →](https://railway.com/deploy/your-city)
