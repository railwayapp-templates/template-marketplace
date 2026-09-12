# Deploy OpenStatus on Railway

Uptime monitoring with incident tracking and a public status page

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openstatus-uptime)

## About

Self-host OpenStatus to run synthetic uptime checks against your APIs and publish a branded status page customers can subscribe to. It is the open-source alternative to Better Stack, Instatus and Atlassian Statuspage, for teams who want incident history and a public availability page without handing monitoring data to a vendor. Deploy OpenStatus on Railway and you own the checks, the timeline and the page users see during an outage.

This template runs the full stack, not a cut-down single container. **dashboard** is the admin interface and **status-page** serves the public page on its own domain. **server** is the REST and MCP API, and **workflows** runs the schedulers, incident transitions and notification outbox. **ingest** receives results from probes; **probe** performs the HTTP, TCP, DNS, ICMP and gRPC checks. **libsql** is the database, running Turso's `sqld`, and **bootstrap** applies migrations and wires the probe to your first workspace.

![Diagram of the eight OpenStatus services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1789003382/openstatus-architecture.png)

OpenStatus watches endpoints on a schedule, records each result, opens and resolves incidents automatically, and publishes the outcome. Teams self-host it when monitoring data is sensitive, when endpoints sit inside a private network, or when a status page priced per subscriber stops making sense.

- HTTP, TCP, DNS, ICMP and gRPC monitors with response assertions
- Automatic incident open and resolve, with a public event timeline
- Status pages with components, subscribers, passwords and translations
- Notifications via Slack, Discord, PagerDuty, Opsgenie, ntfy and webhooks
- A REST API and MCP server, so agents and scripts can manage monitors
- Importers for Better Stack, Instatus and Atlassian Statuspage

The split matters when you scale: the probe is its own service, so several can run in different regions or VPCs against one ingest server, and the public page is a separate origin carrying no admin surface.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | `ghcr.io/openstatushq/openstatus-server:latest` | Web service |
| probe | `ghcr.io/openstatushq/private-location:latest` | Worker |
| bootstrap | [gridalpha/openstatus-railway](https://github.com/gridalpha/openstatus-railway) | Worker |
| workflows | `ghcr.io/openstatushq/openstatus-workflows:latest` | Database |
| status-page | `ghcr.io/openstatushq/openstatus-status-page:latest` | Web service |
| libsql | `ghcr.io/tursodatabase/libsql-server:latest` | Database |
| dashboard | `ghcr.io/openstatushq/openstatus-dashboard:latest` | Web service |
| ingest | `ghcr.io/openstatushq/openstatus-private-location:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | server | 3000 | HTTP server listening port |
| `NODE_ENV` | server | production | Production runtime mode |
| `SELF_HOST` | server | true | Enable self-hosted behaviour |
| `FLY_REGION` | server | railway_us-east4-eqdc4a | Region label recorded on checks |
| `CRON_SECRET` | server | (secret) | Shared internal-service secret |
| `DATABASE_URL` | server | - | libSQL connection endpoint |
| `OAUTH_ISSUER` | server | - | MCP authorization server origin |
| `DASHBOARD_URL` | server | - | Consent screen origin |
| `TINYBIRD_NOOP` | server | true | Resolve analytics calls to empty |
| `RESEND_API_KEY` | server | (secret) | Placeholder; set a real key to send mail |
| `SUPER_ADMIN_TOKEN` | server | (secret) | Privileged API operations |
| `OPENSTATUS_KEY` | probe | - | Private-location token |
| `OPENSTATUS_INGEST_URL` | probe | - | Ingest server the probe reports to |
| `PORT` | bootstrap | 3000 | Health server port |
| `CRON_SECRET` | bootstrap | (secret) | Shared internal-service secret |
| `PROBE_TOKEN` | bootstrap | (secret) | Private-location token for the probe |
| `DATABASE_URL` | bootstrap | - | libSQL HTTP endpoint |
| `WORKFLOWS_URL` | bootstrap | - | Workflows service base URL |
| `OPENSTATUS_REF` | bootstrap | main | Ref migrations are read from |
| `WORKSPACE_PLAN` | bootstrap | team | Plan applied to new workspaces |
| `BOOTSTRAP_INTERVAL` | bootstrap | 60 | Seconds between loop iterations |
| `STATUS_PAGE_DOMAIN` | bootstrap | - | Host the first page claims |
| `PROBE_LOCATION_NAME` | bootstrap | railway | Name given to the seeded location |
| `PORT` | workflows | 3000 | HTTP server listening port |
| `NODE_ENV` | workflows | production | Production runtime mode |
| `SITE_URL` | workflows | - | Dashboard public origin |
| `CRON_SECRET` | workflows | (secret) | Shared internal-service secret |
| `PRIVATE_URL` | workflows | http://workflows.railway.internal:3000 | Private endpoint peers reference |
| `DATABASE_URL` | workflows | - | libSQL primary it replicates from |
| `TINYBIRD_NOOP` | workflows | true | Resolve analytics calls to empty |
| `RESEND_API_KEY` | workflows | (secret) | Placeholder; set a real key to send mail |
| `PORT` | status-page | 3000 | HTTP server listening port |
| `HOSTNAME` | status-page | 0.0.0.0 | Next.js bind address |
| `NODE_ENV` | status-page | production | Production runtime mode |
| `SELF_HOST` | status-page | true | Enable self-hosted behaviour |
| `AUTH_SECRET` | status-page | (secret) | Shared session signing key |
| `CRON_SECRET` | status-page | (secret) | Shared internal-service secret |
| `DATABASE_URL` | status-page | - | libSQL connection endpoint |
| `TINYBIRD_NOOP` | status-page | true | Resolve analytics calls to empty |
| `RESEND_API_KEY` | status-page | (secret) | Placeholder; set a real key to send mail |
| `AUTH_TRUST_HOST` | status-page | true | Trust the forwarded host header |
| `OPENSTATUS_API_URL` | status-page | - | API server origin |
| `PORT` | libsql | 8080 | Port Railway health-checks |
| `SQLD_NODE` | libsql | primary | Standalone primary, no replication |
| `PRIVATE_URL` | libsql | http://libsql.railway.internal:8080 | Private endpoint peers reference |
| `SQLD_HTTP_LISTEN_ADDR` | libsql | [::]:8080 | IPv6 bind for private peers |
| `SQLD_MAX_CONCURRENT_REQUESTS` | libsql | 1024 | In-flight request ceiling |
| `SQLD_MAX_CONCURRENT_CONNECTIONS` | libsql | 512 | Connection ceiling across services |
| `PORT` | dashboard | 3000 | HTTP server listening port |
| `AUTH_URL` | dashboard | - | Public origin for auth redirects |
| `HOSTNAME` | dashboard | 0.0.0.0 | Next.js bind address |
| `NODE_ENV` | dashboard | production | Production runtime mode |
| `SELF_HOST` | dashboard | true | Enable magic-link sign-in |
| `AUTH_SECRET` | dashboard | (secret) | NextAuth session signing key |
| `CRON_SECRET` | dashboard | (secret) | Shared internal-service secret |
| `DATABASE_URL` | dashboard | - | libSQL connection endpoint |
| `TINYBIRD_NOOP` | dashboard | true | Resolve analytics calls to empty |
| `RESEND_API_KEY` | dashboard | (secret) | Placeholder; set a real key to send mail |
| `AUTH_TRUST_HOST` | dashboard | true | Trust the forwarded host header |
| `NEXT_PUBLIC_URL` | dashboard | - | Public dashboard URL |
| `OPENSTATUS_API_URL` | dashboard | - | API server origin |
| `PORT` | ingest | 8080 | HTTP server listening port |
| `DB_URL` | ingest | - | libSQL connection endpoint |
| `GIN_MODE` | ingest | release | Production Gin mode |
| `CRON_SECRET` | ingest | (secret) | Shared internal-service secret |
| `PRIVATE_URL` | ingest | http://ingest.railway.internal:8080 | Private endpoint the probe dials |
| `TINYBIRD_URL` | ingest | http://127.0.0.1:9 | Sentinel; analytics disabled |
| `WORKFLOWS_URL` | ingest | - | Where status changes are forwarded |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`
- **Volume:** `/app/data`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/sqld`
- **Healthcheck:** `/login`

**Category:** Observability · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openstatus-uptime)
