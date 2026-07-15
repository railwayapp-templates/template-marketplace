# Deploy Chirp Launch Board on Railway

Deploy a polished Python + HTMX app powered by Chirp. Zero configuration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chirp-launch-board)

## About

Launch Board is a polished Python + HTMX full-stack starter powered by Chirp.
It is useful immediately and small enough to understand in a few minutes.

Railway builds the locked Python 3.14 application with Railpack, starts it with
the explicit `python app.py` command, and verifies readiness at `/ready`. The
template creates one public service, resolves the production environment, and
generates a unique 64-character application secret. You enter no configuration.

The checklist is intentionally stored in a signed per-browser session cookie.
It demonstrates the complete interaction architecture without claiming shared
or durable persistence; the source keeps a clear seam for replacing that state
with PostgreSQL later.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [lbliii/chirp-railway-starter](https://github.com/lbliii/chirp-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CHIRP_SECRET_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, CSS, HTML

[View on Railway →](https://railway.com/deploy/chirp-launch-board)
