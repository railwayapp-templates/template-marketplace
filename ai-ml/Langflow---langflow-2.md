# Deploy Langflow on Railway

Build AI workflows with Langflow, private Postgres and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow-2)

## About

A visual AI workflow editor with Langflow 1.12.0, private PostgreSQL 17, persistent uploads, and generated administrator credentials. Creating and saving flows does not require an LLM provider key; real model execution requires a configured provider and its credentials.

The app serves HTTPS through Railway to container port 7860. PostgreSQL is private on port 5432 with no public TCP proxy. Use one Langflow replica. The app healthcheck is `/health_check`, with a 300-second startup allowance; allow sufficient memory, roughly 2–4 GB for the app alone as a starting point.

### Deploy and log in

1. Deploy both services with their volumes attached and allow initial database setup to finish.
2. In the Langflow service's Variables tab, retrieve `LANGFLOW_SUPERUSER_PASSWORD`. Sign in as `admin`, unless you deliberately changed `LANGFLOW_SUPERUSER`.
3. Open your Railway HTTPS domain. Create a blank flow, add components, save, and reload it.
4. Add provider credentials through the authenticated UI only when needed, then verify an actual flow execution. A saved canvas or healthy process is not proof that components or models execute successfully. Browser rejection of an incorrect administrator password and successful valid login were verified. Keyless Playground execution remains unverified; real provider-backed inference was not tested.

### Authentication and secrets

- `LANGFLOW_AUTO_LOGIN=false` and `LANGFLOW_ENABLE_SIGNUP=false`; do not enable automatic login on a public editor. New-user activation is disabled by default.
- Access/refresh cookies are marked Secure for HTTPS, and webhook authentication is enabled. Only give accounts to trusted users: flow components can execute code and access configured resources.
- `LANGFLOW_SUPERUSER_PASSWORD` is generated independently of `LANGFLOW_SECRET_KEY`. There is no shared default administrator password.
- `LANGFLOW_SECRET_KEY` is generated as canonical URL-safe Base64 encoding of 32 bytes, 44 characters ending in `=`. Do not replace it with a generic `${{secret()}}` string. Keep it stable with the database and volume; changing it can make encrypted stored values unreadable.
- `LANGFLOW_DATABASE_URL=${{Postgres.DATABASE_URL}}` uses the private database. Preserve generated database credentials and reference expressions.

### Storage and upgrades

| Service | Mount | Contents |
| --- | --- | --- |
| Langflow | `/app/langflow` | Uploads, configuration and local cache |
| Postgres | `/var/lib/postgresql/data` | Accounts, flows and application metadata |

`LANGFLOW_CONFIG_DIR` matches the app mount; PostgreSQL uses the `pgdata` subdirectory. Startup fixes the app mount's ownership/mode and drops to UID 1000 before running the editor. Back up the database, uploads, and encryption secret together. Do not scale multiple writers against this single-volume setup.

**PostgreSQL 17 is for fresh installations. Never attach an existing PostgreSQL 18 data directory to the PostgreSQL 17 image.** Existing users need backups and a separately tested logical migration before a database-major change. Test restored flows, uploaded files, encrypted credentials, and execution after changes; neither backups nor upgrades are certified by a startup healthcheck.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Langflow | `langflowai/langflow:1.12.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Langflow | 7860 |
| `LOG_LEVEL` | Langflow | info |
| `LANGFLOW_HOST` | Langflow | 0.0.0.0 |
| `LANGFLOW_PORT` | Langflow | 7860 |
| `LANGFLOW_WORKERS` | Langflow | 1 |
| `LANGFLOW_LOG_LEVEL` | Langflow | info |
| `LANGFLOW_SUPERUSER` | Langflow | admin |
| `LANGFLOW_AUTO_LOGIN` | Langflow | (secret) |
| `LANGFLOW_CONFIG_DIR` | Langflow | /app/langflow |
| `LANGFLOW_SECRET_KEY` | Langflow | (secret) |
| `LANGFLOW_OPEN_BROWSER` | Langflow | false |
| `LANGFLOW_ACCESS_SECURE` | Langflow | true |
| `LANGFLOW_ENABLE_SIGNUP` | Langflow | false |
| `LANGFLOW_REFRESH_SECURE` | Langflow | true |
| `LANGFLOW_NEW_USER_IS_ACTIVE` | Langflow | false |
| `LANGFLOW_SUPERUSER_PASSWORD` | Langflow | (secret) |
| `LANGFLOW_WEBHOOK_AUTH_ENABLE` | Langflow | true |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `sh -c 'mkdir -p /app/langflow && chown -R 1000:0 /app/langflow && chmod 700 /app/langflow && exec su -s /bin/sh user -c "exec python -m langflow run --host 0.0.0.0 --port 7860"'`
- **Healthcheck:** `/health_check`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/langflow`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langflow-2)
