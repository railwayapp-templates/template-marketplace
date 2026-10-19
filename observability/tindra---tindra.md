# Deploy tindra on Railway

Deploy and Host Tindra on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tindra)

## About

Tindra is a self-hosted error tracking, performance monitoring, profiling, uptime monitoring, and cron monitoring platform with full Sentry SDK compatibility. This template deploys the stable release `1.1.1` as a single Go binary backed by PostgreSQL 18, with persistent volumes for the database and uploaded source maps.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tindra-setup | [monotykamary/railway-template-tindra](https://github.com/monotykamary/railway-template-tindra) (root: /setup) | Worker |
| postgres | `postgres:18.6-alpine@sha256:6c538e7206ea40ff740ef27883529390a690b6ead6ba96b44c67a9f7c638e8fd` | Database |
| tindra | `ghcr.io/blendbyte/tindra:1.1.1@sha256:478187c3ae8ed3688de6cf27258e7fa0831920f9017ea859aaf0b70a2bc30ebe` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SETUP_ADMIN_PASSWORD` | tindra-setup | (secret) |
| `POSTGRES_DB` | postgres | tindra |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `BIND_ADDR` | tindra | :8080 |
| `LOG_LEVEL` | tindra | info |
| `LOG_FORMAT` | tindra | json |
| `REQUIRE_MFA` | tindra | true |
| `COOKIE_SECURE` | tindra | true |
| `DISABLE_VERSION_CHECK` | tindra | false |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tindra)
