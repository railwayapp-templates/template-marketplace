# Deploy Sessy on Railway

Open-source email observability for AWS SES

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sessy)

## About

Sessy is an open-source email observability tool for Amazon SES. It gives you a beautiful interface to track what happens after you hit send — deliveries, bounces, complaints, opens, clicks, and more — without paying for overpriced email services that are just glorified SES wrappers.

Deploying Sessy on Railway uses the official Docker image (`ghcr.io/marckohlbrugge/sessy:main`). It's a Rails application that stores data in SQLite and uses Solid Queue for background job processing. Sessy needs a persistent volume to retain its SQLite database, job queues, and storage across redeploys. You'll need to set `SECRET_KEY_BASE` for secure session handling and `DISABLE_SSL=true` since Railway handles TLS termination. Once running, configure AWS SES to send event notifications to your Sessy instance's webhook endpoint to start tracking email activity.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sessy | `ghcr.io/marckohlbrugge/sessy:main` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DISABLE_SSL` | true | Disable SSL as its handled by Railway |
| `SECRET_KEY_BASE` | (secret) | Input secret to the application’s key generator |
| `HTTP_AUTH_PASSWORD` | (secret) | Auth password |
| `HTTP_AUTH_USERNAME` | (secret) | Auth username |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/sessy)
