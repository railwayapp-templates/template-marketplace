# Deploy Traccar on Railway

Traccar GPS tracking behind a password, with phone-app position tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/traccar)

## About

Traccar is a leading open-source GPS tracking platform: a web dashboard with live maps, geofences, reports and
events, fed by phone apps or GPS hardware. This is a community-maintained template; it is not affiliated with the
Traccar project.

Traccar is a Java server with a web UI and a database, plus dozens of device-protocol listeners. On a public URL
it exposes login and registration — and on a fresh instance the first person to register becomes the
administrator. It also needs the right reverse-proxy headers, and devices need a reachable protocol port to
report to.

This template runs Traccar on Railway behind one password. A Caddy front-door adds HTTP basic authentication over
the web dashboard and REST API (keeping the instance private and closing the first-user-admin race), while an
open `/osmand` path routes the OsmAnd protocol so the free Traccar Client phone apps (and other HTTP trackers)
can report positions over HTTPS. Data is stored in an embedded database on a volume, so it is fully
self-contained; an external MySQL/PostgreSQL is optional.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| traccar | `traccar/traccar:6.15` | Database |
| caddy | `ghcr.io/youssefsiam38/traccar-railway-caddy:1.0.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | traccar | - | JDBC URL for an external MySQL/PostgreSQL database. |
| `DATABASE_USER` | traccar | (secret) | External database user. |
| `MAIL_SMTP_HOST` | traccar | - | SMTP host for notification emails (with the other MAIL_SMTP_* keys). |
| `DATABASE_DRIVER` | traccar | - | JDBC driver class for an external database instead of the embedded H2 (e.g. org.postgresql.Driver). |
| `WEB_REGISTRATION` | traccar | false | Public self-registration off; the first user (created behind the front door) still becomes admin. |
| `DATABASE_PASSWORD` | traccar | (secret) | External database password. |
| `CONFIG_USE_ENVIRONMENT_VARIABLES` | traccar | true | Let Traccar read configuration from environment variables. |
| `PORT` | caddy | 8080 | - |
| `TRACCAR_WEB` | caddy | - | Internal host:port of Traccar's web/API; the front door proxies to it. |
| `OWNER_PASSWORD` | caddy | (secret) | The front-door password (HTTP basic auth), generated. Copy it from here; username is 'owner'. |
| `OWNER_USERNAME` | caddy | (secret) | The front-door username you sign in with. |
| `TRACCAR_OSMAND` | caddy | - | Internal host:port of Traccar's OsmAnd protocol; /osmand routes here. |

## Configuration

- **Volume:** `/opt/traccar/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/traccar)
