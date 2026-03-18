# Deploy Rivet Starter on Railway

Self-host Rivet with a starter application on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/rivet-starter)

## About

[Rivet](https://rivet.dev) manages stateful workloads for AI agents, durable compute, or realtime use cases.

**Quickstart**

Read the [Rivet quickstart](https://www.rivet.dev/docs) to learn how to get started building backends with Rivet.

**Accessing your example RivetKit application**

1. Navigate to _Example App_ then _Deployments_
3. Cilck the `*.railway.app` URL
3. This will connect you to an example app using Rivet Actors

**Accessing the Rivet dashboard**

1. Navigate to _Rivet_ then _Variables_
2. Copy the secret value of `RIVET__AUTH__ADMIN_TOKEN`
3. Navigate to _Rivet_ then _Deployments_ and click the `*.railway.app` URL
4. Paste your token
5. You can now see the connected Railway runner &amp; all of your actors

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Rivet | `rivetkit/engine:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Example App | [rivet-dev/template-railway](https://github.com/rivet-dev/template-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Rivet | 6420 | Port Rivet Engine is listening on. |
| `RIVET__POSTGRES__URL` | Rivet | - | Postgres URL to connect to. |
| `RIVET__AUTH__ADMIN_TOKEN` | Rivet | (secret) | Secret admin token to use to manage Rivet. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `RIVET_TOKEN` | Example App | (secret) | Token to connect to the Rivet Engine with. |
| `RIVET_ENDPOINT` | Example App | - | Internal endpoint of Rivet for the backend to connect to. (This value is different than VITE_RIVET_ENGINE.) |
| `VITE_RIVET_ENDPOINT` | Example App | - | Public endpoint of Rivet for the frontend to connect to.  (This value is different than RIVET_ENGINE) |

## Configuration

- **Start command:** `rivet-engine start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, HTML

[View on Railway →](https://railway.com/template/rivet-starter)
