# Deploy n8n Automation Hub – Self-Hosted on Railway

[Mar'26] Deploy and Host n8n Latest Version with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-latest-version)

## About

<p>
n8n is one of the most powerful open-source workflow automation platforms available today. It enables individuals and teams to connect APIs, services, databases, and AI tools using visual workflows while maintaining full control over their data and execution logic.
</p>

<p>
This page provides a complete, in-depth guide to deploying and hosting the latest version of n8n on Railway. It covers infrastructure requirements, real-world use cases, architectural considerations, cost comparisons, alternatives, and production best practices. If you are looking for the most comprehensive resource on how to self-host n8n without managing servers, this page is designed to be that reference.
</p>

<p>
The n8n Latest Version refers to the most recent stable release of the n8n open-source automation engine. Running the latest version ensures access to newly released workflow nodes, performance improvements, security patches, and compatibility updates with third-party services and APIs.
</p>

<p>
Hosting n8n involves running a long-lived application server with persistent storage, database connectivity, and public networking support for webhook-based workflows. In production environments, this also requires HTTPS configuration, secrets management, database backups, uptime monitoring, scaling strategies, and controlled upgrade paths.
</p>

<p>
Traditional self-hosting approaches require configuring Docker on a VPS, setting up reverse proxies, securing ports, managing firewall rules, handling backups manually, and upgrading n8n versions with care to avoid downtime. This introduces significant operational overhead that distracts teams from building and maintaining automation workflows.
</p>

<p>
Railway removes these complexities by providing a managed deployment platform where infrastructure, networking, scaling, and service health are handled automatically. This template deploys the official n8n Docker image, connects it to a managed PostgreSQL database, and exposes a secure public endpoint for workflows and webhooks with minimal configuration.
</p>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n-railway | [sahilrupani/n8n-railway](https://github.com/sahilrupani/n8n-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n-railway | 5678 | n8n runs internally on port 5678 |
| `DB_TYPE` | n8n-railway | postgresdb | - |
| `WEBHOOK_URL` | n8n-railway | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `N8N_PROXY_HOPS` | n8n-railway | 1 | n8n runs internally on port 5678 but the reverse proxy exposes it to the web on port 443 |
| `DB_POSTGRESDB_USER` | n8n-railway | (secret) | - |
| `EXECUTIONS_DATA_PRUNE` | n8n-railway | true | EXECUTIONS_DATA_PRUNE in n8n is an environment variable that enables automatic deletion of old workflow execution logs |
| `DB_POSTGRESDB_PASSWORD` | n8n-railway | (secret) | - |
| `N8N_EXPRESS_TRUST_PROXY` | n8n-railway | true | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n-railway | filesystem | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n-railway | 200 | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-railway | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-latest-version)
