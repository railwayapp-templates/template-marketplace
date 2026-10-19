# Deploy Freelancer Coding Ledger with Wakapi on Railway

Self-host coding statistics with durable heartbeats and HTTPS cookies.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/freelancer-coding-ledger-with-wakapi)

## About

Self-host coding statistics with durable heartbeats and HTTPS cookies.

Freelancers who want project-level coding-time estimates under their control.

Register your account, then set WAKAPI_ALLOW_SIGNUP=false in Railway and redeploy. Obtain your personal API key and point your editor WakaTime plugin at https://YOUR_DOMAIN/api/compat/wakatime/v1. Send a heartbeat before relying on reports.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /data | HTTPS domain |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `ghcr.io/muety/wakapi@sha256:7a14217db1b6a47816c8d8d0590cc40fa12fd409dfed6c194bbb4cd50f43d913` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | - |
| `PORT` | 3000 | - |
| `WAKAPI_PORT` | 3000 | - |
| `WAKAPI_DB_NAME` | /data/wakapi.db | - |
| `WAKAPI_DB_TYPE` | sqlite3 | - |
| `WAKAPI_LISTEN_IPV4` | 0.0.0.0 | - |
| `WAKAPI_LISTEN_IPV6` | - | - |
| `WAKAPI_ALLOW_SIGNUP` | true | Close registration after creating your account. |
| `WAKAPI_PASSWORD_SALT` | (secret) | - |
| `WAKAPI_INSECURE_COOKIES` | false | - |
| `WAKAPI_LEADERBOARD_ENABLED` | false | - |
| `WAKAPI_DATA_RETENTION_MONTHS` | 12 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/freelancer-coding-ledger-with-wakapi)
