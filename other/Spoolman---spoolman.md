# Deploy Spoolman on Railway

3D-printer filament inventory, with a password in front of it

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spoolman)

## About

Spoolman keeps track of your 3D-printer filament: which spools you own, what material and colour
each one is, who made it, and how many grams are left. Your printer talks to it directly, so every
print subtracts what it used and the numbers stay honest without you weighing anything. Klipper
through Moonraker, OctoPrint, Home Assistant and several slicers all integrate with it. This is a
community-maintained template; it is not affiliated with the Spoolman project.

Spoolman is small and simple to host: one Python service, one SQLite database, one directory holding
the database and its nightly backups. There is no companion database and no queue, so a deployment
is a single service with a single persistent volume.

The part that needs care is authentication, because Spoolman has none. Upstream says so directly in
its source: the boundary that protects a user's data is the network. That is a sound assumption on a
home network and a dangerous one on a hosting platform, where every service is handed a public
address the moment it starts. Deployed as-is, anyone who finds the URL can read your inventory,
change it, or delete it. This template puts a password in front of the application and binds the
application itself to loopback, so the only way in is through the front door. The password is
generated for you, and printer integrations still work because they authenticate through the URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| spoolman | `ghcr.io/youssefsiam38/spoolman-railway:1.0.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone used for timestamps. |
| `PORT` | 8000 | Port the front door listens on. Railway probes its healthcheck here, so keep it equal to the domain's target port. |
| `SPOOLMAN_AUTH_PASSWORD` | (secret) | Password for that prompt. Spoolman has no login of its own, so this is what keeps your inventory private. |
| `SPOOLMAN_AUTH_USERNAME` | (secret) | Username for the password prompt that protects this instance. |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/app/.local/share/spoolman`

**Category:** Other

[View on Railway →](https://railway.com/deploy/spoolman)
