# Deploy Rackpad on Railway

Rackpad — self-hosted infrastructure inventory and operations workspace

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rackpad)

## About

# Rackpad

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/rackpad)

Rackpad is a self-hosted infrastructure inventory and operations workspace for homelabs, small racks, network rooms, and lab environments. It brings racks, devices, ports, cables, Networks/IPAM, storage, Wi-Fi, compute, discovery, monitoring, documentation, images, integrations, reports, labs, and administration into one clean app.

## Features

- **Rack management** — Visual rack layouts with device placement, U-position tracking, and front/rear views
- **Network & IPAM** — Track subnets, IP assignments, VLANs, and switch port mappings
- **Cable management** — Map physical and logical connections between devices
- **Discovery** — Automatic network discovery via ARP scan, nmap, and ping sweeps
- **Monitoring integration** — Background health checks for services and devices
- **OIDC authentication** — Optional single sign-on with role-based access control
- **Native backups** — SQLite snapshots and JSON export for data portability
- **Persistent storage** — All data stored in a Railway volume mounted at `/data`

## Common Use Cases

- **Homelab inventory** — Keep track of servers, switches, UPS units, and peripherals
- **Network documentation** — Map physical ports to VLANs and IP subnets
- **Cable tracing** — Record which cables connect which ports and devices
- **Discovery monitoring** — Automatically discover new devices and track their status
- **Lab environment management** — Document shared lab resources and access

## Dependencies for

### Deployment Dependencies

Rackpad requires only a persistent volume for its built-in SQLite database. No external database service is needed.

- **Persistent volume** — Mounted at `/data` (included by default)
- **Port** — Application listens on port `3000`

## Config

| Variable | Description | Default |
|---|---|---|
| `PORT` | HTTP port Rackpad listens on | `3000` |
| `TRUST_PROXY` | Set to `1` to trust reverse proxy headers (required on Railway) | `1` |
| `APP_URL` | Public URL of your instance | `${{RAILWAY_PUBLIC_DOMAIN}}` |

## Deploy and Host

Deploy and host your own Rackpad instance on Railway in one click.

### About Hosting

Rackpad is a single-container Node.js application with a built-in SQLite database. On Railway, it runs as a single service with a persistent volume mounted at `/data`. The database is created automatically on first boot. The app serves both the REST API and the web UI on a single port.

### Why Deploy

- Instant HTTPS via Railway domains
- Automatic restarts and health checks
- Persistent volume included by default
- Scale with zero configuration
- Built-in network discovery and monitoring

## First-Run Setup

1. Deploy via the button above
2. Open the public URL
3. Create your admin account on first visit
4. Start adding racks, devices, and network assets

## License

This template is provided under the MIT license. Rackpad itself is licensed under the MIT license.

---

For more information, visit [github.com/Kobii-git/Rackpad](https://github.com/Kobii-git/Rackpad).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rackpad | [mc9max/rackpad](https://github.com/mc9max/rackpad) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 3000 |
| `NODE_ENV` | production |
| `TRUST_PROXY` | 0 |
| `OIDC_ENABLED` | 0 |
| `DATABASE_PATH` | /data/rackpad.db |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability · **Languages:** TypeScript, JavaScript, Shell, CSS, PowerShell, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/rackpad)
