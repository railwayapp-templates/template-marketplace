# Deploy reflex-railway-template on Railway

One-click Reflex starter: full-stack web apps in pure Python on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/reflex-railway-template)

## About

One Railway service runs the entire stack in a single Docker container derived from Reflex's official production one-port Dockerfile: Caddy on Railway's assigned `$PORT` serving the exported static frontend and proxying `/_event`, `/ping`, and `/_upload` to the Reflex backend (gunicorn/uvicorn in prod mode) on an internal port; an in-container Redis for prod state sync; and a SQLite database file for the demo app. Migrations run in the container start command (`reflex db migrate` when an `alembic/` directory is present). Railway's edge terminates TLS, so the browser reaches the backend through the same public origin with websocket over TLS. Expected usage for the demo is a few hundred MB of RAM; the build (frontend compile) is the memory-heavy step — see the plan guidance above.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [lNamelessl/reflex-railway-template](https://github.com/lNamelessl/reflex-railway-template) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/reflex-railway-template)
