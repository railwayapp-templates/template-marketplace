# Deploy VPS Fleet Watch Hub with Beszel on Railway

A persistent Beszel hub for external VPS agents and fleet alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vps-fleet-watch-hub-with-beszel)

## About

A persistent Beszel hub for external VPS agents and fleet alerts.

Operators managing a small fleet of VPS machines outside Railway.

Set USER_EMAIL to your real administrator address before deploying. Sign in with USER_PASSWORD from Railway variables, add a system and install the upstream Beszel agent on that VPS. Configure its HUB_URL and TOKEN for outbound WebSocket connectivity.

### Included services and storage

| Service | Persistent storage | Public access |
| --- | --- | --- |
| App | /beszel_data | HTTPS domain |

### First deployment

1. Review required inputs in the deploy form and supply your own administrator email where requested.
2. Deploy the services and wait for the application and any database migrations to finish.
3. Open the generated HTTPS domain and follow the workflow above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `henrygd/beszel@sha256:6b39a8b64f9b15d00a25e7683e31a93c46161182a54f62713525107064e10599` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | - |
| `PORT` | 8090 | - |
| `USER_EMAIL` | - | Your administrator email; required to create the first user. |
| `DISABLE_SSH` | true | - |
| `CHECK_UPDATES` | false | - |
| `USER_CREATION` | false | - |
| `USER_PASSWORD` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/beszel_data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/vps-fleet-watch-hub-with-beszel)
