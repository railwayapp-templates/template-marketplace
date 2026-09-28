# Deploy Frankfurter on Railway

Frankfurter 2.5: self-hosted exchange-rate API with central bank data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/frankfurter)

## About

Frankfurter is an open-source currency API that tracks daily exchange rates published by central banks, including the European Central Bank. It serves latest and historical rates and time series as JSON, with no API key. Running your own instance removes rate limits and third-party availability from your checkout or reporting code.

This template runs the official `lineofflight/frankfurter:2.5.1` image as one public service. On first boot, it creates a SQLite database on a Railway volume and starts backfilling history from its providers. Recent rates appear within a minute, and the full history takes longer. A scheduler in the same container fetches new rates every day. The API is read-only and needs no authentication. A few providers need free API keys, which you can add as variables; everything else works without them. The web server runs two Puma workers as an unprivileged user and fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frankfurter | `lineofflight/frankfurter:2.5.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `BCCH_USER` | (secret) |
| `BAM_API_KEY` | (secret) |
| `BOT_API_KEY` | (secret) |
| `MAX_THREADS` | 5 |
| `DATABASE_URL` | sqlite:///app/data/frankfurter.sqlite3 |
| `FRED_API_KEY` | (secret) |
| `TCMB_API_KEY` | (secret) |
| `BANXICO_API_KEY` | (secret) |
| `WORKER_PROCESSES` | 2 |

## Configuration

- **Start command:** `sh -c 'chown frankfurter:frankfurter /app/data; exec setpriv --reuid=frankfurter --regid=frankfurter --init-groups sh -c "bundle exec rake db:setup && exec bundle exec foreman start"'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/frankfurter)
