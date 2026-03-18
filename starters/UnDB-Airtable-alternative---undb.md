# Deploy UnDB (Airtable alternative) on Railway

[Mar ’26] Host Latest Version of UnDB on Railway with one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/undb)

## About

**What is undb?**  
undb is a private-first, open-source nocode platform and backend-as-a-service (BaaS) that enables anyone to build and launch web applications in minutes—no signup required. As an open-source Airtable alternative, undb lets you host your data and workflows yourself, ensuring privacy, flexibility, and complete control over your app infrastructure.

Hosting undb on Railway is the fastest way to deploy your own secure, scalable nocode backend solution. Simply connect the undb repository or Docker image, set up your preferred database, and let Railway automate the setup of your infrastructure, networking, and environment configuration. You get seamless HTTPS, persistent storage, and on-demand scalability without complex DevOps. This makes undb the ideal choice for startups, makers, and teams looking to build internal tools, MVPs, or fully custom products that are private by design and never locked into SaaS fees.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| undb | `ghcr.io/undb-io/undb` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | undb | 3721 | - |
| `LOG_LEVEL` | undb | debug | - |
| `UNDB_ADMIN_EMAIL` | undb | - | Email for logging in |
| `UNDB_DB_PROVIDER` | undb | postgres | - |
| `UNDB_ADMIN_PASSWORD` | undb | (secret) | Password for logging in |
| `UNDB_DISABLE_REGISTRATION` | undb | true | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/undb)
