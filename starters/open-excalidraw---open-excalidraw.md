# Deploy open-excalidraw on Railway

Self-hostable collaborative drawing built on Excalidraw

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-excalidraw)

## About

Open Excalidraw is a self-hostable collaboration and persistence layer built
around the published Excalidraw editor: named drawing dashboards,
authenticated real-time editing, revision history with restore, email-based
invitations with owner/editor/viewer permissions, public read-only share
links, and per-drawing chat.

The template deploys one prebuilt application service
(`ghcr.io/strangenoob/open-excalidraw`) beside Railway's managed PostgreSQL.
Railway generates the authentication secret and the operator recovery token,
references the private database URL, and mounts a persistent volume at
`/data/assets` for binary assets. The image applies database migrations
before each start. No user-entered variables are required. SMTP is optional:
without it, owners copy invitation links for manual delivery.

The application service must run as exactly one replica: real-time
collaboration state lives in-process, and the asset volume mounts to a
single instance. Scaling out is unsupported.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| app | `ghcr.io/strangenoob/open-excalidraw:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first start. |
| `DATABASE_URL` | Postgres | - | Private-network connection string composed from the credentials above; the app service references it. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser name used to initialize the database; PGUSER and the connection URLs reference it. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password; generated fresh for each deployment. |
| `PORT` | app | 3000 | Port Railway probes for healthchecks; matches the app's listen port (APP_PORT default 3000). |
| `APP_BASE_URL` | app | - | Public origin of the deployment; used for auth callbacks, share links, and socket-origin checks. Defaults to the generated Railway domain. |
| `DATABASE_URL` | app | - | PostgreSQL connection string; references the bundled Postgres service. |
| `STORAGE_DRIVER` | app | local | Binary asset storage driver: "local" volume or "s3" for any S3-compatible bucket. |
| `ADMIN_RESET_TOKEN` | app | (secret) | Operator token for the SMTP-less password recovery flow; generated at deploy time. |
| `BETTER_AUTH_SECRET` | app | (secret) | Session and auth signing secret; generated at deploy time. |
| `STORAGE_LOCAL_PATH` | app | /data/assets | Asset directory for the local driver; must match the volume mount path. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/assets`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/open-excalidraw)
