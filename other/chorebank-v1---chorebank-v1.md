# Deploy chorebank-v1 on Railway

A template for Chorebank, a self-hosted family chore and rewards board.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chorebank-v1)

## About

Chorebank is a private, self-hosted chore and rewards board for families. Parents create chores, award stars, run payday, and manage rewards. Kids track their progress, earn coins, and request rewards through a tablet-friendly interface. Household data remains in the PostgreSQL database you control.

This template provisions Chorebank and PostgreSQL together with persistent database storage, private service networking, generated security secrets, automatic database migrations, and a database-aware health check. No deployment configuration is required.

After deployment, open the Chorebank service variables and copy `SETUP_TOKEN`. Visit the generated public domain, complete `/setup`, and create your household, parent login, kid PIN, and first child. Setup permanently closes after the household is created. Parent passwords and kid PINs are stored as secure hashes. Household owners remain responsible for enabling PostgreSQL backups and reviewing updates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| chorebank | [dhalarewich/chorebank](https://github.com/dhalarewich/chorebank) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `NODE_ENV` | chorebank | production | - |
| `AUTH_SECRET` | chorebank | (secret) | - |
| `SETUP_TOKEN` | chorebank | (secret) | Copy this value into /setup. Seal it after household setup is complete. |
| `TENANCY_MODE` | chorebank | single | - |
| `DEFAULT_HOUSEHOLD_ID` | chorebank | home | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/chorebank-v1)
