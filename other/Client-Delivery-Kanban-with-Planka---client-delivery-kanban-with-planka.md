# Deploy Client Delivery Kanban with Planka on Railway

Client delivery boards with generated admin credentials and Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/client-delivery-kanban-with-planka)

## About

Client delivery boards with generated admin credentials and Postgres.

Small agencies tracking deliverables and handover checklists.

Set DEFAULT_ADMIN_EMAIL to your own address before deploying. Sign in with DEFAULT_ADMIN_PASSWORD from Railway variables. Create one project per client, add a delivery board, and invite users with the appropriate project access.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /app/data | HTTPS domain |
| Postgres | /var/lib/postgresql/data | Private network only |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `ghcr.io/plankanban/planka@sha256:125f45330853210c678fed1132bedc0912b4a11a27779b79802fbca108e069e2` | Web service |
| Postgres | `postgres@sha256:b0f9560a2de083e2cc7382e75f808c7381a32852a7ec49117deedb300e552b24` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | App | Etc/UTC | - |
| `PORT` | App | 1337 | - |
| `PGSSLMODE` | App | disable | - |
| `SECRET_KEY` | App | (secret) | - |
| `TRUST_PROXY` | App | true | - |
| `DEFAULT_LANGUAGE` | App | en-US | - |
| `DEFAULT_ADMIN_NAME` | App | Workspace Operator | - |
| `DEFAULT_ADMIN_EMAIL` | App | - | Your real administrator email; required before deployment. |
| `DEFAULT_ADMIN_PASSWORD` | App | (secret) | - |
| `DEFAULT_ADMIN_USERNAME` | App | (secret) | - |
| `SHOW_DETAILED_AUTH_ERRORS` | App | false | - |
| `POSTGRES_DB` | Postgres | app | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/client-delivery-kanban-with-planka)
