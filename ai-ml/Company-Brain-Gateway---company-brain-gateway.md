# Deploy Company Brain Gateway on Railway

One isolated private GitHub brain for Codex/Claude in buyer-owned Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/company-brain-gateway)

## About

Company Brain Gateway gives one company governed remote MCP access to a private GitHub Company Brain without giving teammates local Git clones. Each deployment is isolated and owned by the buyer in Railway.

The template deploys two services: the exact Company Brain Gateway v0.1.0 image and a pinned PgVector database. It also creates separate persistent volumes for the repository workspace and database. Only the Gateway receives a public domain; PgVector remains private.

After deployment, use the Gateway administrator interface to bootstrap the first administrator, create the repository deploy key, add its public half to one private GitHub repository, seal the one-time private value in Railway, switch setup mode off, redeploy, then connect and index the Company Brain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PgVector | `pgvector/pgvector:pg16@sha256:1d533553fefe4f12e5d80c7b80622ba0c382abb5758856f52983d8789179f0fb` | Database |
| Gateway | `ghcr.io/colin-atlas/atlas-company-brain-gateway@sha256:7b03130159343006f80400fa47ec94505f846dbfa9eecdede868b60743c7ccbc` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | PgVector | gateway | Database name used by the Company Brain Gateway. |
| `POSTGRES_USER` | PgVector | (secret) | Database user used by the Company Brain Gateway. |
| `POSTGRES_PASSWORD` | PgVector | (secret) | Generated database password. Keep the generated value. |
| `NODE_ENV` | Gateway | production | Runs the Company Brain Gateway in production mode. |
| `REPO_ROOT` | Gateway | /srv/company-brain-repos/company-brain | Persistent Company Brain checkout path inside the Gateway volume. Keep the default. |
| `ENABLE_DCR` | Gateway | false | Dynamic Client Registration is disabled by default for a safer launch. |
| `PUBLIC_URL` | Gateway | - | Automatically uses the Gateway service public Railway domain. |
| `REPO_BRANCH` | Gateway | main | Git branch containing canonical Company Brain truth. |
| `DATABASE_URL` | Gateway | - | Private PgVector connection string generated from the database service. |
| `REPO_SSH_URL` | Gateway | - | Required: SSH clone URL for the private Company Brain repository, for example git@github.com:YOUR_ORG/YOUR_COMPANY_BRAIN.git. |
| `LOCAL_MODEL_PATH` | Gateway | /app/models | Bundled local embedding model path. Keep the default. |
| `APP_ENCRYPTION_KEY` | Gateway | - | Generated 64-character hexadecimal key used to encrypt Gateway secrets. |
| `GATEWAY_SETUP_MODE` | Gateway | true | Starts in setup mode so the founder can generate and install the repository deploy key. Set to false after setup. |
| `TRUSTED_PROXY_CIDRS` | Gateway | 100.0.0.0/8 | Railway private proxy CIDR used to trust forwarded client details. |
| `ADMIN_BOOTSTRAP_SECRET` | Gateway | (secret) | Generated administrator bootstrap secret. Store it securely before first login. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv/company-brain-repos`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/company-brain-gateway)
