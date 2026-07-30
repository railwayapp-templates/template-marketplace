# Deploy ryot on Railway

Ryot — self-hosted media & fitness tracker. Your data on your server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ryot-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/ryot-1)

### Deployment Dependencies

- **PostgreSQL**: Railway provisions a managed PostgreSQL database automatically. No manual configuration needed.
- **Server Admin Access Token**: A long random string that authenticates you as the administrator on first login.

Ryot runs on a single container with the backend API and frontend served together on port 8000. On Railway, the app is fronted by automatic HTTPS via the Railway edge network, with DDoS protection and global CDN. Sleep after inactivity is disabled by default to keep the instance always available.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ryot | [INAPP-Mobile/ryot](https://github.com/INAPP-Mobile/ryot) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_URL` | ryot | http://127.0.0.1:5000 | Internal backend API URL. Fixed wiring — Ryot backend runs on port 5000 within the container. |
| `DATABASE_URL` | ryot | - | PostgreSQL connection string. Auto-linked to Postgres companion service. |
| `FRONTEND_URL` | ryot | - | Public URL for your Ryot instance. Auto-configured via Railway public domain. |
| `SERVER_ADMIN_ACCESS_TOKEN` | ryot | (secret) | A long random string for administrative API access. Auto-generated on first deploy. |
| `POSTGRES_DB` | Postgres | ryot | PostgreSQL database name. |
| `DATABASE_URL` | Postgres | - | PostgreSQL connection string constructed from auto-generated credentials. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser username. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL superuser password. Set via deploy form — must be non-empty. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ryot-1)
