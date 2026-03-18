# Deploy Convex + Postgres on Railway

Convex is the open-source reactive database for app developers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convex-postgres)

## About

Convex is the open-source reactive database for app developers aka the missing half of your React app.

Simply deploy the template 🚀

🚧 If you want to separate http and api urls you can setup different domains for ports (3210 is for api and 3211 is for http routes)

### Admin dashboard access

1) ssh to convex-backend service and execute ./generate_admin_key.sh
2) copy the admin key logged to console
3) open the public url of convex-dashboard
4) paste admin key to login (this is your admin key keep it secret)

note: one dashboard instance can be re-used accross many backend instances if needed by repeating the steps above.

Rest of the usage and setup can be found in convex docs.

Links:
- https://docs.convex.dev/home
- https://github.com/get-convex/convex-backend/tree/main/self-hosted

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17` | Database |
| convex-backend | `ghcr.io/get-convex/convex-backend:latest` | Web service |
| convex-dashboard | `ghcr.io/get-convex/convex-dashboard:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PGSSLMODE` | Postgres | disable | - |
| `POSTGRES_DB` | Postgres | convex_self_hosted | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | convex-backend | 3210 | - |
| `INSTANCE_NAME` | convex-backend | convex_self_hosted | Instance name |
| `DISABLE_BEACON` | convex-backend | true | Optional tracking beacon to convex.dev |
| `INSTANCE_SECRET` | convex-backend | (secret) | Instance secret |
| `CONVEX_SITE_ORIGIN` | convex-backend | - | Public http url |
| `DO_NOT_REQUIRE_SSL` | convex-backend | false | - |
| `CONVEX_CLOUD_ORIGIN` | convex-backend | - | Public instance url |
| `CONVEX_SELF_HOSTED_URL` | convex-backend | - | Public instance url |
| `PORT` | convex-dashboard | 6791 | - |
| `NEXT_PUBLIC_DEPLOYMENT_URL` | convex-dashboard | - | convex-backen url to connect to |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/convex/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/convex-postgres)
