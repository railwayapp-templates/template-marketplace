# Deploy Rakazo Suite on Railway

Rakazo persistent cloud agent (Grok Bot Alternative). Non forked.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rakazo-suite)

## About

[Rakazo](https://github.com/elie222/rakazo) is an open-source, self-hosted alternative to Grok Bot for deploying and managing persistent AI teammates. Unlike closed SaaS platforms, Rakazo ensures you retain full ownership of your data, chat histories, model discretion, and agent memory. It also supports collaborative team spaces where members can share team bots and computers or deploy completely private, isolated bots.

---

Hosting Rakazo provides a decoupled, full-stack architecture: a React 19 web frontend, a Hono and oRPC API service that applies Prisma database migrations on boot, a dedicated Graphile Worker background engine to poll and execute tasks asynchronously, a managed PostgreSQL database, and a remote cloud sandbox provider for virtual machine execution.

This Railway template provisions and interconnects the complete stack out of the box using Railway's private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/elie222/rakazo/app:edge` | Web service |
| worker | `ghcr.io/elie222/rakazo/app:edge` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| api | `ghcr.io/elie222/rakazo/app:edge` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | web | 5173 | Preset to upstream configuration. |
| `WEB_ORIGIN` | web | - | Preset to upstream configuration. |
| `RAKAZO_HOST` | web | - | Preset to upstream configuration. |
| `API_PROXY_TARGET` | web | - | Preset to upstream configuration. |
| `SCREEN_PROXY_SECRET` | web | (secret) | Preset to upstream configuration. |
| `DATA_DIR` | worker | /tmp/rakazo-data | Ephemeral artifacts |
| `BOX_API_KEY` | worker | (secret) | Preset to upstream configuration. |
| `E2B_API_KEY` | worker | (secret) | Preset to upstream configuration. |
| `DATABASE_URL` | worker | - | Preset to upstream configuration. |
| `ENCRYPTION_KEY` | worker | - | Preset to upstream configuration. |
| `DAYTONA_API_KEY` | worker | (secret) | Preset to upstream configuration. |
| `SANDBOX_PROVIDER` | worker | - | Preset to upstream configuration. |
| `BETTER_AUTH_SECRET` | worker | (secret) | Preset to upstream configuration. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | api | 3100 | Preset to upstream configuration. |
| `API_URL` | api | - | Preset to upstream configuration. |
| `API_HOST` | api | 0.0.0.0 | Preset to upstream configuration. |
| `DATA_DIR` | api | /tmp/rakazo-data | For ephemeral artifacts. |
| `NODE_ENV` | api | production | Preset to upstream configuration. |
| `WEB_ORIGIN` | api | - | Preset to upstream configuration. |
| `BOX_API_KEY` | api | (secret) | API Key for Box (now boat.dev) ephemeral VPS sandbox |
| `E2B_API_KEY` | api | (secret) | API Key for E2B ephemeral VPS sandbox |
| `DATABASE_URL` | api | - | Preset to upstream configuration. |
| `ENCRYPTION_KEY` | api | - | Auto generated secrets https://docs.railway.com/templates/create#template-variable-functions |
| `BETTER_AUTH_URL` | api | - | Preset to upstream configuration. |
| `DAYTONA_API_KEY` | api | (secret) | API Key for Daytona ephemeral VPS sandbox |
| `SANDBOX_PROVIDER` | api | daytona | Ephemeral VPS service sandbox (e2b / daytona / box) Box is now boat.dev. Provide the matching API key and leave the other sandbox keys empty. |
| `BETTER_AUTH_SECRET` | api | (secret) | Auto generated secrets https://docs.railway.com/templates/create#template-variable-functions |
| `SCREEN_PROXY_SECRET` | api | (secret) | Auto generated secrets https://docs.railway.com/templates/create#template-variable-functions |
| `SANDBOX_SUPERVISOR_TOKEN` | api | (secret) | Auto generated secrets https://docs.railway.com/templates/create#template-variable-functions |
| `SANDBOX_TEAM_SCREEN_LIMIT` | api | 0 | Optional limit on active bot desktops per Docker Team Computer. 0 leaves capacity to the machine; desktops and Chrome start only when needed. |
| `SANDBOX_COMMAND_TIMEOUT_MS` | api | 300000 | Timeout in milliseconds |
| `SANDBOX_MAX_COMPUTERS_PER_SPACE` | api | 0 | Optional limit on total concurrent bot computer containers per space in Docker sandboxes. 0 (or unset) means unlimited. Set a positive integer to cap containers per space. |

## Configuration

- **Start command:** `pnpm --filter @rakazo/web preview`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `pnpm --filter @rakazo/worker start`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm --filter @rakazo/api start`
- **Healthcheck:** `/health`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/rakazo-suite)
