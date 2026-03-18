# Deploy SyncLinear.com on Railway

Full two-way sync of Linear and GitHub tickets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/L__0PR)

## About

### SyncLinear

For open-source teams who enjoy working in Linear. Visit [SyncLinear.com](https://SyncLinear.com) to see it in action.

Deploying SyncLinear on Railway only requires a few API keys and OAuth IDs.

See the [self-hosting guide](https://github.com/calcom/synclinear.com/blob/main/Setup.md) for full setup instructions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| synclinear.com | [calcom/synclinear.com](https://github.com/calcom/synclinear.com) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ENCRYPTION_KEY` | synclinear.com | abc123 | Run node > crypto.randomBytes(16).toString("hex") to generate this |
| `GITHUB_OAUTH_SECRET` | synclinear.com | (secret) | GitHub Org Settings > Developer > OAuth Apps > New |
| `LINEAR_OAUTH_SECRET` | synclinear.com | (secret) | Linear Settings > API > OAuth Apps > Create new |
| `NEXT_PUBLIC_GITHUB_OAUTH_ID` | synclinear.com | abc123 | GitHub Org Settings > Developer > OAuth Apps > New |
| `NEXT_PUBLIC_LINEAR_OAUTH_ID` | synclinear.com | abc123 | Linear Settings > API > OAuth Apps > Create new |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm start`
- **Healthcheck:** `/api/health-check`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, CSS, Dockerfile, JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/L__0PR)
