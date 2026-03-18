# Deploy Pocketbase on Railway

Secure scalable self-hosted backend: persistence, easy deploy, healthcheck.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocketbase-1)

## About

Pocketbase is a lightweight, open-source backend packed into a single Go binary that includes a realtime SQLite database, built-in authentication, file storage, access rules, and an elegant admin UI. It exposes REST and realtime APIs, supports schema migrations and JavaScript hooks, enabling you to ship MVPs or small-to-medium apps quickly without wiring multiple services.

Hosting pocketbase is simple: run the single binary in a container, expose the HTTP port, and persist the data directory. This template pins a release for reproducible builds, runs as a non-root user, honors the platform’s `$PORT`, and expects a volume at `/srv/pb/pb_data` so records, files, and config survive restarts. On first deploy, visit your instance’s **`/_/`** path to create the **superuser** (admin). If you see a login screen instead, check the service logs for the one-time installer link or create a superuser via CLI. Upgrades are as easy as rebuilding with a newer version.

&gt; **First-time setup:** After the first successful deploy, open `https:///_/` to register the superuser for your instance. This happens once per new data volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase | [codestorm-official/pocketbase](https://github.com/codestorm-official/pocketbase) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `DATA_DIR` | /data | - |
| `PB_SHA256` | - | This field is optional; you may leave it empty. |
| `PB_VERSION` | 0.29.3 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/pocketbase-1)
