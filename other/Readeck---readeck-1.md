# Deploy Readeck on Railway

Save, organize, and preserve web articles for focused reading.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/readeck-1)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/readeck-1)

**Published on the Railway marketplace:** https://railway.com/deploy/readeck-1

Readeck is an open-source read-later and bookmark manager that saves readable copies of web pages. It organizes articles with labels, favorites, archives, collections, highlights, full-text search, EPUB export, and browser extensions while keeping the reading library on infrastructure controlled by the deployer.

Hosting Readeck requires one public container and one persistent volume. This package builds a minimal wrapper from the digest-pinned, Umbrel-tested Readeck 0.22.3 image, exposes its documented port `8000` through Railway HTTPS, and mounts `/readeck`, which contains `config.toml`, the SQLite database, custom content scripts, and archived bookmark files. Railway supplies the canonical public URL and checks the unauthenticated `/login` page for readiness. A generated application secret protects sessions, while a generated password creates the initial `admin` account before the server first becomes public. SQLite is suitable for a single Readeck instance; do not add replicas that share this volume.

> **Lawful personal archiving notice:** Save only pages you are authorized to access and preserve. Follow each site's terms and applicable copyright law; do not circumvent access controls or paywalls, and do not redistribute archived content without permission.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Readeck | [aalfath/readeck-railway-template](https://github.com/aalfath/readeck-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `READECK_LOG_LEVEL` | info |
| `READECK_LOG_FORMAT` | text |
| `READECK_SECRET_KEY` | (secret) |
| `READECK_SERVER_HOST` | 0.0.0.0 |
| `READECK_SERVER_PORT` | 8000 |
| `READECK_ADMIN_PASSWORD` | (secret) |
| `READECK_ADMIN_USERNAME` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; if /bin/readeck user -u "$READECK_ADMIN_USERNAME" -p env:READECK_ADMIN_PASSWORD -group admin -dry-run -json | grep -q "\"exists\":false"; then /bin/readeck user -u "$READECK_ADMIN_USERNAME" -p env:READECK_ADMIN_PASSWORD -group admin >/dev/null; fi; exec /bin/readeck serve'`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/readeck`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/readeck-1)
