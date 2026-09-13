# Deploy Tracktor on Railway

Vehicle logbook: fuel, servicing, reminders and running costs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tracktor)

## About

Tracktor is a logbook for the vehicles you own. Record every fuel fill-up, service, repair,
insurance renewal and registration date, and it works out your running costs, fuel economy and
mileage over time. It is the kind of record most people keep badly in a glovebox folder or not at
all. This is a community-maintained template; it is not affiliated with the Tracktor project.

Tracktor is straightforward to host: one Node service, one SQLite database, one directory holding
the database, uploaded documents and logs. There is no companion database and no queue, so a
deployment is a single service with a single persistent volume.

The part that needs care is who can get in. Tracktor has a real login with hashed passwords and
session cookies, but its registration endpoint is exempt from the session check, and that exemption
does not expire when the first account is created. It keeps accepting new accounts for the life of
the instance. Accounts are also not separated from each other, so any account can see every vehicle,
including VIN and licence plate. On a home network that is a small thing. On a public address it
means a stranger can enrol themselves and read your records. This template creates your account
before the service is reachable and refuses the registration route afterwards, so the instance is
yours from the first second it exists.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tracktor | `ghcr.io/youssefsiam38/tracktor-railway:1.0.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone used for dates. |
| `PORT` | 8080 | Port the proxy listens on. Railway probes its healthcheck here, so keep it equal to the domain's target port. |
| `HTTP_MODE` | https | Marks the session cookie Secure. Leave as https behind Railway TLS. |
| `APP_SECRET` | (secret) | Encrypts stored notification credentials. Changing it makes existing ones unreadable. |
| `CORS_ORIGINS` | - | Browser origins allowed to call the API. Upstream defaults to * ; this pins it to your own domain. |
| `TRACKTOR_OWNER_PASSWORD` | (secret) | Password for that account. Sign in with it, then change it in the app. Ignored once the account exists. |
| `TRACKTOR_OWNER_USERNAME` | (secret) | Username of the account created on first start. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tracktor)
