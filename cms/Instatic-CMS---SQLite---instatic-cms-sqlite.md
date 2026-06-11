# Deploy Instatic CMS - SQLite on Railway

Design, build and manage powerful static sites from state-of-the-art CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instatic-cms-sqlite)

## About

Instatic is a self-hosted CMS with a built-in visual editor, clean static publishing, and a first-class plugin system. This template deploys the lightweight SQLite edition on Railway with persistent storage for your database, uploads, published pages, fonts, and plugins.

This template runs Instatic from the official Docker image and mounts a Railway volume at `/app/storage`. SQLite stores the CMS database on that volume, while uploaded media, fonts, plugin packages, and published artefacts live alongside it. Railway handles public HTTPS networking, deployment health checks, runtime variables, and persistent storage. The template also generates `INSTATIC_SECRET_KEY` automatically, so encrypted AI provider credentials and TOTP MFA secrets work without a manual setup script.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| corebunch/instatic:latest | `ghcr.io/corebunch/instatic:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `STATIC_DIR` | /app/dist |
| `UPLOADS_DIR` | /app/storage/uploads |
| `DATABASE_URL` | sqlite:/app/storage/data/cms.db |
| `INSTATIC_SECRET_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/instatic-cms-sqlite)
