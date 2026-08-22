# Deploy Sierpe on Railway

Self-hosted Stellar indexer: register a contract, get its full history.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sierpe)

## About

Sierpe is a self-hosted Stellar indexer. Register a Soroban contract and Sierpe reads its on-chain spec, follows the network tip and backfills its complete history: events, contract state, decoded token transfers, classic trustlines of SAC assets and every token movement in or out of the contract. Everything lands in your own Postgres behind an honest REST API and a built-in management UI.

This template deploys two services wired together: a Postgres database that Sierpe owns (it runs its own migrations) and the Sierpe container from the public image ghcr.io/zkcaleb-dev/sierpe. The admin token and the Basic Auth password are generated for your deployment, so the instance is private from the first minute. After deploying, open the generated domain, sign in with the HTTP_BASIC_AUTH value from the Variables tab, paste ADMIN_TOKEN into the UI admin box and register your first contract. Sierpe classifies it, backfills its history and keeps following the tip. It runs on testnet out of the box; for mainnet set NETWORK=mainnet and provide RPC_URLS, since there is no free public mainnet RPC. Every response declares its coverage, so you always know which ledger ranges the instance can vouch for.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sierpe | `ghcr.io/zkcaleb-dev/sierpe:v1.5.2` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NETWORK` | sierpe | testnet | Stellar network to index: testnet or mainnet. Mainnet also needs RPC_URLS (no free public mainnet RPC exists). |
| `HTTP_PORT` | sierpe | 8080 | Port the API listens on. Keep 8080: it matches the public domain target port. |
| `ADMIN_TOKEN` | sierpe | (secret) | Bearer token that gates contract registration (generated per deployment). Paste it in the UI admin box or send it as Authorization: Bearer. |
| `DATABASE_URL` | sierpe | - | Connection string of the Postgres service in this template. Sierpe owns that database and runs its own migrations. |
| `HTTP_BASIC_AUTH` | sierpe | - | user:password for the whole surface (UI, API, metrics) on the public domain; generated per deployment. Sign in with it, then paste ADMIN_TOKEN in the UI to register contracts. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/sierpe)
