# Deploy Invio on Railway

Self-hosted invoicing without the bloat.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/invio)

## About

**Invio** is a fast, minimalist, self-hosted invoicing application designed to help you create and share invoices quickly without unnecessary complexity. It focuses on control and simplicity, giving you full ownership of your data and the ability to host it wherever you choose.  [Invio](https://invio.dev/)

Hosting Invio on Railway involves deploying a lightweight web application that runs with technologies like **Deno, Fresh (frontend), Hono (backend), and SQLite** as its database backend. Because Invio is self-hosted by design, Railway allows you to run it in a managed environment with minimal configuration, handling things like networking, scaling, and deployment pipelines. You’ll connect your repository, set up any required environment variables, configure persistent storage for the database, and then deploy — after which Railway manages uptime and scalability for your instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | `ghcr.io/kittendevv/invio-frontend:latest` | Web service |
| backend | `ghcr.io/kittendevv/invio-backend:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | frontend | 8000 | - |
| `ENABLE_HSTS` | frontend | false | - |
| `RATE_LIMIT_ENABLED` | frontend | - | Enable or disable rate limiting for login endpoint (default: true) |
| `FRONTEND_PORT_INTERNAL` | frontend | 8000 | - |
| `RATE_LIMIT_TRUST_PROXY` | frontend | - | Trust X-Forwarded-For header for client IP detection (set to true when behind reverse proxy) Set to true if using nginx, Apache, Caddy, or running in Docker with a reverse proxy |
| `RATE_LIMIT_MAX_ATTEMPTS` | frontend | - | Maximum failed login attempts before blocking (default: 5) |
| `RATE_LIMIT_WINDOW_SECONDS` | frontend | - | Time window in seconds for rate limiting (default: 900 = 15 minutes) |
| `FRONTEND_SECURE_HEADERS_DISABLED` | frontend | false | - |
| `PORT` | backend | 3000 | - |
| `ADMIN_USER` | backend | (secret) | - |
| `JWT_SECRET` | backend | (secret) | - |
| `COOKIE_SECURE` | backend | true | - |
| `RATE_LIMIT_ENABLED` | backend | true | Enable or disable rate limiting for login endpoint (default: true) |
| `SESSION_TTL_SECONDS` | backend | 3600 | - |
| `RATE_LIMIT_TRUST_PROXY` | backend | true | Trust X-Forwarded-For header for client IP detection (set to true when behind reverse proxy) Set to true if using nginx, Apache, Caddy, or running in Docker with a reverse proxy |
| `RATE_LIMIT_MAX_ATTEMPTS` | backend | 5 | Maximum failed login attempts before blocking (default: 5) |
| `SECURE_HEADERS_DISABLED` | backend | false | - |
| `RATE_LIMIT_WINDOW_SECONDS` | backend | 900 | Time window in seconds for rate limiting (default: 900 = 15 minutes) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data/`

**Category:** Automation

[View on Railway →](https://railway.com/template/invio)
