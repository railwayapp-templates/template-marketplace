# Deploy openstatus on Railway

Status pages and uptime monitoring, self-hosted entirely on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openstatus)

## About

openstatus is an open-source status page and uptime monitoring platform. It runs HTTP, TCP, DNS, ICMP and gRPC checks from probes you control, records response times and uptime, alerts your team over email, Slack, Discord, PagerDuty and more, and publishes branded status pages with incidents, maintenance windows and subscriber updates.

This template deploys the complete openstatus stack inside one Railway project, with nothing running outside it. It creates the dashboard, the public status page, the API server, the workflows worker, a libSQL database on a volume, a Tinybird Local analytics engine on a volume, the ingest server and four monitoring probes (Virginia, California, Amsterdam, Singapore), a cron sidecar that drives scheduled jobs, and two one-shot jobs that migrate the database and load the analytics schema. Secrets are generated at deploy time. After the first deploy you open the dashboard, take the magic link from its logs, create your workspace, and run one `os-admin setup` command from the cron service to unlock every feature and register the probes. Move three of the four probes to other Railway regions in their service settings to monitor from four continents. Status pages are mapped to a hostname with `os-admin page-domain`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| libsql | [ephraimduncan/openstatus-railway](https://github.com/ephraimduncan/openstatus-railway) (root: libsql) | Database |
| probe-eu-west | `ghcr.io/openstatushq/private-location:latest` | Worker |
| probe | `ghcr.io/openstatushq/private-location:latest` | Worker |
| cron | [ephraimduncan/openstatus-railway](https://github.com/ephraimduncan/openstatus-railway) (root: cron) | Worker |
| private-location | [ephraimduncan/openstatus-railway](https://github.com/ephraimduncan/openstatus-railway) (root: private-location) | Web service |
| db-migrate | `ghcr.io/openstatushq/openstatus-db-migrate:latest` | Worker |
| tinybird-local | [ephraimduncan/openstatus-railway](https://github.com/ephraimduncan/openstatus-railway) (root: tinybird-local) | Database |
| status-page | [ephraimduncan/openstatus-railway](https://github.com/ephraimduncan/openstatus-railway) (root: status-page) | Web service |
| probe-asia | `ghcr.io/openstatushq/private-location:latest` | Worker |
| dashboard | [ephraimduncan/openstatus-railway](https://github.com/ephraimduncan/openstatus-railway) (root: dashboard) | Web service |
| tinybird-deploy | [ephraimduncan/openstatus-railway](https://github.com/ephraimduncan/openstatus-railway) (root: tinybird-deploy) | Worker |
| probe-us-west | `ghcr.io/openstatushq/private-location:latest` | Worker |
| server | [ephraimduncan/openstatus-railway](https://github.com/ephraimduncan/openstatus-railway) (root: server) | Web service |
| workflows | [ephraimduncan/openstatus-railway](https://github.com/ephraimduncan/openstatus-railway) (root: workflows) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `CRON_SECRET` | cron | (secret) |
| `CRON_SECRET` | private-location | (secret) |
| `TINYBIRD_TOKEN` | private-location | (secret) |
| `TB_LOCAL_USER_TOKEN` | tinybird-local | (secret) |
| `TB_LOCAL_WORKSPACE_TOKEN` | tinybird-local | (secret) |
| `AUTH_SECRET` | status-page | (secret) |
| `CRON_SECRET` | status-page | (secret) |
| `RESEND_API_KEY` | status-page | (secret) |
| `TINY_BIRD_API_KEY` | status-page | (secret) |
| `PORT` | dashboard | 3000 |
| `AUTH_SECRET` | dashboard | (secret) |
| `CRON_SECRET` | dashboard | (secret) |
| `RESEND_API_KEY` | dashboard | (secret) |
| `TINY_BIRD_API_KEY` | dashboard | (secret) |
| `TB_TOKEN` | tinybird-deploy | (secret) |
| `CRON_SECRET` | server | (secret) |
| `RESEND_API_KEY` | server | (secret) |
| `TINY_BIRD_API_KEY` | server | (secret) |
| `CRON_SECRET` | workflows | (secret) |
| `RESEND_API_KEY` | workflows | (secret) |
| `TINY_BIRD_API_KEY` | workflows | (secret) |

## Configuration

- **Volume:** `/var/lib/sqld`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/robots.txt`
- **Healthcheck:** `/login`
- **Healthcheck:** `/ping`
- **Volume:** `/app/data`

**Category:** Observability · **Languages:** Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openstatus)
