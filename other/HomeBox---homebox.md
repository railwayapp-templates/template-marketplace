# Deploy HomeBox on Railway

Home inventory and asset tracking with durable records and uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homebox)

## About

This template runs the official HomeBox 0.26.2 container on port `7745` and
publishes only its web interface through Railway HTTPS. HomeBox stores its
SQLite database and attachments on one persistent volume mounted at `/data`.
Railway generates the required API-key pepper, supplies safe application
defaults, and leaves no manual deployment inputs. The service uses `/` for
Railway liveness and exposes `/api/v1/status` for an application-level probe.
Back up `/data` before upgrading, especially when moving from a pre-0.26
release because 0.26 introduced a substantial database and entity-model
migration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| HomeBox | `ghcr.io/sysadminsmedia/homebox:0.26.2@sha256:b1ad7e3c63f732a5f6daa466e8116be4f545b3b120383a64dcb62beb00a660cc` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Container timezone; change after deployment if needed. |
| `PORT` | 7745 | Railway edge and health-check port. |
| `HBOX_WEB_PORT` | 7745 | HomeBox HTTP listen port. |
| `HBOX_LOG_LEVEL` | info | Use informational application logging. |
| `HBOX_LOG_FORMAT` | text | Emit readable text logs. |
| `HBOX_AUTH_API_KEY_PEPPER` | (secret) | Unique 64-character pepper generated at deployment; rotating it invalidates issued API keys. |
| `HBOX_WEB_MAX_UPLOAD_SIZE` | 10 | Maximum application upload size in megabytes. |
| `HBOX_OPTIONS_ALLOW_ANALYTICS` | false | Disable optional HomeBox analytics. |
| `HBOX_OPTIONS_ALLOW_REGISTRATION` | true | Allow creation of the first HomeBox account. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/homebox)
