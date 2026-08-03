# Deploy Wallos on Railway

Self-hosted subscription tracker with budgets, categories, and currencies.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wallos-1)

## About

Wallos is an open-source, self-hosted subscription and recurring-expense tracker. It helps individuals and households organize subscriptions, payment dates, categories, currencies, budgets, logos, dashboards, and notifications while keeping financial data on infrastructure they control.

Hosting Wallos on Railway means running one public, digest-pinned container with persistent storage for its SQLite database and uploaded subscription logos. The service listens on container port `80`, uses Railway's generated HTTPS domain, and checks `/` for health. The template supplies UTC and Linux ownership defaults (`TZ=Etc/UTC`, `PUID=1000`, and `PGID=1000`) so the upstream image starts without credentials or an external database. Users complete Wallos's first-run account setup in the browser and configure optional integrations, such as exchange-rate, notification, or OIDC providers, inside Wallos when needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Wallos | `bellamy/wallos:5.4.2@sha256:316f26e13265958e7946ef98ff600516fddc51d698ee98bd1ae1577e5e00789f` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Etc/UTC |
| `PGID` | 1000 |
| `PORT` | 80 |
| `PUID` | 1000 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wallos-1)
