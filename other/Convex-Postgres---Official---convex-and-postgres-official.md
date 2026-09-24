# Deploy Convex & Postgres - Official on Railway

Convex is the open-source reactive database for app developers + Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convex-and-postgres-official)

## About

Host a Convex reactive backend, its administration dashboard, and a PostgreSQL database in your Railway project.

The template includes three services: `Postgres`, `convex-backend`, and `convex-dashboard`. Convex connects to PostgreSQL through the configured `POSTGRES_URL`. PostgreSQL keeps its database on a volume at `/var/lib/postgresql/data`; the Convex backend has a separate volume at `/convex/data` for local files and backend state. The dashboard connects to the backend's public HTTPS URL.

The API listens on port 3210, the dashboard on port 6791, and the backend's separate HTTP-action listener on port 3211. Keep the service URLs, database references, and volume mounts configured by the template.

### Admin dashboard access

1. Deploy the services and confirm PostgreSQL and the backend are running.
2. Use Railway SSH to connect to `convex-backend`. From `/convex`, run `./generate_admin_key.sh`.
3. Keep the complete administrator key private. Open the public `convex-dashboard` URL and use that key to sign in.
4. In your application project's private `.env.local`, set `CONVEX_SELF_HOSTED_URL` to the backend HTTPS URL and `CONVEX_SELF_HOSTED_ADMIN_KEY` to the administrator key.
5. Run `npx convex dev` from your application project to deploy functions. Configure your frontend's Convex client with the backend HTTPS URL, never the administrator key.

The backend API also supports HTTP actions under `/http`. For an application route registered as `/sendEmail`, use the backend HTTPS URL followed by `/http/sendEmail`. If you configure a separate public domain targeting port 3211, set `CONVEX_SITE_ORIGIN` to that domain and call routes without the `/http` prefix.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17` | Database |
| convex-backend | `ghcr.io/get-convex/convex-backend:latest` | Web service |
| convex-dashboard | `ghcr.io/get-convex/convex-dashboard:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PGSSLMODE` | Postgres | disable | PostgreSQL client TLS mode. Keep disable for the included private-network PostgreSQL service, which has no TLS certificate configured. Use the mode required by your database if replacing it. |
| `POSTGRES_DB` | Postgres | convex_self_hosted | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `CONVEX_DATABASE_URL` | Postgres | - | PostgreSQL connection URL for Convex, generated from this service's username, password and private hostname. Keep the references as supplied; do not paste a public database URL. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | convex-backend | 3210 | Convex API listener port. Keep 3210 and target the backend's Railway public domain at this port. |
| `POSTGRES_URL` | convex-backend | - | Database connection used by the Convex backend. Keep the reference to Postgres.CONVEX_DATABASE_URL to use the included private PostgreSQL service. |
| `INSTANCE_NAME` | convex-backend | convex_self_hosted | Instance name |
| `DISABLE_BEACON` | convex-backend | true | Optional tracking beacon to convex.dev |
| `INSTANCE_SECRET` | convex-backend | (secret) | Instance secret |
| `CONVEX_SITE_ORIGIN` | convex-backend | - | Public http url |
| `DO_NOT_REQUIRE_SSL` | convex-backend | false | Allows the backend to connect to the included PostgreSQL service without requiring TLS. The image treats any nonempty value, including false, as enabling this option. Clear or remove it when using a database that requires TLS. |
| `CONVEX_CLOUD_ORIGIN` | convex-backend | - | Public instance url |
| `CONVEX_SELF_HOSTED_URL` | convex-backend | - | Public instance url |
| `PORT` | convex-dashboard | 6791 | Dashboard HTTP listener port. Keep 6791 and target the dashboard's Railway public domain at this port. |
| `NEXT_PUBLIC_DEPLOYMENT_URL` | convex-dashboard | - | convex-backen url to connect to |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/convex/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/convex-and-postgres-official)
