# Deploy Self-Hosted Uptime Monitoring & Status Page on Railway — Gatus on Railway

Self-host Gatus: uptime monitoring & status page. No per-endpoint fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gatus-uptime-monitoring)

## About

![Gatus self-hosted uptime monitoring and status page](https://res.cloudinary.com/asset-cloudinary/image/upload/v1778609267/b87c8eeb-e9cf-4fd4-b32d-14d39ee829c3.png)

Gatus is an open-source, developer-oriented health dashboard with **10k+ GitHub stars** —
monitor HTTP, ICMP, TCP, DNS, GraphQL endpoints and TLS certificate expiry from a single
YAML config file. Built-in status page, Prometheus metrics export, and native alerts to
Slack, Discord, Teams, PagerDuty, Twilio, and 20+ providers. Every monitor is code — version-
controlled, GitOps-friendly, and deployable in seconds.

Self-host on Railway for ~$2–5/month. Pingdom charges $15–100+/month for basic uptime checks.
Better Uptime starts at $29/month. Gatus gives you unlimited endpoints, unlimited alert rules,
and a public status page at flat Railway compute cost with zero per-endpoint fees.

---

Running Gatus in production requires a persistent database for uptime history, a public HTTPS
endpoint for the status page and badge embeds, and secure environment variable handling for
alerting credentials. Without a managed host, you're configuring Docker, volume mounts, SSL,
and process restarts manually.

Railway provisions all of it. Gatus deploys as a single container connected to Railway-managed
PostgreSQL over private networking. Your YAML config — stored in the repository you fork —
defines every monitor and alert rule. Push a config change and Railway auto-deploys it.

Typical cost: **~$2–5/month** on Railway's Hobby plan for Gatus and PostgreSQL. Pingdom
Standard charges $15/month for 10 uptime checks with 1-minute intervals. Better Uptime
starts at $29/month. Gatus on Railway monitors unlimited endpoints at any interval you
configure — no per-endpoint pricing, no tier limits.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gatus | [sahilrupani/gatus-railway](https://github.com/sahilrupani/gatus-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `GATUS_CONFIG_PATH` | /data/config.yaml | - |
| `GATUS_CONFIG_YAML` | - | Optional full YAML, overrides default at boot |
| `GATUS_ADMIN_PASSWORD` | (secret) | - |
| `GATUS_ADMIN_USERNAME` | (secret) | - |

## Configuration

- **Volume:** `/data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/gatus-uptime-monitoring)
