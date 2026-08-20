# Deploy Shlink — Self-Hosted URL Shortener & Bitly Alternative on Railway

Self-host Shlink — branded short links, analytics & REST API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shlink-url-shortener)

## About

Shlink is a powerful open-source URL shortener with a REST API, detailed click analytics, QR codes, and custom short domains — a self-hosted alternative to Bitly that you fully own. Create branded short links, track every visit with geolocation and device data, and manage everything through the API, CLI, or web client, with no per-link fees or data sold to anyone. This template deploys Shlink with PostgreSQL and an initial API key, wired for a custom short domain — so you own both your links and the analytics behind them, in minutes.

---

Shlink is straightforward to run, and a couple of specifics make it a real shortener rather than a toy — this template handles them.

**Your short domain is the whole point — set `DEFAULT_DOMAIN`.** A URL shortener is only useful if the links are short and branded, so `DEFAULT_DOMAIN` should be a custom short domain (like `s.yourbrand.com`) that you add to your Railway service and point at it with DNS. If you leave it as the long `*.up.railway.app` subdomain, your "short" links won't actually be short. Set your short domain and add it in Railway's settings — this is the difference between a branded shortener and an unusable one.

**An admin API key is created on first boot.** `INITIAL_API_KEY` generates an admin key at container startup, which you use to authenticate the REST API, the CLI, and the web client. Set it to a strong value and keep it secret — it can create and manage every short URL on your instance.

**PostgreSQL, not SQLite — this matters for production.** Shlink's own documentation is explicit that SQLite is for testing only and risks breakage when updating Shlink. This template uses PostgreSQL, which Shlink recommends for production due to its performance with indexes and concurrent redirects, so your instance stays reliable as your link volume and traffic grow.

**The web client is separate — point it at your API.** Shlink's server is headless (API and redirects only); the visual dashboard is a separate shlink-web-client app. You can deploy it separately or use the hosted client at app.shlink.io, pointing it at your Railway API URL with your API key — or drive everything through the REST API and CLI directly.

**Analytics and QR codes are built in.** Every short URL tracks visits with referrer, device, and — with an optional GeoLite2 license key — geolocation, and each link has a QR code generated automatically. `IS_HTTPS_ENABLED=true` is set for Railway's automatic HTTPS, and `REDIRECT_STATUS_CODE` controls whether redirects are cached (301) or always counted fresh (302). Your short URLs, visit records, tags, and API keys all persist in PostgreSQL — the single component to back up.

Typical cost: **~$5/month** on Railway for Shlink and PostgreSQL — it's lightweight, scaling with redirect traffic. Shlink is MIT-licensed and free, versus Bitly's per-link and analytics pricing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Shlink Web Client | [MykalMachon/shlink-on-railway](https://github.com/MykalMachon/shlink-on-railway) | Web service |
| Shlink | `shlinkio/shlink:stable` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Shlink Web Client | 8080 | Do not change. Default HTTP port for the web client. |
| `PASSWORD` | Shlink Web Client | (secret) | Password for the web client via HTTP basic auth |
| `USERNAME` | Shlink Web Client | (secret) | Username for the web client via HTTP basic auth |
| `SHLINK_SERVER_URL` | Shlink Web Client | - | Do not change. Default URL used to communicate with the Shlink service |
| `SHLINK_SERVER_NAME` | Shlink Web Client | Railway Shlink | Label for the default shlink server in the web client. |
| `SHLINK_SERVER_API_KEY` | Shlink Web Client | (secret) | Do not change. API key used to authenticate with the Shlink service |
| `PORT` | Shlink | 8080 | Do not change. Default port for Shlink API |
| `DB_HOST` | Shlink | - | Do not change. PostgreSQL hostname |
| `DB_NAME` | Shlink | - | Do not change. PostgreSQL database name |
| `DB_PORT` | Shlink | 5432 | Do not change. PostgreSQL listener port. |
| `DB_USER` | Shlink | (secret) | Do not change. PostgreSQL default username. |
| `DB_DRIVER` | Shlink | postgres | Do not change. Sets the DB driver to PostgreSQL |
| `DB_PASSWORD` | Shlink | (secret) | Do not change. PostgreSQL password for the default user. |
| `DEFAULT_DOMAIN` | Shlink | - | Do not change. The domain for Shlink. |
| `INITIAL_API_KEY` | Shlink | (secret) | Default API key used for authentication. |
| `IS_HTTPS_ENABLED` | Shlink | true | Do not change. Ensures requests use HTTPS by default |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Shlink | true | Do not change. Makes private networking work with the database. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/shlink-url-shortener)
