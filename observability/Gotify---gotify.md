# Deploy Gotify on Railway

Gotify push notification server on Railway, REST API plus WebSocket stream

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gotify)

## About

Gotify is a small, self-hosted push notification server: your scripts and monitoring tools POST a JSON message to a REST endpoint, and every connected browser tab and Android phone receives it within milliseconds over a WebSocket. It is for people who want alerts on their phone without routing them through Pushover, Pushbullet or Firebase — homelab owners, sysadmins, and teams whose backup jobs and CI runs need somewhere to shout. MIT-licensed, written in Go, one binary with a web UI built in.

This template deploys Gotify with the durable setup its documentation recommends rather than the default single-file database. Two services come up: **gotify**, the server itself, which takes the public HTTPS URL, and **Postgres**, Railway's managed database, holding users, applications, client tokens and message history on the private network. A volume at `/data` keeps the application icons you upload. To self-host Gotify on Railway with real persistence, this is the whole setup.

![Gotify server and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788810584/gotify-architecture.png)

Gotify separates *senders* from *receivers*. An **application** is a sender: it owns a token, can only POST messages, and appears in the sidebar with its own icon, so you can see at a glance whether an alert came from your backup job or your uptime checker. A **client** is a receiver — a browser session or a phone — holding a token that reads the stream. Deleting a leaked application token revokes that one sender.

- REST API for sending, WebSocket stream for receiving, both documented with OpenAPI
- Priority levels that map to Android notification importance
- Markdown message bodies and click-through URLs via message `extras`
- Per-application icons, sort order and default priority
- Optional OIDC sign-on against Keycloak, Authelia, Dex and similar
- Multi-user, with admin and ordinary roles, and session elevation before token-revealing actions

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| gotify | `gotify/server:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | gotify | 8080 | Port Railway health-checks |
| `GOTIFY_LOGLEVEL` | gotify | info | Minimum log severity |
| `GOTIFY_PLUGINSDIR` | gotify | /data/plugins | Plugin directory, on the volume |
| `GOTIFY_SERVER_PORT` | gotify | 8080 | Port Gotify binds, overrides the image default 80 |
| `GOTIFY_PASSSTRENGTH` | gotify | 12 | bcrypt cost for stored passwords |
| `GOTIFY_REGISTRATION` | gotify | false | Public self-registration stays closed |
| `GOTIFY_DATABASE_DIALECT` | gotify | postgres | Database driver, sqlite3 is the alternative |
| `GOTIFY_DEFAULTUSER_NAME` | gotify | admin | First admin username, empty database only |
| `GOTIFY_DEFAULTUSER_PASS` | gotify | - | First admin password, empty database only |
| `GOTIFY_UPLOADEDIMAGESDIR` | gotify | /data/images | Application icons, on the volume |
| `GOTIFY_DATABASE_CONNECTION` | gotify | - | Postgres connection string |
| `GOTIFY_SERVER_SECURECOOKIE` | gotify | true | Secure flag on the session cookie |
| `GOTIFY_SERVER_TRUSTEDPROXIES` | gotify | 100.64.0.0/10,fd00::/8,152.233.0.0/17 | Railway edge ranges |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/gotify)
