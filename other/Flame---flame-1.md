# Deploy Flame on Railway

Self-hosted startpage dashboard for bookmarks, apps, and widgets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flame-1)

## About

This template runs Flame on Railway, a cloud platform that handles infrastructure, scaling, and HTTPS. All dashboard configuration data is stored on a persistent volume for durability. Railway provides automatic TLS termination and private networking between services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flame | `pawelmalak/flame` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Admin panel password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/flame-1)
