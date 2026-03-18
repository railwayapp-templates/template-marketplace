# Deploy Planka on Railway

Elegant open source project tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qrBbxO)

## About

# Planka
## Elegant open source project tracking

[**Client demo**](https://plankanban.github.io/planka) (without server features).

### Features

- Create projects, boards, lists, cards, labels and tasks
- Add card members, track time, set due dates, add attachments, write comments
- Markdown support in card description and comments
- Filter by members and labels
- Customize project backgrounds
- Real-time updates
- Internal notifications
- Multiple interface languages
- Single sign-on via OpenID Connect

### Documentation

You can find the documentation for Planka here:
https://docs.planka.cloud/docs/intro

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| planka | `ghcr.io/plankanban/planka:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | planka | 1337 | - |
| `SECRET_KEY` | planka | (secret) | - |
| `DEFAULT_ADMIN_NAME` | planka | - | Your admin account name |
| `DEFAULT_ADMIN_EMAIL` | planka | - | admin@example.com |
| `DEFAULT_ADMIN_PASSWORD` | planka | (secret) | Secure admin password |
| `DEFAULT_ADMIN_USERNAME` | planka | (secret) | Your admin account username |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/private/attachments`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/qrBbxO)
