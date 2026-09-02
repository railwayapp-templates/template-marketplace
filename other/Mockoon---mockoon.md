# Deploy Mockoon on Railway

A powerful mock API platform for testing, prototyping, and development.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mockoon)

## About

Mockoon is an open-source API mocking platform for creating realistic REST API environments without building a backend first. It helps developers prototype integrations, simulate external services, test frontend applications, reproduce API scenarios, and work with OpenAPI specifications using a lightweight and developer-friendly mock server.

Hosting Mockoon on Railway provides a simple way to run a persistent, publicly accessible mock API server using the official Mockoon CLI container.

This template runs Mockoon as a lightweight single service and loads its API environment from a configurable remote Mockoon JSON file or OpenAPI specification. Railway handles HTTPS, public networking, deployment, and container lifecycle automatically.

No PostgreSQL, Redis, or additional infrastructure is required. This makes the deployment suitable for development, integration testing, API prototyping, demos, and temporary or long-running mock environments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mockoon-cli | `mockoon/cli:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Mock API listening port |
| `MOCKOON_DATA_URL` | https://raw.githubusercontent.com/user/repo/main/mockoon.json | Mockoon environment definition |

## Configuration

- **Start command:** `/bin/sh -c 'exec mockoon-cli start --data "$MOCKOON_DATA_URL" --port "$PORT" --hostname 0.0.0.0 --public-base-url "https://$RAILWAY_PUBLIC_DOMAIN"'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/mockoon)
