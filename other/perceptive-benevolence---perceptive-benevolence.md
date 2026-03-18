# Deploy perceptive-benevolence on Railway

Deploy Woki-lite in Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/perceptive-benevolence)

## About

WokiLite is a production-ready restaurant reservation system demonstrating Clean Architecture principles. It features automatic table assignment, concurrency-safe booking, timezone-aware scheduling, and a modern React frontend for day-view reservation management. Perfect for showcasing full-stack TypeScript development with enterprise-grade patterns.

Deploying WokiLite involves running a Node.js backend (Express.js API) and serving a React frontend (Vite-built static assets). The backend uses in-memory storage for the core version, making it stateless and easy to deploy without external databases. The system handles restaurant table reservations with automatic assignment algorithms, supports multiple sectors/shifts, and prevents double-booking through concurrency locks. The frontend provides an interactive day-view interface for creating, filtering, and managing reservations with timezone-aware scheduling using IANA timezones (e.g., `America/Argentina/Buenos_Aires`).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| woki-lite | [serugeneris/woki-lite](https://github.com/serugeneris/woki-lite) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `NODE_ENV` | production |
| `LOG_LEVEL` | info |
| `LOGGER_TYPE` | pino |
| `REPOSITORY_TYPE` | in-memory |

## Configuration

- **Start command:** `npm run start:railway`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/template/perceptive-benevolence)
