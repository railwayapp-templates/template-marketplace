# Deploy HTMX + PostgresSQL Starter on Railway

Fast server-side web app with Go, HTMX, and PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/htmx-postgressql-starter)

## About

A modern full-stack Go web application that uses HTMX for dynamic, interactive UIs without JavaScript frameworks. Built with server-side rendering, PostgreSQL database, and hypermedia-driven architecture for fast, SEO-friendly web applications. Perfect for developers who want Go's performance with HTMX's simplicity.

This template deploys a production-ready Go web server with HTMX for interactive components and PostgreSQL for data persistence. The application uses server-side rendering with type-safe HTML templates, eliminating the need for complex JavaScript build tools. Railway automatically configures the PostgreSQL database connection, runs migrations on startup, and provides a public URL. The Docker-optimized multi-stage build ensures fast deployments and minimal resource usage. Your app scales effortlessly with Railway's infrastructure while maintaining full control over your data and deployment environment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| htmx-go-postgres | [TrailBlazors/htmx-go-postgres](https://github.com/TrailBlazors/htmx-go-postgres) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | htmx-go-postgres | - | Complete PostgreSQL connection string for your app (use this in your Go code) |
| `POSTGRES_DB` | Postgres | - | PostgreSQL database name (alternative format) |
| `DATABASE_URL` | Postgres | - | PostgreSQL connection string (automatically references database service) |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL username (alternative format) |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL database password (auto-generated securely) |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL connection URL (use for external connections) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Go, HTML, Dockerfile

[View on Railway →](https://railway.com/template/htmx-postgressql-starter)
