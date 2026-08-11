# Deploy Verdaccio | Open Source Private npm Registry and Proxy Cache on Railway

Private npm registry that also caches npmjs.com for faster installs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/BK-Q7H)

## About

Verdaccio is a lightweight private npm registry. It proxies and caches the public registry, and hosts your own private packages alongside it — `npm install` keeps working exactly as before, but scoped packages resolve to your instance instead of npmjs.com.

A single service with a persistent volume for package storage and the user database. Point npm at the public domain and it works: published tarballs and cached upstream packages both land on the volume.

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

[View on Railway →](https://railway.com/deploy/BK-Q7H)
