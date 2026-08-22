# Deploy Maintenant on Railway

Uptime monitoring, SSL checks, and alerts. Go + SQLite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/maintenant)

## About

Maintenant monitors your websites and APIs and tells you the moment something goes down. It checks URLs on a schedule, watches SSL certificate expiration dates, and sends alerts through your preferred channel.

Maintenant is a single Go binary with SQLite. No external database, no dependencies. Deploy from this template and add your endpoints in the web UI. It pings them from Railway's network, which is where you want your uptime monitor running — not on the same machine as what it's monitoring.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| maintenant | [kOlapsis/maintenant](https://github.com/kOlapsis/maintenant) | Worker |

**Category:** Observability · **Languages:** Go, Vue, TypeScript, CSS, Shell, Dockerfile, Go Template, HTML, Makefile

[View on Railway →](https://railway.com/deploy/maintenant)
