# Deploy Convex (w/ Reverse Proxy) on Railway

The backend platform that keeps your app in sync.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convex-w-reverse-proxy)

## About

Convex is an open-source reactive database for web apps and LLM-powered apps. This
template adds a reverse proxy (Caddy) so you can serve Convex’s backend and HTTP
actions from a single HTTPS domain on Railway, without exposing multiple public ports.

#### Admin Key

On the first successful boot, the Convex Backend will print an admin key in the
service logs in a format like:

`Admin key: |`

Copy that value into the `CONVEX_SELF_HOSTED_ADMIN_KEY` environment variable and
redeploy the Convex Backend service.

If you need to rotate instance credentials (e.g. after changing `INSTANCE_SECRET`)
and want Convex to regenerate the admin key, set:

`CONVEX_SELF_HOSTED_ADMIN_KEY=invalid`

redeploy the Convex Backend service, then copy the newly printed admin key from
logs and set it back.

Convex self-hosting commonly uses two HTTP listeners: the main backend (typically
port 3210) and the HTTP actions / “site” server (typically port 3211). Railway
services generally map a single public HTTP domain to a single internal port, so
exposing both endpoints cleanly can be tricky. This template deploys Convex
Backend + PostgreSQL and places Caddy in front as the only public entrypoint.
Caddy terminates HTTPS and routes specific paths (e.g.
`/.well-known/*` and `/api/auth/*`) to the actions port while routing everything
else to the backend port over Railway private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Reverse Proxy (Caddy) | [kadumedim/convex-reverse-proxy](https://github.com/kadumedim/convex-reverse-proxy) | Web service |
| Convex Dashboard | `ghcr.io/get-convex/convex-dashboard:latest` | Web service |
| Postgres | `postgres:17` | Database |
| Convex Backend | `ghcr.io/get-convex/convex-backend:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Reverse Proxy (Caddy) | 80 | - |
| `PUBLIC_DOMAIN` | Reverse Proxy (Caddy) | - | The public service or customer domain, of the form `example.up.railway.app` |
| `PORT` | Convex Dashboard | 8080 | - |
| `PGSSLMODE` | Postgres | disable | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | Convex Backend | 3210 | - |
| `RUST_LOG` | Convex Backend | info | - |
| `DISABLE_BEACON` | Convex Backend | true | - |
| `INSTANCE_SECRET` | Convex Backend | (secret) | - |
| `DO_NOT_REQUIRE_SSL` | Convex Backend | false | - |
| `CONVEX_SELF_HOSTED_ADMIN_KEY` | Convex Backend | invalid | Replace with the one printed in the logs on the first time this service is deployed. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'mkdir -p "/convex/data/credentials" && echo "$INSTANCE_SECRET" > "/convex/data/credentials/instance_secret" && echo "$INSTANCE_NAME" > "/convex/data/credentials/instance_name" && ([ -z "$CONVEX_SELF_HOSTED_ADMIN_KEY" ] || [ "$CONVEX_SELF_HOSTED_ADMIN_KEY" = "invalid" ]) && ./generate_admin_key.sh || echo "Admin key: $CONVEX_SELF_HOSTED_ADMIN_KEY" && exec ./run_backend.sh'`
- **Healthcheck:** `/version`
- **Volume:** `/convex/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/convex-w-reverse-proxy)
