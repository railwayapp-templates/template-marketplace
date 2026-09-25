# Deploy TrailBase on Railway

TrailBase 0.33 Rust and SQLite app server with auth, APIs and admin UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trailbase-1)

## About

TrailBase is an open, single-executable application server built on Rust and SQLite. It gives you type-safe REST and realtime APIs over your tables, authentication with OAuth providers, file uploads, a JavaScript and WebAssembly runtime and an admin UI. Client libraries exist for TypeScript, Dart, Rust, Python, C#, Swift, Kotlin and Go.

This template deploys TrailBase v0.33.22 from the official image with its data directory on a Railway volume, so the database, uploads and migrations survive redeploys. On first start the default `admin@localhost` account is renamed to your admin email and given a generated password; on later starts the password is re-applied from the variable. The admin UI is at `/_/admin`. The server listens on IPv4 and IPv6, so other services can use the private URL. TrailBase is very light and fits the Hobby plan. Back up the volume regularly, since it holds the SQLite database and uploaded files.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trailbase | `trailbase/trailbase:0.33.22` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4000 |
| `TRAILBASE_ADMIN_EMAIL` | admin@example.com |
| `TRAILBASE_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `sh -c 'T="/app/trail --depot /app/traildepot"; $T run --address "[::]:4000" & pid=$!; trap "kill -TERM $pid" TERM INT; until curl -fs http://127.0.0.1:4000/api/healthcheck >/dev/null 2>&1; do kill -0 $pid 2>/dev/null || exit 1; sleep 1; done; if ! $T user change-password "$TRAILBASE_ADMIN_EMAIL" "$TRAILBASE_ADMIN_PASSWORD" >/dev/null 2>&1; then $T user change-email admin@localhost "$TRAILBASE_ADMIN_EMAIL" >/dev/null && $T user change-password "$TRAILBASE_ADMIN_EMAIL" "$TRAILBASE_ADMIN_PASSWORD" >/dev/null && echo "admin set to $TRAILBASE_ADMIN_EMAIL"; fi; wait $pid'`
- **Healthcheck:** `/api/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/traildepot`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/trailbase-1)
