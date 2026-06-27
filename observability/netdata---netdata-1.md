# Deploy netdata on Railway

Real-time infrastructure monitoring, 300+ integrations, 2s startup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/netdata-1)

## About

# Netdata — Real-Time Infrastructure Monitoring

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/railway-netdata)
[![Netdata](https://img.shields.io/badge/Netdata-v2.10.3-00AB44?logo=netdata)](https://github.com/netdata/netdata)
[![License](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![GitHub Stars](https://img.shields.io/github/stars/netdata/netdata?style=social)](https://github.com/netdata/netdata)

<p align="center">
  <img width="600" alt="Netdata on Railway" src="./og-image.svg">
</p>

Deploy **Netdata** on Railway with one click — the most energy-efficient, real-time infrastructure monitoring platform. Monitor every metric from every second across your entire infrastructure with zero configuration.

---

## Features

- **Real-time monitoring** — per-second data collection and visualization
- **Zero configuration** — auto-discovers everything on the nodes it runs
- **ML-powered anomaly detection** — unsupervised machine learning on every metric
- **300+ integrations** — monitors containers, databases, web servers, and more
- **Interactive dashboards** — rich, interactive charts without query languages
- **Low resource usage** — ~1% CPU on a modern server, ~0.5 bytes per sample
- **Secure &amp; distributed** — no central data collection; your data stays on your infrastructure
- **Netdata Cloud ready** — optionally connect to [Netdata Cloud](https://app.netdata.cloud) for multi-node observability

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NETDATA_PORT` | `19999` | Port Netdata listens on |
| `PGID` | `1000` | Netdata process group ID |
| `DOCKER_GROUP_ID` | `1000` | Docker group ID for container monitoring |
| `NETDATA_CLAIM_TOKEN` | *(optional)* | Claim token to connect to Netdata Cloud |
| `NETDATA_CLAIM_URL` | *(optional)* | Netdata Cloud claim URL |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                    Railway Container              │
│                                                   │
│  ┌───────────────────────────────────────────┐   │
│  │            Netdata Agent v2.10.3           │   │
│  │                                             │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────────┐  │   │
│  │  │ Metrics  │ │ Health  │ │ ML Detection│  │   │
│  │  │ Collector│ │ Alarms  │ │ &amp; Anomalies │  │   │
│  │  └────┬────┘ └────┬────┘ └──────┬──────┘  │   │
│  │       │            │             │           │   │
│  │  ┌────▼────────────▼─────────────▼──────┐   │   │
│  │  │         Web Dashboard (Port 19999)     │   │   │
│  │  │   ┌──────────────────────────────┐     │   │   │
│  │  │   │  /api/v1/info  (Health Check)│     │   │   │
│  │  │   └──────────────────────────────┘     │   │   │
│  │  └──────────────────────────────────────┘   │   │
│  └───────────────────────────────────────────┘   │
│                                                   │
│  ┌───────────────────────────────────────────┐   │
│  │         Persistent Volume (Metrics)        │   │
│  │         /var/lib/netdata                   │   │
│  └───────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

Netdata runs as a single container with a persistent volume for historical metrics data. The health check endpoint at `/api/v1/info` ensures Railway can monitor service availability.

---

## Deploy and Host

### About Hosting

Netdata runs as a single Docker container with a persistent volume for metrics history. It requires no external database, no message queue, and no sidecar services. The container auto-discovers all running services on the same node and begins collecting metrics immediately — CPU, memory, disk, network, containers, and 300+ other integrations — with zero configuration.

Railway provides automatic HTTPS, global CDN, health monitoring, and persistent volumes. The default health check at `/api/v1/info` ensures Railway can monitor service availability.

- **Default Port:** 19999 (configurable via `NETDATA_PORT`)
- **Health Check:** `GET /api/v1/info` — returns HTTP 200 when ready
- **Startup Time:** ~2 seconds (Netdata is extremely lightweight)
- **Resource Usage:** ~1% CPU, ~110MB RAM on a modern server

### Health Endpoint

Railway uses the following endpoint for health checks:
- **URL:** `/api/v1/info`
- **Timeout:** 30 seconds
- **Start period:** 60 seconds (allows metric collectors to initialize)

---

## Why Deploy Netdata on Railway?

| Feature | Benefit |
|---------|---------|
| **Zero configuration** | Auto-discovers everything — just deploy and see dashboards instantly |
| **Extremely lightweight** | ~1% CPU, ~0.5 bytes per sample — fits comfortably on free tier |
| **300+ integrations** | Monitors containers, databases, web servers, and more out of the box |
| **ML-powered anomaly detection** | Unsupervised machine learning on every metric, no training data needed |
| **Real-time dashboards** | Per-second data with interactive charts — no query languages required |
| **Secure &amp; distributed** | Your data stays on your infrastructure; no central collection point |
| **Persistent metrics** | Railway volumes retain historical data across redeploys |

With Railway, you get automatic HTTPS, global CDN, health monitoring, and scalable infrastructure — without managing servers.

---

## Common Use Cases

- **Server monitoring** — Track CPU, memory, disk, and network across all your Railway services
- **Container observability** — See what's happening inside your containers with per-second granularity
- **Anomaly detection** — ML-powered alerts when metrics deviate from learned baselines
- **Capacity planning** — Historical dashboards to understand resource trends and growth patterns
- **Incident response** — Real-time dashboards during outages to identify root causes faster

---

## Dependencies for Netdata

### Deployment Dependencies

- **Runtime:** Netdata v2.10.3 (bundled in the container image)
- **Storage:** Persistent volume at `/var/lib/netdata` for historical metrics
- **External access:** Port 19999 (configurable) for the web dashboard and API
- **Optional:** Netdata Cloud claim token for multi-node observability (no account required for single-node use)

---

<p>
  <img width="200" alt="Netdata Dashboard" src="./template-icon.svg">
  <img width="400" alt="Netdata Preview" src="./og-image.svg">
</p>

---

## Getting Started

### Deploy on Railway

1. Click the **Deploy on Railway** button above
2. Configure any environment variables (optional)
3. Click deploy
4. Access the Netdata dashboard at `https://:19999`

### Local Development

```bash
# Build the Docker image
docker build -t railway-netdata .

# Run the container
docker run -d \
  --name netdata \
  -p 19999:19999 \
  -v netdata-data:/var/lib/netdata \
  railway-netdata

# Verify it's running
curl http://localhost:19999/api/v1/info
```

---

## Troubleshooting

**Health check failing?**
The startup period is 60 seconds. Netdata needs time to initialize metric collectors. If it persists, check logs: `railway logs`.

**Port already in use?**
Change the `NETDATA_PORT` environment variable to an available port.

**Not seeing metrics?**
Netdata auto-discovers services running on the same system. Ensure the services you want to monitor are running and network-accessible.

**Volume not persisting?**
The `/var/lib/netdata` volume stores historical metrics. On Railway, volumes persist across redeploys but not across environments. Refer to [Railway volumes documentation](https://docs.railway.app/reference/volumes) for details.

---

## Updating Netdata

This template pins Netdata to version v2.10.3. To update:

1. Update the `FROM` line in `Dockerfile` to the desired version tag
2. Rebuild and redeploy

Check [Netdata Releases](https://github.com/netdata/netdata/releases) for the latest version.

---

## License

Netdata is [GPL-3.0 licensed](https://github.com/netdata/netdata/blob/master/LICENSE).

This Railway template is provided by [INAPP-Mobile](https://github.com/INAPP-Mobile). Not affiliated with or endorsed by Netdata.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| netdata | [INAPP-Mobile/railway-netdata](https://github.com/INAPP-Mobile/railway-netdata) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/netdata-1)
