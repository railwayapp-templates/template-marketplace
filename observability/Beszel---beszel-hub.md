# Deploy Beszel on Railway

Dashboard that tracks CPU, memory and disk across your servers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/beszel-hub)

## About

Beszel is an open-source server monitoring platform for people who want real machine
metrics without running Prometheus and Grafana to get them. A single hub serves the
dashboard and stores history, while a tiny agent on each monitored machine reports CPU,
memory, disk, network, load average, temperature, GPU, S.M.A.R.T. health and per-container
Docker or Podman statistics. The agent idles at roughly 10–15 MB of RAM, which is why
homelab operators and small platform teams reach for it instead of heavier observability
suites; Netdata's agent typically wants 200–500 MB for similar ground.

Self-hosting Beszel on Railway gives you the hub — the half that wants a stable public
address, a persistent database and someone else's uptime. This template runs the hub from
the `gridalpha/beszel-railway` source repository, which layers the upstream
`henrygd/beszel` binary onto Alpine and starts it on port 8090 behind a generated
`*.up.railway.app` domain. A 5 GB volume at `/beszel_data` holds the embedded PocketBase
database and the hub's signing key, and a managed object-storage bucket receives scheduled
backups of it. Your own servers stay where they are: agents dial out over an authenticated
WebSocket, so nothing on the monitored side needs an open inbound port.

![Diagram of the Beszel hub service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787777081/beszel-architecture.png)

Beszel splits cleanly in two. The hub is a single Go binary with an embedded PocketBase
database and a compiled-in React dashboard; it owns users, history, alert rules and agent
connections. The agent is a second small binary that reads the machine it runs on and
streams samples back. Because the hub keeps everything in one SQLite file on a volume, there
is no separate database, cache or worker tier — which is why it stays cheap. Self-host it
when you want per-machine history you own, across servers in different places: a VPS, a NAS
at home, a build box under a desk.

Key features:

- Historical charts for CPU, memory, disk, network, load average, temperature, fan speed,
  GPU (Nvidia, AMD, Intel), battery and S.M.A.R.T. disk health
- Per-container Docker and Podman statistics, including logs and inspect output
- Threshold and status alerts by email or webhook
- Multi-user accounts with per-system sharing, plus OAuth2 and OIDC providers
- Systemd service monitoring, and systems declared in `config.yml`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| beszel | [gridalpha/beszel-railway](https://github.com/gridalpha/beszel-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8090 | Hub HTTP listening port |
| `APP_URL` | - | Public URL used in alert links |
| `S3_BUCKET` | - | Backup bucket name |
| `S3_REGION` | - | Backup bucket region |
| `USER_EMAIL` | admin@example.com | First account email, created on first boot |
| `BACKUP_CRON` | 0 4 * * * | Nightly database backup schedule |
| `BACKUP_KEEP` | 7 | Backup copies retained |
| `S3_ENDPOINT` | - | Backup bucket S3 endpoint |
| `USER_PASSWORD` | (secret) | First account password, read once on first boot |
| `S3_ACCESS_KEY_ID` | - | Backup bucket access key |
| `S3_SECRET_ACCESS_KEY` | (secret) | Backup bucket secret key |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/beszel_data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/beszel-hub)
