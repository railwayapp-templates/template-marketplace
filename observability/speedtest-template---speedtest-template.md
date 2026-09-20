# Deploy speedtest-template on Railway

Track your internet speed over time - scheduled tests, graphs, history

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/speedtest-template)

## About

Deploying this template provisions one Railway service running the linuxserver.io Speedtest Tracker image (`lscr.io/linuxserver/speedtest-tracker:1.15.0`) with a public domain pinned to the app's web UI on port 80 (Railway terminates TLS at the edge), plus one persistent volume mounted at `/config` for the SQLite database and app config. On first boot the boot wrapper generates the mandatory Laravel `APP_KEY`, the image runs database migrations automatically, and the web UI is reachable at your Railway domain within a couple of minutes.

Hosting Speedtest Tracker on Railway gives you an always-on measurement point that is independent of your home connection — useful when you want history from a specific region or datacenter. Everything stateful lives in the `/config` volume: results are stored in SQLite (`/config/database.sqlite`), and the app's Laravel log lives under `/config/log/`. The tracker runs tests on schedule through the image's internal scheduler (no extra cron service), and each test is processed by the image's built-in queue worker. Outbound internet access from Railway is standard, so Ookla server selection and tests work out of the box. Because the deployment is single-service, scaling is unnecessary — the tracker is idle between tests.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| speedtest-template | [lNamelessl/speedtest-tracker-railway-template](https://github.com/lNamelessl/speedtest-tracker-railway-template) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/speedtest-template)
