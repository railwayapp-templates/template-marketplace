# Deploy Infisical — Open Source Secrets Manager & Vault on Railway

Self-host Infisical — manage API keys, secrets & certs securely

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/infisical-secrets-vault)

## About

Infisical is an open-source, end-to-end encrypted secrets platform — a self-hosted alternative to Doppler, HashiCorp Vault, and AWS Secrets Manager. It solves secret sprawl: API keys, credentials, and certificates scattered across `.env` files, Slack, and CI configs, replaced by a single encrypted source of truth with a clean UI, a CLI, and SDKs. It also includes an internal Certificate Authority and native syncs to 50+ tools. This template deploys the full stack — Infisical, PostgreSQL, and Redis — with the master encryption key handled.

---

Infisical stores your most sensitive data, so one setting matters above all others — get it right and back it up.

**`ENCRYPTION_KEY` is the master key to every secret — never lose it or change it.** Infisical encrypts every stored secret with `ENCRYPTION_KEY`. If it's lost or regenerated on a redeploy, **every secret in your vault becomes permanently undecryptable** — you're locked out of your own API keys, credentials, and certificates, with no recovery. Generate it once in the correct format (`openssl rand -hex 16`), pin it, and back it up offline. `AUTH_SECRET` (`openssl rand -base64 32`) signs sessions and should likewise stay stable. This template sets both at deploy so a redeploy never orphans your secrets.

**It's a three-service stack — Postgres and Redis are both required.** PostgreSQL holds all encrypted data (this is what to back up), and Redis handles caching and sessions (no critical long-term data, but Infisical needs it running). Both are wired over the private network.

**`SITE_URL` must be your Railway domain, and the DB variable is `DB_CONNECTION_URI`.** Set `SITE_URL` to your public Railway URL or the dashboard and email links misbehave. Infisical uses `DB_CONNECTION_URI` (not `DATABASE_URL`) and `REDIS_URL` — this template wires them from Railway reference variables.

**More than env vars: PKI and integrations.** Infisical includes an internal Certificate Authority for X.509 certs, native syncs to GitHub Actions, Vercel, AWS, Kubernetes, Terraform, and 50+ more, RBAC with audit logs, and a Kubernetes operator — a full secrets-and-certs platform, not just a `.env` replacement. Pin a specific image tag rather than `latest`; Infisical moves fast and can ship breaking changes.

Typical cost: **~$10–15/month** on Railway across the three services. Infisical is MIT-licensed and free to self-host.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Infisical | `infisical/infisical:latest` | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | Infisical | production | - |
| `AUTH_SECRET` | Infisical | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/infisical-secrets-vault)
