# Deploy Planka + S3 on Railway

Trello alternative. Kanban-style project maangement

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/8ttegs)

## About

Create projects, boards, lists, cards, labels and tasks
Add card members, track time, set due dates, add attachments, write comments
Markdown support in card description and comments
Filter by members and labels
Customize project backgrounds
Real-time updates
Internal notifications
Multiple interface languages
Single sign-on via OpenID Connect

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| plankanban/planka | `plankanban/planka` | Database |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Worker |
| Bucket | `minio/minio` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | plankanban/planka | 1337 | - |
| `SECRET_KEY` | plankanban/planka | (secret) | - |
| `DEFAULT_ADMIN_NAME` | plankanban/planka | admin_name | - |
| `DEFAULT_ADMIN_EMAIL` | plankanban/planka | admin@mail.com | - |
| `S3_FORCE_PATH_STYLE` | plankanban/planka | true | - |
| `S3_SECRET_ACCESS_KEY` | plankanban/planka | (secret) | - |
| `DEFAULT_ADMIN_PASSWORD` | plankanban/planka | (secret) | - |
| `DEFAULT_ADMIN_USERNAME` | plankanban/planka | (secret) | - |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |
| `S3_BUCKET` | Bucket | my-bucket | - |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/app/private/attachments`
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/8ttegs)
