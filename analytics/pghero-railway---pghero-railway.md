# Deploy pghero-railway on Railway

pghero - A performance dashboard for Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pghero-railway)

## About

Deploying pghero‑railway on Railway takes only a few clicks. Point the template at your `DATABASE_URL`, set optional BASIC&nbsp;AUTH credentials, and hit **Deploy**. Railway builds the image, provisions an HTTPS endpoint, and wires up health‑checks automatically. Because PgHero is stateless, Railway can restart or horizontally scale the service with zero downtime. Logs and metrics flow into the same dashboard you already use for your other apps, and upgrading is as simple as triggering a rebuild. You focus on tuning queries; Railway handles SSL, orchestration, and scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pghero | `ankane/pghero` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `DATABASE_URL` | Your database URL that you need for analysis  using pghero |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/template/pghero-railway)
