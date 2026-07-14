# Deploy Launchlist on Railway

Self-hosted waitlist with referral leaderboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wild-red)

## About

Launchlist is a self-hosted waitlist and early-access backend you deploy in one click. Collect email signups, run a referral leaderboard where people move up the list by referring friends, and export everyone to CSV — all on infrastructure you own, with no monthly SaaS fee and no third party holding your subscriber list.

Launchlist runs as a single Node.js service backed by a Postgres database, both included in this template. On deploy, the app automatically creates its database table, serves a clean mobile-friendly signup page at the root URL, and a password-protected admin dashboard at /admin.html. Set two variables — ADMIN_PASSWORD for your dashboard and PROJECT_NAME for your product's name — and the database connection is wired automatically. There is nothing to configure beyond that. Your signup data lives entirely in your own Postgres instance on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Launchlist | [Hygrivakondury/Launchlist](https://github.com/Hygrivakondury/Launchlist) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PROJECT_NAME` | Launchlist | Our product | - |
| `ADMIN_PASSWORD` | Launchlist | (secret) | change-me-please |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** HTML, JavaScript

[View on Railway →](https://railway.com/deploy/wild-red)
