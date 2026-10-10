# Deploy TrailBase | (Just Updated) Rust Firebase Alternative, Admin Login Set From Boot, Data Survives Redeploys on Railway

TrailBase backend, admin login set from boot, data on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trailbase-or-just-updated-rust-firebase-)

## About

TrailBase is an open-source application server in a single Rust binary: SQLite with auth, record
APIs, realtime subscriptions, file storage, an admin UI and WASM or JS extensions. It is the
self-hosted alternative to Firebase or Supabase for apps that want one small process and one
database file.

This template runs TrailBase as a single service from a digest-pinned official image: the API and
admin UI on a Railway domain, an admin login whose password exists from the first boot, and the
whole depot (database, uploads, config) on a Railway volume.

TrailBase serves a REST and realtime API, authentication and an admin dashboard from one Rust process backed by SQLite. It runs as one container with its data on a Railway volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trailbase | `trailbase/trailbase:0.34.4@sha256:ccf9179006e13f0f4c7816a01d3420042af5de050e0c0214c5261420888f2785` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TRAILBASE_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; D=/app/traildepot; mkdir -p "$D"; if [ -z "$TRAILBASE_ADMIN_PASSWORD" ]; then echo "FATAL: TRAILBASE_ADMIN_PASSWORD must be set before TrailBase will start"; exit 1; fi; if [ "$(stat -c %u "$D")" != 1000 ]; then chown -R 1000:1000 "$D"; fi; echo "[railway] trailbase port=${PORT:-4000} depot_owner=$(stat -c %u:%g "$D") writable=$(su -s /bin/sh trailbase -c "test -w $D" && echo yes || echo NO)"; exec su -s /bin/sh trailbase -c '\''T="/app/trail --depot /app/traildepot"; L=/app/traildepot/.railway-init.log; $T run --address 127.0.0.1:4999 >$L 2>&1 & P=$!; for i in $(seq 1 90); do curl -sf http://127.0.0.1:4999/api/healthcheck >/dev/null 2>&1 && break; sleep 1; done; if $T user change-password admin@localhost "$TRAILBASE_ADMIN_PASSWORD" >/dev/null 2>&1; then echo "[railway] admin@localhost password set from TRAILBASE_ADMIN_PASSWORD"; else echo "[railway] admin@localhost not found (already replaced), password left alone"; fi; kill $P; wait $P 2>/dev/null || true; exec $T run --address "0.0.0.0:${PORT:-4000}"'\'''`
- **Healthcheck:** `/api/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/traildepot`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/trailbase-or-just-updated-rust-firebase-)
