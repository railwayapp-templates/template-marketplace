# Deploy Supso on Railway

Real-time digital product observability.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/yrOOdm)

## About

This is a self-hosted option for https://supso.co/, the developer-friendly, real-time digital product observability and analytics.

The basic setup of Supso requires just the public URL of your app set and https://app.useplunk.com/ token to send authentication emails.

Read more: https://supso.co/docs/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/palladians/supso:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PUBLIC_APP_URL` | - | The public URL of your Supso. For the cloud instance we use "https://app.supso.co". |
| `SECRET_SQLITE_URL` | (secret) | Path to your SQLite DB file |
| `SECRET_PLUNK_API_KEY` | (secret) | https://useplunk.com/ API key to send emails (auth). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Analytics

[View on Railway →](https://railway.com/template/yrOOdm)
