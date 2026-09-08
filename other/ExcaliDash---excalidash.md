# Deploy ExcaliDash on Railway

Self-hosted Excalidraw dashboard with storage, sharing and collaboration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/excalidash)

## About

ExcaliDash is a self-hosted dashboard for Excalidraw. Save drawings, organize collections, restore previous versions, and collaborate through scoped sharing links.

This template deploys the upstream 0.6.0 frontend and backend images. The frontend provides the public HTTPS address and proxies API and collaboration traffic to a private backend. A persistent volume stores SQLite, drawings, embedded image data, and authentication state. Authentication is enabled before the first public request.

ExcaliDash is beta software. Back up your data before upgrading.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | `zimengxiong/excalidash-backend:0.6.0` | Database |
| frontend | `zimengxiong/excalidash-frontend:0.6.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | backend | 8000 |
| `NODE_ENV` | backend | production |
| `AUTH_MODE` | backend | local |
| `JWT_SECRET` | backend | (secret) |
| `CSRF_SECRET` | backend | (secret) |
| `TRUST_PROXY` | backend | 2 |
| `DATABASE_URL` | backend | file:/app/prisma/dev.db |
| `DATABASE_PROVIDER` | backend | sqlite |
| `API_KEY_HASH_PEPPER` | backend | (secret) |
| `UPDATE_CHECK_OUTBOUND` | backend | false |
| `ENFORCE_HTTPS_REDIRECT` | backend | false |
| `PORT` | frontend | 80 |

## Configuration

- **Start command:** `/bin/sh -c "set -e; grep -q RAILWAY_BOOTSTRAP_SQL /app/docker-entrypoint.sh || sed -i '/^# 4. Start Application/i printenv RAILWAY_BOOTSTRAP_SQL | su-exec nodejs npx prisma db execute --stdin --schema=/app/prisma/schema.prisma' /app/docker-entrypoint.sh; exec /app/docker-entrypoint.sh"`
- **Healthcheck:** `/health`
- **Volume:** `/app/prisma`
- **Start command:** `/bin/sh -c "set -e; grep -q 'upstream excalidash_api' /etc/nginx/nginx.conf.template || sed -i 's/http {/http { resolver [fd12::10] valid=10s; upstream excalidash_api { zone excalidash_api 64k; server __BACKEND_URL__ resolve; }/; s@proxy_pass http://__BACKEND_URL__@proxy_pass http://excalidash_api@g' /etc/nginx/nginx.conf.template; exec /docker-entrypoint.sh nginx -g 'daemon off;'"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/excalidash)
