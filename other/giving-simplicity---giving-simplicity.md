# Deploy giving-simplicity on Railway

Deploy and Host tadaima with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/giving-simplicity)

## About

tadaima

tadaima

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| @tadaima/relay | [psychout98/tadaima](https://github.com/psychout98/tadaima) (root: /) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | tadaima |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm --filter @tadaima/relay start`

**Category:** Other · **Languages:** TypeScript, HTML, Swift, C#, Shell, JavaScript, PowerShell, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/giving-simplicity)
