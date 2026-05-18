# Deploy Hemmelig.app on Railway

Hemmelig - Encrypted Secret Sharing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hemmeligapp)

## About

Hemmelig.app is an open-source encrypted secret-sharing app for sending sensitive data securely. It uses client-side encryption, expiring links, view limits, optional passwords, and self-destructing messages so secrets are not exposed to the server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hemmeligapp/hemmelig:v7 | `hemmeligapp/hemmelig:v7` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | Set to production for production deployments	 |
| `DATABASE_URL` | file:/app/database/hemmelig.db | Database connection string |
| `BETTER_AUTH_URL` | - | Public URL of your instance (for proper cookie handling) |
| `HEMMELIG_BASE_URL` | - | Public URL of your instance |
| `BETTER_AUTH_SECRET` | (secret) | Authentication secret (min 32 characters) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/hemmeligapp)
