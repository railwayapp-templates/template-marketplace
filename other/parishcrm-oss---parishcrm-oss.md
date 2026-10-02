# Deploy parishcrm-oss on Railway

Self-hosted church CRM: members, events, accounting

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/parishcrm-oss)

## About

ParishCRM is a free, open-source (AGPL-3.0), self-hosted church management system: families and members, accounting, event ticketing, petty cash, membership and receipts in one app your church runs itself. Member contact details are encrypted at rest.

This template deploys three services: the ParishCRM app (a released Docker image), a PostgreSQL database, and a small `cron` service. Every 30 minutes, the `cron` service sends event reminders, cleans up abandoned checkouts and sends celebration emails. Database migrations run automatically when the app starts. Secrets (`AUTH_SECRET`, `ENCRYPTION_KEY`, `CRON_SECRET`, `SETUP_TOKEN`) are generated for you. You only enter your church name and a [Resend](https://resend.com) API key and sender address, because Railway blocks outbound SMTP on Free, Trial and Hobby plans.

After deploy, open `/setup` on your app URL and paste `SETUP_TOKEN` from the app's Variables tab to create your admin account. **Back up `ENCRYPTION_KEY`**: if it is lost, encrypted member data cannot be recovered.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cron | `curlimages/curl:latest` | Worker |
| parishcrm | `ghcr.io/ginutgeorge-aus/parishcrm:v1.3.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `CRON_SECRET` | cron | (secret) |
| `AUTH_SECRET` | parishcrm | (secret) |
| `CRON_SECRET` | parishcrm | (secret) |
| `SETUP_TOKEN` | parishcrm | (secret) |
| `RESEND_API_KEY` | parishcrm | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'rc=0; c(){ curl -fsS -X POST -H "Authorization: Bearer $CRON_SECRET" "$APP_URL/api/cron/$1" ||   rc=1; echo; }; c send-reminders; m=$(date -u +%M); h=$(date -u +%H); [ "$m" -lt 30 ] && c   sweep-checkouts; [ "$h" = 21 ] && [ "$m" -lt 30 ] && c send-celebrations; exit $rc'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/parishcrm-oss)
