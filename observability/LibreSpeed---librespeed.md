# Deploy LibreSpeed on Railway

Browser-based network speed test you run on your own server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librespeed)

## About

LibreSpeed is an open-source HTML5 speed test measuring download, upload, ping and jitter straight from the browser — no Flash, no Java, no WebSockets, just XMLHttpRequest and Web Workers. Network engineers, ISPs, hosting providers and homelab owners reach for it when they want a speed test running on *their* server, so the number on screen reflects the path a customer actually takes to their infrastructure.

Deploy LibreSpeed on Railway and you get the whole test point, not just the front end. Two services come up together: `librespeed`, an Apache and PHP container serving the interface and the `garbage.php`, `empty.php` and `getIP.php` endpoints the test drives, and `Postgres`, a private database holding the telemetry table so each test can be stored, shared as an image and browsed later. The browser generates real load against `librespeed` through Railway's edge; only the result summary reaches Postgres, over the private network.

![Diagram of the LibreSpeed and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788836373/librespeed-architecture.png)

A speed test is only as honest as the server it runs against. Public tests measure the route to whichever nearby node the provider picked — the wrong measurement when you are debugging the link between a user and your application. Self-hosting LibreSpeed puts the test point where your service lives, and the data stays in a database you own.

Key features:

- Download, upload, ping and jitter in one browser test, no plugins
- IP, ISP and country detection from a bundled offline database
- Telemetry with a password-protected stats page and shareable cards
- Stability testing with latency charts, loss tracking and CSV export
- Multiple points of test: one front end can offer a list of servers
- Classic and modern interfaces, switchable with `?design=old` or `?design=new`
- Companion Android app, CLI client, Go and Rust backends

The architecture is deliberately small. `librespeed` is the whole application: Apache with mod_php serving static assets plus four short PHP endpoints — one streams random data for the download measurement, another accepts and discards the upload. `Postgres` holds only telemetry, one row per test, so the app needs no volume and redeploys without losing history.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| librespeed | [gridalpha/librespeed-railway](https://github.com/gridalpha/librespeed-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODE` | librespeed | standalone | Serves both the UI and the test backend |
| `PORT` | librespeed | 8080 | HTTP port Apache listens on |
| `TITLE` | librespeed | LibreSpeed | Page title and heading |
| `DB_NAME` | librespeed | - | Telemetry database name |
| `DB_TYPE` | librespeed | postgresql | Telemetry backend |
| `TAGLINE` | librespeed | No Flash, No Java, No Websockets, No Bullsh*t | Subtitle on the modern design |
| `DISTANCE` | librespeed | km | Distance units; needs IPINFO_APIKEY to show |
| `PASSWORD` | librespeed | (secret) | Password for the /results/stats.php page |
| `TELEMETRY` | librespeed | true | Store completed tests in the database |
| `GDPR_EMAIL` | librespeed | privacy@example.com | Contact address in the privacy policy |
| `DB_HOSTNAME` | librespeed | - | Private Postgres hostname |
| `DB_PASSWORD` | librespeed | (secret) | Telemetry database password |
| `DB_USERNAME` | librespeed | (secret) | Telemetry database user |
| `IPINFO_APIKEY` | librespeed | - | ipinfo.io key, only for distance measurement |
| `DISABLE_IPINFO` | librespeed | false | Resolve ISP from the bundled offline database |
| `USE_NEW_DESIGN` | librespeed | true | Modern interface; false for the classic one |
| `SERVER_LIST_URL` | librespeed | - | Remote server list for multiple test points |
| `OBFUSCATION_SALT` | librespeed | - | Keeps shared links valid across redeploys |
| `REDACT_IP_ADDRESSES` | librespeed | true | Store 0.0.0.0 instead of the visitor address |
| `ENABLE_ID_OBFUSCATION` | librespeed | true | Hide sequential test IDs in shared links |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/librespeed)
