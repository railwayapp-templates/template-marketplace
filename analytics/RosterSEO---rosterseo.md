# Deploy RosterSEO on Railway

Seo, Ai Visibility, Publisher, Social Media

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rosterseo)

## About

RosterSEO is an open-source SEO and AI-search-visibility platform. It combines a Screaming Frog-style site crawler/auditor, keyword and SERP research, competitor tracking, and an AI-answer-engine visibility tracker for ChatGPT, Gemini, and Perplexity — plus native Google Search Console and GA4 integration so recommendations are grounded in your site's real performance data.

This template deploys RosterSEO's prebuilt Docker image straight from GitHub Container Registry — no build step, no manual setup. A PostgreSQL database is provisioned and wired in automatically via a reference variable, and the database schema is migrated on every boot, so there's nothing to run by hand. On first launch you land on a signup screen to create your own admin account; from there you're straight into the dashboard. Bring your own DataForSEO and AI-provider API keys to unlock SERP, keyword, and AI-visibility data — everything else works out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| RosterSeo | `ghcr.io/open-saas-org/rosterseo` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | RosterSeo | 3000 | Same Port as the Railway Instace |
| `APP_URL` | RosterSeo | - | Main Domain |
| `HOSTNAME` | RosterSeo | 0.0.0.0 | Keep this Unchanged |
| `SELF_HOSTED` | RosterSeo | true | Access to the entire project |
| `DATABASE_URL` | RosterSeo | - | For Data Storage |
| `BETTER_AUTH_URL` | RosterSeo | - | Generate Using AI |
| `DATAFORSEO_LOGIN` | RosterSeo | (secret) | - |
| `BETTER_AUTH_SECRET` | RosterSeo | (secret) | Generate using AI  |
| `OPENROUTER_API_KEY` | RosterSeo | (secret) | - |
| `DATAFORSEO_PASSWORD` | RosterSeo | (secret) | - |
| `BRIGHTDATA_API_TOKEN` | RosterSeo | (secret) | - |
| `GOOGLE_OAUTH_CLIENT_SECRET` | RosterSeo | (secret) | - |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | RosterSeo | - | Better Auth URL |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/rosterseo)
