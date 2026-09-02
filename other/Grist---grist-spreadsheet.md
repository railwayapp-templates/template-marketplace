# Deploy Grist on Railway

Deploy Grist, the open-source relational spreadsheet, on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grist-spreadsheet)

## About

Grist is a relational spreadsheet: a familiar grid where every column has a database type, formulas are written in real Python, and access rules reach down to individual rows and cells. Teams reach for it when a spreadsheet has outgrown itself — a shared tracker that now needs referential integrity, an Airtable base that has become expensive, a reporting workbook that should really be an application. Each document is a single SQLite file, so the data stays portable. The server here is `grist-core`, Apache 2.0 licensed, from Grist Labs with France's ANCT and DINUM teams.

Deploy Grist on Railway and you get the complete server, not a demo. Four services run together: the Grist application from the official `gristlabs/grist` image, a Caddy authentication gateway as the only public service, PostgreSQL as the home database holding users, team sites, workspaces and the document index, and Redis for sessions. The gateway asks for a username and password and hands the authenticated identity to Grist over the private network; documents and attachments sit on a volume at `/persist`. Self-host Grist this way and sessions survive redeploys, because they live in Redis, not container memory.

![Grist, Caddy gateway, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788207974/grist-architecture.png)

Grist sits between a spreadsheet and a database. Columns are typed, references link tables, and formulas are ordinary Python evaluated by a sandboxed engine, so a column can call `SUM`, slice a date, or run a few lines of logic. Self-hosting keeps that data on infrastructure you control.

- Python formulas with the standard library, plus Excel-style functions
- Typed columns, two-way references, choice lists and attachments
- Dashboards of linked widgets: grids, cards, charts, calendar
- Row, column and cell-level access rules driven by user attributes
- Native forms writing straight into a table, and outgoing webhooks
- A REST API, CSV and Excel import/export, direct Airtable import

The architecture splits responsibilities cleanly: the Grist service holds documents on its volume, PostgreSQL stores accounts, organisations, workspaces and permissions, Redis holds session state, and the Caddy gateway supplies the login `grist-core` lacks while keeping the application off the public internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grist | `gristlabs/grist:stable` | Database |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| gateway | [gridalpha/grist-railway](https://github.com/gridalpha/grist-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | grist | 8484 | HTTP listening port for Grist |
| `REDIS_URL` | grist | - | Session and coordination store |
| `GRIST_HOST` | grist | 0.0.0.0 | Bind address; never an IPv6 literal |
| `APP_HOME_URL` | grist | - | Public base URL |
| `NODE_OPTIONS` | grist | --no-deprecation --dns-result-order=ipv6first --max-old-space-size=3072 | Node heap and DNS order |
| `TYPEORM_HOST` | grist | - | Home database host |
| `TYPEORM_PORT` | grist | - | Home database port |
| `TYPEORM_TYPE` | grist | postgres | Home database driver |
| `TYPEORM_LOGGING` | grist | false | Silences SQL statement logging |
| `GRIST_IN_SERVICE` | grist | true | Skips the first-run setup wizard |
| `GRIST_SINGLE_ORG` | grist | grist | Single team site served by this server |
| `TYPEORM_DATABASE` | grist | - | Home database name |
| `TYPEORM_PASSWORD` | grist | (secret) | Home database password |
| `TYPEORM_USERNAME` | grist | (secret) | Home database user |
| `GRIST_ADMIN_EMAIL` | grist | - | Installation admin account |
| `GRIST_FORCE_LOGIN` | grist | (secret) | Blocks all anonymous access |
| `GRIST_DEFAULT_EMAIL` | grist | - | Owner of the team site |
| `GRIST_SANDBOX_FLAVOR` | grist | gvisor | Formula sandbox; pyodide is the fallback |
| `GRIST_SESSION_SECRET` | grist | (secret) | Session cookie signing key |
| `GRIST_ANON_PLAYGROUND` | grist | false | Disables anonymous scratch documents |
| `GRIST_TELEMETRY_LEVEL` | grist | off | Disables usage telemetry |
| `GRIST_FORWARD_AUTH_HEADER` | grist | X-Forwarded-User | Identity header from the gateway |
| `GRIST_FORWARD_AUTH_LOGOUT_PATH` | grist | /_oauth/logout | Path that clears the browser credential |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | gateway | 8080 | HTTP listening port for the gateway |
| `GRIST_UPSTREAM` | gateway | - | Private address of Grist |
| `GRIST_ADMIN_EMAIL` | gateway | admin@example.com | Sign-in name and Grist identity |
| `GRIST_ADMIN_PASSWORD` | gateway | (secret) | Sign-in password, hashed at boot |

## Configuration

- **Healthcheck:** `/status`
- **Volume:** `/persist`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/grist-spreadsheet)
