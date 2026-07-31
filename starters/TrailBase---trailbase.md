# Deploy TrailBase on Railway

Open-source backend with SQLite, auth, realtime APIs, and an admin UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trailbase)

## About

TrailBase is an open-source application backend built on SQLite and Rust. It includes authentication, realtime subscriptions, type-safe REST APIs, file uploads, an admin dashboard, and a WebAssembly runtime in a single executable.

Hosting TrailBase on Railway runs the official versioned image with persistent storage at `/app/traildepot`. Railway provides HTTPS, public networking, healthchecks, and restart handling. The template sets the public URL automatically and exposes port 4000. On first boot, TrailBase creates an administrator and prints the temporary credentials in the service logs. Change the password after signing in at `/_/admin/`. Configure SMTP in the dashboard if your application needs verification, password reset, or other emails. Because TrailBase uses SQLite, keep the service on one replica and configure backups based on your needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TrailBase | `trailbase/trailbase:0.31.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4000 | Port used by TrailBase and Railway public networking. |
| `PUBLIC_URL` | - | Public URL used for auth redirects and email links. |

## Configuration

- **Start command:** `/app/trail --depot /app/traildepot run --address 0.0.0.0:4000`
- **Healthcheck:** `/api/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/traildepot`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/trailbase)
