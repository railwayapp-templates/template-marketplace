# Deploy n8n — Self-Hosted Workflow Automation on Railway

Self-host n8n — 400+ integrations, Postgres & AI workflows, no caps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-latest-version)

## About

Self-host the open-source alternative to Zapier — unlimited executions, no per-task billing, and full ownership of your data. n8n is the world's most popular workflow automation platform (188k+ GitHub stars, 100M+ Docker pulls, 500+ integrations). Build automations visually, drop into code when you need it, and wire up AI agents, APIs, and databases — with no execution caps and no vendor lock-in. This template runs n8n with a managed PostgreSQL database, pre-wired so workflows and credentials persist from the first deploy.

![n8n workflow builder](https://user-images.githubusercontent.com/65276001/173571060-9f2f6d7b-bac0-43b6-bdb2-001da9694058.png)

---

n8n is quick to deploy, but two settings make the difference between a working instance and a frustrating one — and this template handles both.

**`WEBHOOK_URL` must be your Railway public domain.** Webhook-triggered workflows only receive external traffic if n8n knows its own public URL. Set `WEBHOOK_URL` to your Railway domain (found under the n8n service → Settings → Domains), or triggers from Stripe, GitHub, Shopify, and other services silently won't fire. It's the number-one "my webhooks don't work" issue.

**`N8N_ENCRYPTION_KEY` protects your stored credentials — pin it and keep it stable.** n8n encrypts every saved credential (API keys, OAuth tokens, database logins) with this key. If it changes or is regenerated on a redeploy, existing credentials can't be decrypted and you'll see "Credentials could not be decrypted." Set a 32-character random value once, keep it stable, and back it up.

**Everything persists in PostgreSQL, not the container.** Workflows, credentials, and execution history live in the Railway-managed database, so redeploys, updates, and restarts never touch them — the reason this template uses Postgres rather than SQLite-in-a-volume.

**Secure the editor.** On a public URL, enable basic auth (`N8N_BASIC_AUTH_ACTIVE=true` with a user and strong password) so your workflow editor isn't openly reachable. Railway's automatic HTTPS handles encryption in transit.

**Pin the version in production.** Set a specific image tag (e.g. `n8nio/n8n:2.20.9`) rather than `latest`, so an upstream release doesn't introduce breaking changes under you. Upgrades are a tag change and a redeploy; your Postgres data is unaffected.

Typical cost: **~$5/month** on Railway's Hobby plan — with unlimited executions, versus n8n Cloud's $20/month (capped at 2,500) or Zapier's per-task billing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| N8n Self Deploy | [sahilrupani/n8n-railway](https://github.com/sahilrupani/n8n-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | N8n Self Deploy | 5678 | n8n runs internally on port 5678 |
| `DB_TYPE` | N8n Self Deploy | postgresdb | - |
| `WEBHOOK_URL` | N8n Self Deploy | - | Used to manually provide the Webhook URL when running n8n behind a reverse proxy |
| `N8N_PROXY_HOPS` | N8n Self Deploy | 1 | n8n runs internally on port 5678 but the reverse proxy exposes it to the web on port 443 |
| `DB_POSTGRESDB_PORT` | N8n Self Deploy | 5432 | - |
| `DB_POSTGRESDB_USER` | N8n Self Deploy | (secret) | - |
| `EXECUTIONS_DATA_PRUNE` | N8n Self Deploy | true | EXECUTIONS_DATA_PRUNE in n8n is an environment variable that enables automatic deletion of old workflow execution logs |
| `DB_POSTGRESDB_PASSWORD` | N8n Self Deploy | (secret) | - |
| `N8N_EXPRESS_TRUST_PROXY` | N8n Self Deploy | true | - |
| `N8N_DEFAULT_BINARY_DATA_MODE` | N8n Self Deploy | filesystem | - |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | N8n Self Deploy | 200 | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | N8n Self Deploy | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/n8n-latest-version)
