# Deploy Rivet on Railway

Self-host Rivet on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/rivet)

## About

[Rivet](https://rivet.dev) manages stateful workloads for AI agents, durable compute, or realtime use cases.

**Quickstart**

Read the [Rivet quickstart](https://www.rivet.dev/docs) to learn how to get started building backends with Rivet.

**Accessing the Rivet dashboard**

1. Navigate to _Rivet_ then _Variables_
2. Copy the secret value of `RIVET__AUTH__ADMIN_TOKEN`
3. Navigate to _Rivet_ then _Deployments_ and click the `*.railway.app` URL
4. Paste your token
5. You can now see the connected Railway runner &amp; all of your actors

**Connecting your app to Rivet**

Get started with the [Rivet quickstart](https://rivet.dev/docs) first.

1. Copy the public URL for the _Rivet_ service
2. Copy the token from the `RIVET__AUTH__ADMIN_TOKEN` variable on the _Rivet_ service
3. Run your RivetKit application with the environment vars:
  - `RIVET_ENGINE=https://your-app.railway.app`
  - `RIVET_TOKEN=your admin token`
4. Start your application
5. You should see your process listed under the _Runners_ tab on the Rivet Dashboard

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Rivet | `rivetkit/engine:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

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

## Configuration

- **Start command:** `rivet-engine start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/rivet)
