# Deploy Onyx Lite on Railway

Onyx Lite - Open Source AI Platform - AI Chat with advanced features

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onyx-lite)

## About

Onyx is an open-source AI chat platform that works with any LLM. Onyx Lite is its official minimal deployment: the full chat experience (agents, Projects, file uploads, tools and MCP) on PostgreSQL alone, without the search index, Redis, object storage and model servers that the full stack needs.

This template follows upstream's `docker-compose.onyx-lite.yml`: `DISABLE_VECTOR_DB=true`, with the cache, login sessions and uploaded files moved into Postgres. Four services run: a Caddy front door (the only public one), the Next.js web server, the FastAPI API server and Postgres.

On the first boot the API server applies Onyx's database migrations; until it answers, the front door shows a 'starting' page. Then open the URL and create your account: the first account on a new instance becomes the admin, so do it as soon as the deploy finishes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api-server | `onyxdotapp/onyx-backend:v4.8.1` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Caddy | `caddy:2.11-alpine` | Web service |
| web-server | `onyxdotapp/onyx-web-server:v4.8.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | api-server | 8080 | Port uvicorn listens on; Railway's healthcheck and the proxy use it. Leave as is. |
| `WEB_DOMAIN` | api-server | - | Public URL of the Onyx service, used for login redirects and links. |
| `POSTGRES_DB` | api-server | - | Postgres database (from the Postgres service). |
| `AUTH_BACKEND` | api-server | postgres | Lite: login sessions live in Postgres instead of Redis. |
| `CACHE_BACKEND` | api-server | postgres | Lite: caching and locks live in Postgres instead of Redis. |
| `POSTGRES_HOST` | api-server | - | Private hostname of the Postgres service. |
| `POSTGRES_PORT` | api-server | - | Postgres port. |
| `POSTGRES_USER` | api-server | (secret) | Postgres user (from the Postgres service). |
| `USER_AUTH_SECRET` | api-server | (secret) | Signs password-reset, verification and OAuth state tokens. Generated per deploy. |
| `DISABLE_VECTOR_DB` | api-server | true | Onyx Lite switch: no vector index, connectors or RAG search; chat, uploads and Projects stay on. |
| `POSTGRES_PASSWORD` | api-server | (secret) | Postgres password (from the Postgres service). |
| `FILE_STORE_BACKEND` | api-server | postgres | Lite: uploaded files live in Postgres instead of S3/MinIO. |
| `DISABLE_MODEL_SERVER` | api-server | true | No local embedding model server runs in Lite, so Onyx never tries to reach one. |
| `ENCRYPTION_KEY_SECRET` | api-server | (secret) | Encrypts stored LLM keys and credentials. Never change it after saving any. |
| `POSTGRES_API_SERVER_POOL_SIZE` | api-server | 20 | Connections per pool; the API opens two pools, sized to fit Postgres' 100-connection cap. |
| `POSTGRES_API_SERVER_POOL_OVERFLOW` | api-server | 10 | Extra connections per pool under load. |
| `POSTGRES_DB` | Postgres | onyx | Database Onyx migrates into. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Caddy | 8080 | Port Caddy listens on; the public domain targets it. Leave as is. |
| `API_HOST` | Caddy | - | Private address of api-server; /api, /scim, /auth/saml and /openapi.json go here. |
| `WEB_HOST` | Caddy | - | Private address of web-server; every other path goes here. |
| `CADDYFILE` | Caddy | {
	admin off
	auto_https off
	servers {
		trusted_proxies static private_ranges 100.64.0.0/10
	}
}

:{$PORT} {
	log

	handle /proxy-healthz {
		respond "ok" 200
	}

	handle /api/* {
		uri strip_prefix /api
		reverse_proxy {$API_HOST}
	}

	@backend path /openapi.json /auth/saml /auth/saml/* /scim /scim/*
	handle @backend {
		reverse_proxy {$API_HOST}
	}

	handle {
		reverse_proxy {$WEB_HOST}
	}

	handle_errors 502 503 504 {
		header Cache-Control "no-store"
		header Retry-After "10"
		header Content-Type "text/html; charset=utf-8"
		respond <<HTML
			<!doctype html>
			<html lang="en">
			<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="color-scheme" content="light dark">
			<meta http-equiv="refresh" content="10">
			<title>Onyx is starting</title>
			</head>
			<body style="font-family: system-ui, sans-serif; max-width: 34rem; margin: 20vh auto; padding: 0 1rem; line-height: 1.5">
			<h1>Onyx is starting</h1>
			<p>The API or web server is not answering yet. A first deploy applies the database migrations before Onyx accepts requests, which takes a few minutes.</p>
			<p>This page reloads every 10 seconds.</p>
			</body>
			</html>
			HTML 503
	}
}
 | Caddy config written to disk at boot: upstream Onyx routing plus a starting page. |
| `PORT` | web-server | 3000 | Port the Next.js server listens on. Leave as is. |
| `WEB_DOMAIN` | web-server | - | Public URL of the Onyx service; SSO callbacks redirect here. |
| `INTERNAL_URL` | web-server | - | Private URL the web server uses to reach the API. |

## Configuration

- **Start command:** `/bin/sh -c 'alembic upgrade head && exec uvicorn onyx.main:app --host 0.0.0.0 --port "$PORT"'`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'printenv CADDYFILE > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/proxy-healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/onyx-lite)
