# Deploy grateful-tranquility on Railway

Deploy and Host grateful-tranquility with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/grateful-tranquility)

## About

Grateful-tranquility is a backend Node.js project using Express that serves dynamic content and can be easily deployed on Railway. It listens on port 8080 and exposes basic routes like `/` and `/health`. This template is designed for learning and experimenting with cloud deployments.

This project is hosted on Railway as a web service. It uses Node.js and Express, listens on port 8080, and exposes routes such as `/` and `/health`. The template is intended for hobbyists and students who want to learn how to deploy a real backend in the cloud with minimal configuration. Its structure is simple but scalable, allowing new routes and business logic to be added easily. With this base, anyone can have a functional server in minutes and document each deployment clearly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |
| `DATABASE_PUBLIC_URL` | postgresql://postgres:PGUWBpZLAssZrMSeezfdKBnVumJVExej@metro.proxy.rlwy.net:10457/railway |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/grateful-tranquility)
