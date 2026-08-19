# Deploy Homebox on Railway

Track items, locations, warranties and receipts on your own server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homebox-2)

## About

HomeBox is an open-source inventory and organization system built for the home user — a self-hosted alternative to Sortly for cataloguing everything you own. You photograph an item, file it under a storage location, record what it cost and when the warranty runs out, then find it months later by searching a serial number or scanning a QR label. Homeowners use it for insurance documentation, renters for move tracking, hobbyists for tool libraries.

Deploy HomeBox on Railway and this template wires up the production shape upstream recommends rather than the single-container quick start. Four pieces work together: the HomeBox container, a managed **PostgreSQL** database holding every item, location, tag and user, a managed **object storage bucket** for uploaded photos, receipts and generated thumbnails, and a small **Caddy** service, the only component exposed to the internet. Caddy forwards public traffic over Railway's private network and rewrites the client-address header, so HomeBox's login rate limiter counts real visitors rather than the platform proxy. Because state lives in Postgres and the bucket, the app container needs no volume.

![HomeBox Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787076678/275f76df-2f40-4211-8987-0854bb5da81f.png)

HomeBox answers a question most household software ignores: what do I own, and where is it? Insurance claims, warranty disputes and house moves all need a list with photos, prices and dates, and spreadsheets rot the moment a second person edits one. An inventory is also a map of your possessions — good reason to keep it on your own infrastructure.

Key features:

- Items with photos, receipts and file attachments, plus quantity, purchase price and date, serial and model numbers
- Nested storage locations and colour-coded tags, so "Garage → Shelf B → Toolbox" works like a real house
- Full-text search, saved filters, and card or table views over the collection
- Printable QR labels that open an item's page when scanned with a phone
- Maintenance logs, scheduled reminders, warranty tracking and a running total value
- CSV import and export, a REST API, and optional OIDC single sign-on

In this template the HomeBox container serves the API and web UI on a private port, PostgreSQL stores entities, users and sessions, the bucket holds every uploaded photo and generated thumbnail over an S3-compatible connection, and Caddy publishes the app and normalises proxy headers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxy | `caddy:2-alpine` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| homebox | `ghcr.io/sysadminsmedia/homebox:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | proxy | 8080 | Public listening port |
| `UPSTREAM` | proxy | homebox.railway.internal:7745 | Private address of the app |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | homebox | 7745 | Health-check port selector |
| `HBOX_MODE` | homebox | production | Runtime mode |
| `HBOX_WEB_PORT` | homebox | 7745 | HTTP listening port |
| `HBOX_LOG_LEVEL` | homebox | info | Application log level |
| `AWS_ACCESS_KEY_ID` | homebox | - | Bucket access key |
| `HBOX_DATABASE_HOST` | homebox | - | Private database hostname |
| `HBOX_DATABASE_PORT` | homebox | - | Database port |
| `HBOX_DATABASE_DRIVER` | homebox | postgres | Use Postgres, not SQLite |
| `AWS_SECRET_ACCESS_KEY` | homebox | (secret) | Bucket secret key |
| `HBOX_OPTIONS_HOSTNAME` | homebox | - | Public base URL for links |
| `HBOX_DATABASE_DATABASE` | homebox | - | Database name |
| `HBOX_DATABASE_PASSWORD` | homebox | (secret) | Database password |
| `HBOX_DATABASE_SSL_MODE` | homebox | require | Encrypt database connection |
| `HBOX_DATABASE_USERNAME` | homebox | (secret) | Database user |
| `HBOX_AUTH_API_KEY_PEPPER` | homebox | (secret) | API key hashing secret, keep stable |
| `HBOX_OPTIONS_TRUST_PROXY` | homebox | true | Honour forwarded proxy headers |
| `HBOX_STORAGE_CONN_STRING` | homebox | - | Bucket connection string |
| `HBOX_STORAGE_PREFIX_PATH` | homebox | data | Object key prefix in bucket |
| `HBOX_WEB_MAX_UPLOAD_SIZE` | homebox | 50 | Max upload size in MB |
| `HBOX_OPTIONS_ALLOW_REGISTRATION` | homebox | true | Set false after first signup |
| `HBOX_OPTIONS_GITHUB_RELEASE_CHECK` | homebox | true | Show update notices in UI |

## Configuration

- **Start command:** `/bin/sh -c 'printf "%s\n" "{" "  admin off" "  auto_https off" "  servers {" "    trusted_proxies static 100.64.0.0/10 fd00::/8" "  }" "}" ":$PORT {" "  handle /healthz {" "    respond 200" "  }" "  handle {" "    reverse_proxy $UPSTREAM {" "      header_up X-Real-IP {client_ip}" "      flush_interval -1" "    }" "  }" "}" > /etc/caddy/Caddyfile; echo "--- rendered Caddyfile ---"; cat /etc/caddy/Caddyfile; caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/status`

**Category:** Other

[View on Railway →](https://railway.com/deploy/homebox-2)
