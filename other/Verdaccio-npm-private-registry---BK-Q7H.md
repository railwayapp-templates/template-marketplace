# Deploy Verdaccio (npm private registry) on Railway

Verdaccio — a lightweight Node.js private proxy registry

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/BK-Q7H)

## About

Verdaccio is a simple, zero-config-required local private NPM registry. No need for an entire database just to get started. Verdaccio comes out of the box with its own tiny database, and the ability to proxy other registries (eg. npmjs.org), also introduces caching the downloaded modules along the way. For those who are looking to extend their storage capabilities, Verdaccio supports various community-made plugins to hook into services such as Amazon's S3, Google Cloud Storage or create your own plugin.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| registry | `verdaccio/verdaccio` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port |
| `VERDACCIO_PORT` | - | Verdaccio Port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/verdaccio/storage`

**Category:** Other

[View on Railway →](https://railway.com/template/BK-Q7H)
