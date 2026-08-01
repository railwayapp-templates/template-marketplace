# Deploy Faved on Railway

Self-hosted bookmark manager with tags, full-text search, SQLite

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/faved)

## About

This template runs Faved on Railway, a cloud platform that handles infrastructure, scaling, and HTTPS. All bookmark data is stored on a persistent volume for durability. Railway provides automatic TLS termination and private networking between services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Faved | [INAPP-Mobile/faved](https://github.com/INAPP-Mobile/faved) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/faved)
