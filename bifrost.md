# Deploy Bifrost on Railway

Tiny encryption API in Rust

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bifrost)

## About

Bifrost is a lightweight Rust microservice for storing data securely using AES-256-GCM encryption. It provides a simple REST API for creating, retrieving, and deleting encrypted secrets, leveraging the Rust Ring cryptography library for robust security.

Hosting Bifrost requires a PostgreSQL database for persistent storage and a few environment variables for configuration. The service automatically creates the required database schema on startup, making deployment straightforward. You'll need to generate a 32-character encryption key for AES-256-GCM and an API key for authenticating requests. Once deployed, Bifrost exposes a REST API on port 8080 that your applications can use to securely store and retrieve sensitive data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bifrost | [arjunkomath/Bifrost](https://github.com/arjunkomath/Bifrost) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port to listen |
| `API_KEY` | (secret) | API key for authenticating requests (sent via `x-api-key` header) |
| `DATABASE_URL` | - | PostgreSQL connection string |
| `ENCRYPTION_KEY` | - | Must be exactly 32 characters for AES-256-GCM encryption |

## Configuration

- **Healthcheck:** `/health`

**Category:** Other · **Languages:** Rust, Dockerfile

[View on Railway →](https://railway.com/template/bifrost)
