# Deploy Stackray on Railway

Inspect the stack of any site. Tech and web intelligence for your team. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stackray)

## About

Stackray is a self-hosted site intelligence app for scanning domains and URLs, detecting the technologies behind them, and keeping a searchable record of what changed over time. It combines HTTP probing, browser rendering, DNS enrichment, subdomain discovery, IP intelligence, screenshots, Nuclei-backed checks, and technology detection in one queue-backed workspace.

<p align="center">
  <img alt="Stackray dashboard showing recent scans, scan metrics, and detected technologies" src="https://raw.githubusercontent.com/CarlosCommits/stackray/main/public/stackray-dashboard.jpg">
</p>

This Railway template provisions the full Stackray stack in one flow: the Next.js web app and HTTP/JSON API, dedicated scanner workers, Postgres for app data and Graphile Worker jobs, and S3-compatible object storage for screenshots and scan artifacts. You do not need to manually wire the scanner roles, database, or storage bucket. Deploy the template, generate a public domain for the `Stackray-website` service, create the first admin account, and start scanning from the dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker-intel | [CarlosCommits/stackray](https://github.com/CarlosCommits/stackray) | Worker |
| Stackray-website | [CarlosCommits/stackray](https://github.com/CarlosCommits/stackray) | Web service |
| worker-browser | [CarlosCommits/stackray](https://github.com/CarlosCommits/stackray) | Worker |
| worker-http | [CarlosCommits/stackray](https://github.com/CarlosCommits/stackray) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `STACKRAY_WORKER_ROLE` | worker-intel | intel | - |
| `AWS_SECRET_ACCESS_KEY` | worker-intel | (secret) | - |
| `STACKRAY_SCHEMA_OWNER` | worker-intel | - | For the worker to wait for Stackray-website deployment, because Stackray-website predeploy command is what runs db migration script |
| `STACKRAY_WORKER_CONCURRENCY` | worker-intel | 8 | - |
| `BETTER_AUTH_SECRET` | Stackray-website | (secret) | - |
| `AWS_SECRET_ACCESS_KEY` | Stackray-website | (secret) | - |
| `STACKRAY_SCHEMA_OWNER` | Stackray-website | ready | For workers to wait for website readiness, since website predeploy script runs the db migration script |
| `STACKRAY_WORKER_ROLE` | worker-browser | browser | - |
| `AWS_SECRET_ACCESS_KEY` | worker-browser | (secret) | - |
| `STACKRAY_SCHEMA_OWNER` | worker-browser | - | For the worker to wait for Stackray-website deployment, because Stackray-website predeploy command is what runs db migration script |
| `STACKRAY_WORKER_CONCURRENCY` | worker-browser | 3 | - |
| `STACKRAY_WORKER_ROLE` | worker-http | http | - |
| `AWS_SECRET_ACCESS_KEY` | worker-http | (secret) | - |
| `STACKRAY_SCHEMA_OWNER` | worker-http | - | For the worker to wait for Stackray-website deployment, because Stackray-website predeploy command is what runs db migration script |
| `STACKRAY_WORKER_CONCURRENCY` | worker-http | 15 | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types worker/start.ts`
- **Start command:** `HOSTNAME=0.0.0.0 node .next/standalone/server.js`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/stackray)
