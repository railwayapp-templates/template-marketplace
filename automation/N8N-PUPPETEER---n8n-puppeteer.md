# Deploy N8N-PUPPETEER on Railway

Deploy n8n with Puppeteer browser automation and PostgreSQL on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-puppeteer)

## About

N8N-PUPPETEER is a self-hosted workflow automation platform powered by n8n, bundled with Puppeteer browser automation and PostgreSQL persistence. It enables users to create automated workflows, scrape websites, interact with browser-based applications, and connect APIs through a visual low-code interface.

---

Hosting N8N-PUPPETEER on Railway provides a fully managed deployment experience for browser automation and workflow orchestration. This template combines n8n for automation, Puppeteer for headless browser control, and PostgreSQL for workflow storage and execution history.

Railway automatically provisions networking, deployment infrastructure, environment variables, and persistent services, allowing developers to launch production-ready automation systems quickly. The included Puppeteer support enables advanced tasks such as web scraping, automated testing, authentication flows, PDF generation, and browser interaction workflows directly inside n8n pipelines.

This setup is ideal for teams building scalable automation systems without managing Docker infrastructure manually.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| n8n-puppeteer | [statin26/n8n-puppeteer](https://github.com/statin26/n8n-puppeteer) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created during PostgreSQL initialization. |
| `DATABASE_URL` | Postgres | - | Internal PostgreSQL connection string. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL admin username. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL admin password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL connection string. |
| `PORT` | n8n-puppeteer | 5678 | Port used by the n8n web server. |
| `DB_TYPE` | n8n-puppeteer | postgresdb | Database type used by n8n. |
| `NODES_EXCLUDE` | n8n-puppeteer | [] | Comma-separated list of n8n nodes to disable. |
| `DB_POSTGRESDB_HOST` | n8n-puppeteer | - | Hostname of the PostgreSQL database service. |
| `DB_POSTGRESDB_PORT` | n8n-puppeteer | - | Port of the PostgreSQL database service. |
| `DB_POSTGRESDB_USER` | n8n-puppeteer | (secret) | PostgreSQL username used by n8n. |
| `N8N_RUNNERS_ENABLED` | n8n-puppeteer | true | Enable task runners for scalable workflow execution. |
| `DB_POSTGRESDB_DATABASE` | n8n-puppeteer | - | PostgreSQL database name used by n8n. |
| `DB_POSTGRESDB_PASSWORD` | n8n-puppeteer | (secret) | Password for the PostgreSQL database user. |
| `N8N_DIAGNOSTICS_ENABLED` | n8n-puppeteer | false | Enable anonymous diagnostics and telemetry. |
| `PUPPETEER_EXECUTABLE_PATH` | n8n-puppeteer | /usr/bin/chromium-browser | Path to the Chromium or Chrome executable. |
| `N8N_COMMUNITY_PACKAGES_ENABLED` | n8n-puppeteer | true | Allow installation of community nodes. |
| `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` | n8n-puppeteer | true | Skip Chromium download during installation. |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | n8n-puppeteer | false | Enable notifications for new n8n versions. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n-puppeteer | false | Enforce secure permissions for n8n settings files. |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-puppeteer)
